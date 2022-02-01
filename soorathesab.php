<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "soorathesab";

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
    else die("کوئری اشتباه است");
    $stmt->close();
}
else
{
    $sql = "select * from tbl_hesab where vaziat = 1 order by tartib limit 1";
    $result = $con->query($sql);
    if ($result !== false && $result->num_rows > 0)
        if ($row = $result->fetch_assoc())
            $hesabID = $row["id"];
}
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>صورتحساب</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/soorathesab.css"/>
    <script>
        if (localStorage.getItem("darkmode") === null) localStorage.setItem("darkmode", 0);
        else if (Number(localStorage.getItem("darkmode")) === 1) document.write('<link rel="stylesheet" href="style/dark-mode.css"/>');
    </script>
</head>
<body dir="rtl" onload="tanzimSaf();emalFilterSRT();">
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
    var arrObjDasteh = <?php echo json_encode($arrDasteh);?>;
    var arrObjAfrad = <?php echo json_encode($arrAfrad);?>;
    var tkn = "<?php echo $tkn;?>";
</script>
</body>
</html>
<?php $con->close();?>