<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/config.php");
if (VAZIAT_SITE != 1) die();

include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "soorathesab";

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
$rooz = jdate("d", "", "", "Asia/Tehran", "en");
$tarikhAmadehAst = false;
if (isset($_GET["tarikh"]) && strpos($_GET["tarikh"], "/") !== false)
{
    $tarikhAmadehAst = true;
    $sal = (integer)explode("/", $_GET["tarikh"])[0];
    $mah = (integer)explode("/", $_GET["tarikh"])[1];
    if ($sal == 0) $sal = "";
    if ($mah == 0) $mah = "";
}
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>صورتحساب</title>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/soorathesab.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="tanzimSafSRT();emalFilterSRT();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <?php require("code/filter-soorathesab.php");?>
        <div id="kadrAmarSoorathesab">
            <a onclick="selectAllSRT();" id="btnSelectAll" title="(سلکت / لغو سلکت) همه"></a>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">تعداد نتایج:</span></div>
                <div class="meghdarAmarSRT" id="tedadNataiejSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">تعداد خروجی:</span></div>
                <div class="meghdarAmarSRT" id="tedadKhoroojiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">تعداد ورودی:</span></div>
                <div class="meghdarAmarSRT" id="tedadVoroodiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">خروجی:</span></div>
                <div class="meghdarAmarSRT" id="meghdarKhoroojiSRT">0</div>
            </div>
            <div class="amarSRT">
                    <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">ورودی:</span></div>
                <div class="meghdarAmarSRT" id="meghdarVoroodiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon riz"></span><span class="matnTitr riz">تراز:</span></div>
                <div class="meghdarAmarSRT" id="tarazSRT">0</div>
            </div>
        </div>
        <div id="kadrSoorathesab"></div>
        <div id="kadrAmarSelect">
            <div class="amarSelect dokmeh">
                <a href="javascript:void(0);" onclick="namayeshPeygham('آیا برای حذف موارد انتخابی اطمینان دارید؟', 1, 'hazfSoorathesabSelectShodeh()');" class="btnEmkanatSelect" title="حذف سلکت شده ها"></a>
                <a href="javascript:void(0);" onclick="laghvSelect();" class="btnEmkanatSelect" title="لغو سلکت"></a>
            </div>
            <div class="amarSelect tedad">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">تعداد سلکت:</span></div>
                <div class="meghdarSelect" id="tedadSelect">0</div>
            </div>
            <div class="amarSelect tedad makhfiDarMobile">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">تعداد خروجی:</span></div>
                <div class="meghdarSelect" id="tedadKoroojiSelect">0</div>
            </div>
            <div class="amarSelect tedad makhfiDarMobile">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">تعداد ورودی:</span></div>
                <div class="meghdarSelect" id="tedadVoroodiSelect">0</div>
            </div>
            <div class="amarSelect mablagh makhfiDarMobile">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">خروجی:</span></div>
                <div class="meghdarSelect khorooji" id="meghdarKoroojiSelect">0</div>
            </div>
            <div class="amarSelect mablagh makhfiDarMobile">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">ورودی:</span></div>
                <div class="meghdarSelect voroodi" id="meghdarVoroodiSelect">0</div>
            </div>
            <div class="amarSelect mablagh">
                <div class="titrSelect"><span class="icon riz"></span><span class="matnTitr riz">تراز:</span></div>
                <div class="meghdarSelect taraz" id="tarazSelect">0</div>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/soorathesab.js"></script>
<script>
    if (Number(localStorage.getItem("pishfarzFilterSRT")) === 1) bazoBastFilterSRT(document.getElementById("btnBazoBastSRT"));
    var arrObjDasteh = <?php echo json_encode($arrDasteh);?>;
    var arrObjAfrad = <?php echo json_encode($arrAfrad);?>;
    var tkn = "<?php echo $tkn;?>";
</script>
</body>
</html>
<?php $con->close();?>