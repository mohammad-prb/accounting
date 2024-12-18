<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/config.php");
if (VAZIAT_SITE != 1) die();

include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "amar";

if (!isset($_SESSION["accountID"])) header("location:login.php");

$hesabAmadehAst = false;
if (isset($_GET["hesabID"]) && preg_match("/^[1-9]+[0-9]*$/", $_GET["hesabID"]) === 1)
{
    $idHesab = (integer)$_GET["hesabID"];
    $sql = "select id from tbl_hesab where id = ? and accountID = ". $_SESSION["accountID"] ." and vaziat = 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $idHesab);
    $stmt->execute();
    $stmt->bind_result($hesabID);
    if ($stmt->fetch()) $hesabAmadehAst = true;
    else header("location:tanzimat.php?p");
    $stmt->close();
}
else
{
    $sql = "select * from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." order by tartib limit 1";
    $result = $con->query($sql);
    if ($result !== false && $result->num_rows > 0)
    {
        if ($row = $result->fetch_assoc())
        {
            $hesabID = $row["id"];
        }
    }
    else header("location:tanzimat.php?p");
}

$sal = jdate("Y", "", "", "Asia/Tehran", "en");
$mah = jdate("m", "", "", "Asia/Tehran", "en");
$tarikhAmadehAst = false;
if (isset($_GET["tarikh"]) && strpos($_GET["tarikh"], "/") !== false)
{
    $tarikhAmadehAst = true;
    $sal = (integer)explode("/", $_GET["tarikh"])[0];
    $mah = (integer)explode("/", $_GET["tarikh"])[1];

    if ($mah == 0 || $sal == 0)
    {
        $tarikhAmadehAst = false;
        $sal = jdate("Y", "", "", "Asia/Tehran", "en");
        $mah = jdate("m", "", "", "Asia/Tehran", "en");
    }
}
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>آمار حساب</title>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/amar.css"/>
    <link rel="stylesheet" href="script/chartjs/chart.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="emalTarikh();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrKolAmar">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">آمار حساب</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="emalTarikh();" title="انتخاب حساب">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                    while ($row = $result->fetch_assoc())
                        echo '<option value="'. $row["id"] .'"'. ($hesabAmadehAst && $row["id"] == $hesabID ? " selected" : "") .'>'. $row["nam"] .'</option>';
                ?>
            </select>
            <div id="kadrFilterAMR">
                <div class="filterSRT">
                    <div class="titrFSRT"><span class="icon"></span><span class="matnTitr">محدوده زمانی:</span></div>
                    <div id="tarikhFSRT">
                        <input type="text" class="txtTarikh" name="mah" onfocus="this.select();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="sal" onfocus="this.select();" maxlength="4" placeholder="سال" autocomplete="off"/>
                    </div>
                </div>
                <a id="btnFSRT" href="javascript:void(0);" onclick="emalTarikh();"><span class="icon"></span><span class="matnTitr">اعمال</span></a>
                <a href="javascript:void(0);" class="btnTarikhAMR" onclick="emalTarikhMojood('mah');"><span class="icon"></span><span class="matnTitr">ماه جاری</span></a>
                <a href="javascript:void(0);" class="btnTarikhAMR" onclick="emalTarikhMojood('sal');"><span class="icon"></span><span class="matnTitr">سال جاری</span></a>
                <script>
                    document.getElementById("kadrFilterAMR").onkeydown = function(e){if (e.keyCode === 13) emalTarikh();};
                    document.getElementsByClassName("txtTarikh")[1].value = <?php echo $sal;?>;

                    var tarikhAmadehAst = <?php echo ($tarikhAmadehAst ? 'true' : 'false')?>;
                    if (tarikhAmadehAst || localStorage.getItem("pishfarzAmar") === "mah")
                        document.getElementsByClassName("txtTarikh")[0].value = "<?php echo $mah;?>";
                </script>
            </div>
            <div id="kadrAmar">
                <div id="sotoonRast">
                    <div id="kadrAmarMablagh">
                        <div class="amarMablagh" id="mandeh">
                            <div class="titrAMR"><span class="icon"></span><span class="matnTitr">مانده حساب:</span></div>
                            <div class="meghdarAMR" id="meghdarMandeh">0</div>
                        </div>
                        <div class="amarMablagh" id="mablaghKhorooji">
                            <div class="titrAMR"><span class="icon"></span><span class="matnTitr">خروجی:</span></div>
                            <div class="meghdarAMR" id="meghdarMablaghKhorooji" style="color:hsl(352, 100%, 35%);">0</div>
                        </div>
                        <div class="amarMablagh" id="mablaghVoroodi">
                            <div class="titrAMR"><span class="icon"></span><span class="matnTitr">ورودی:</span></div>
                            <div class="meghdarAMR" id="meghdarMablaghVoroodi" style="color:hsl(148, 64%, 40%);">0</div>
                        </div>
                        <div class="amarMablagh" id="taraz">
                            <div class="titrAMR"><span class="icon"></span><span class="matnTitr">تراز:</span></div>
                            <div class="meghdarAMR" id="meghdarTaraz" style="color:hsl(39, 100%, 35%);direction: ltr">0</div>
                        </div>
                    </div>
                    <div id="kadrAmarTedad">
                        <div class="amarTedad" id="jamTedad" title="تعداد واریزی">
                            <div class="titrAMR"><span class="icon"></span></div>
                            <div class="meghdarAMR" id="meghdarJamTedad">0</div>
                        </div>
                        <div class="amarTedad" id="khorooji" style="color:hsl(352, 100%, 35%);" title="تعداد خروجی">
                            <div class="titrAMR"><span class="icon"></span></div>
                            <div class="meghdarAMR" id="meghdarKhorooji">0</div>
                        </div>
                        <div class="amarTedad" id="voroodi" style="color:hsl(148, 64%, 35%);" title="تعداد ورودی">
                            <div class="titrAMR"><span class="icon"></span></div>
                            <div class="meghdarAMR" id="meghdarVoroodi">0</div>
                        </div>
                        <a href="javascript:void(0);" id="btnSoorathesabAMR"><span class="icon"></span><span class="matnTitr">نمایش صورتحساب</span></a>
                    </div>
                    <div id="kadrListAMR">
                        <div id="headerLAMR">
                            <a href="javascript:void(0);" class="btnLAMR" onclick="taghirLAMR('listDasteha');" data-enekhabi="1"><span class="icon"></span><span class="matnTitr">دسته ها</span></a>
                            <a href="javascript:void(0);" class="btnLAMR" onclick="taghirLAMR('listAfrad');" data-enekhabi="0"><span class="icon"></span><span class="matnTitr">افراد</span></a>
                        </div>
                        <div class="listAMR" id="listDasteha"></div>
                        <div class="listAMR" id="listAfrad" style="display: none"></div>
                    </div>
                </div>
                <div id="stoonVasat">
                    <div class="kadrNemoodar"></div>
                    <div class="kadrNemoodar"></div>
                </div>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/chartjs/chart.js"></script>
<script src="script/chartjs/moment.js"></script>
<script src="script/amar.js"></script>
<script>
    var mahJari = "<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>";
    var salJari = "<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>";
    var tkn = "<?php echo $tkn;?>";
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontFamily = "vazir";
    if (Number(localStorage.getItem("darkmode")) === 1)
    {
        Chart.defaults.global.defaultFontColor = "white";
        Chart.defaults.scale.gridLines.color = "hsl(0, 0%, 12%)";
        Chart.defaults.scale.gridLines.zeroLineColor = "hsl(0, 0%, 20%)";
    }
    else
    {
        Chart.defaults.global.defaultFontColor = "black";
    }
</script>
</body>
</html>
<?php $con->close();?>