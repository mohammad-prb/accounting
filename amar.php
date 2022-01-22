<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
$safheh = "amar";

if (!isset($_SESSION["token"]))
{
    if (function_exists('random_bytes'))
        $_SESSION["token"] = bin2hex(random_bytes(32));
    else
        $_SESSION["token"] = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));
}
$tkn = $_SESSION["token"];

$sql = "select * from tbl_hesab where vaziat = 1 order by tartib limit 1";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        $hesabID = $row["id"];
    }
}
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>آمار حساب</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/amar.css"/>
    <link rel="stylesheet" href="script/chartjs/chart.css"/>
</head>
<body dir="rtl" onload="tanzimSaf();emalTarikh();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrKolAmar">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">آمار حساب</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="emalTarikh();" title="انتخاب حساب">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        echo '<option value="'. $row["id"] .'">'. $row["nam"] .' ('. substr($row["shomKart"], 12, 4) .')</option>';
                    }
                }
                ?>
            </select>
            <div id="kadrFilterAMR">
                <div class="filterSRT">
                    <div class="titrFSRT"><span class="icon"></span><span class="matnTitr">محدوده زمانی:</span></div>
                    <div id="tarikhFSRT">
                        <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال" autocomplete="off"/>
                    </div>
                </div>
                <a id="btnFSRT" href="javascript:void(0);" onclick="emalTarikh();"><span class="icon"></span><span class="matnTitr">اعمال</span></a>
                <script>
                    document.getElementById("kadrFilterAMR").onkeydown = function(e){if (e.keyCode === 13) emalTarikh();};
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
                            <div class="titrAMR"><span class="icon"></span></div>
                            <div class="meghdarAMR" id="meghdarKhorooji">0</div>
                        </div>
                        <div class="amarTedad" id="voroodi" style="color:hsl(148, 64%, 35%);" title="تعداد ورودی">
                            <div class="titrAMR"><span class="icon"></span></div>
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
                    <div class="kadrNemoodar">
                        <canvas class="nemoodar" id="cnvNemoodarMandeh"></canvas>
                    </div>
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
    var tkn = "<?php echo $tkn;?>";
    var tedadRoozMah = <?php echo jdate("t", "", "", "Asia/Tehran", "en");?>;
    Chart.defaults.global.defaultFontColor = "black";
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontFamily = "vazir";
</script>
</body>
</html>
<?php $con->close();?>