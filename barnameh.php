<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "barnameh";

$hesabAmadehAst = false;
if (isset($_GET["hesabID"]) && preg_match("/^[1-9]+[0-9]*$/", $_GET["hesabID"]) === 1)
{
    $idHesab = (integer)$_GET["hesabID"];
    $sql = "select id from tbl_hesab where id = ? and vaziat = 1";
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
    $sql = "select * from tbl_hesab where vaziat = 1 order by tartib limit 1";
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
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>برنامه زمانی</title>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/barnameh.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="tanzimSaf();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrTitrAnavin">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">برنامه زمانی</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="gereftanBarnameh();" title="انتخاب حساب">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                    while ($row = $result->fetch_assoc())
                        echo '<option value="'. $row["id"] .'"'. ($hesabAmadehAst && $row["id"] == $hesabID ? " selected" : "") .'>'. $row["nam"] .'</option>';
                ?>
            </select>
            <?php require("code/filter-barnameh.php");?>
            <div id="kadrAmarBarnameh">
                <div class="amarBRN">
                    <div class="titrAmarBRN"><span class="icon riz"></span><span class="matnTitr riz">تعداد نتایج:</span></div>
                    <div class="meghdarAmarBRN" id="tedadNataiejBRN">0</div>
                </div>
                <div class="amarBRN">
                    <div class="titrAmarBRN"><span class="icon riz"></span><span class="matnTitr riz">تعداد خروجی:</span></div>
                    <div class="meghdarAmarBRN" id="tedadKhoroojiBRN">0</div>
                </div>
                <div class="amarBRN">
                    <div class="titrAmarBRN"><span class="icon riz"></span><span class="matnTitr riz">تعداد ورودی:</span></div>
                    <div class="meghdarAmarBRN" id="tedadVoroodiBRN">0</div>
                </div>
            </div>
            <div id="kadrBarnameh">
                <div class="kadrBRN" data-khorooji-ast="1">
                    <div class="kadrVasetBRN">
                        <div class="kadrOnvan"><span class="icon"></span><span class="matnTitr">عنوان برنامه</span></div>
                        <div class="kadrEmkanat">
                            <a href="javascript:void(0);" class="emkanatBRN btnHazfBRN"></a>
                            <a href="javascript:void(0);" onclick="virayeshBRN(this);" class="emkanatBRN btnVirayeshBRN"></a>
                        </div>
                    </div>
                    <div class="kadrEtelaatBRN kadrTarikhShoroo"><span class="icon"></span><span class="matnTitr">شروع:</span><span class="meghdarBRN">1400/10/24</span></div>
                    <div class="kadrEtelaatBRN kadrNoe"><span class="icon"></span><span class="matnTitr">نوع:</span><span class="meghdarBRN">ماهانه</span></div>
                    <div class="kadrEtelaatBRN kadrTedad"><span class="icon"></span><span class="matnTitr">تعداد:</span><span class="meghdarBRN">324</span></div>
                    <div class="kadrEtelaatBRN kadrTedadPardakht"><span class="icon"></span><span class="matnTitr">پرداختی:</span><span class="meghdarBRN">124</span></div>
                    <div class="kadrEtelaatBRN kadrTedadMandeh"><span class="icon"></span><span class="matnTitr">مانده:</span><span class="meghdarBRN">334</span></div>
                    <div class="kadrEtelaatBRN kadrMablagh"><span class="icon"></span><span class="matnTitr">کل مبلغ:</span><span class="meghdarBRN">233,530,000</span></div>
                    <div class="kadrEtelaatBRN kadrMablaghMandeh"><span class="icon"></span><span class="matnTitr">مانده:</span><span class="meghdarBRN">546,330,000</span></div>
                    <div class="kadrEtelaatBRN kadrTarikh"><span class="icon"></span><span class="matnTitr">تاریخ بعدی:</span><span class="meghdarBRN">1400/12/23</span></div>
                    <div class="kadrEtelaatBRN kadrMablaghGhest"><span class="icon"></span><span class="matnTitr">مبلغ:</span><span class="meghdarBRN">540,000</span></div>
                    <a href="javascript:void(0);" class="btnBRN" onclick=""><span class="icon"></span><span class="matnTitr">پرداخت</span></a>
                </div>

            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script>var tkn = "<?php echo $tkn;?>";</script>
</body>
</html>
<?php $con->close();?>