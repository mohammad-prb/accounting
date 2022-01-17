<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
$safheh = "soorathesab";

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
    <title>صورتحساب</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/soorathesab.css"/>
</head>
<body dir="rtl" onload="tanzimSaf();emalFilterSRT();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <?php require("code/filter-soorathesab.php");?>
        <div id="kadrAmarSoorathesab">
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">تعداد نتایج:</span></div>
                <div class="meghdarAmarSRT" id="tedadNataiejSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">تعداد خروجی:</span></div>
                <div class="meghdarAmarSRT" id="tedadKhoroojiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">تعداد ورودی:</span></div>
                <div class="meghdarAmarSRT" id="tedadVoroodiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">خروجی:</span></div>
                <div class="meghdarAmarSRT" id="meghdarKhoroojiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">ورودی:</span></div>
                <div class="meghdarAmarSRT" id="meghdarVoroodiSRT">0</div>
            </div>
            <div class="amarSRT">
                <div class="titrAmarSRT"><span class="icon"></span><span class="matnTitr">تراز:</span></div>
                <div class="meghdarAmarSRT" id="tarazSRT">0</div>
            </div>
        </div>
        <div id="kadrSoorathesab"></div>
        <div id="kadrAmarSelect">
            <div class="amarSelect tedad">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">تعداد سلکت:</span></div>
                <div class="meghdarSelect" id="tedadSelect">0</div>
            </div>
            <div class="amarSelect tedad">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">تعداد خروجی:</span></div>
                <div class="meghdarSelect" id="tedadKoroojiSelect">0</div>
            </div>
            <div class="amarSelect tedad">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">تعداد ورودی:</span></div>
                <div class="meghdarSelect" id="tedadVoroodiSelect">0</div>
            </div>
            <div class="amarSelect mablagh">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">خروجی:</span></div>
                <div class="meghdarSelect khorooji" id="meghdarKoroojiSelect">0</div>
            </div>
            <div class="amarSelect mablagh">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">ورودی:</span></div>
                <div class="meghdarSelect voroodi" id="meghdarVoroodiSelect">0</div>
            </div>
            <div class="amarSelect mablagh">
                <div class="titrSelect"><span class="icon"></span><span class="matnTitr">تراز:</span></div>
                <div class="meghdarSelect taraz" id="tarazSelect">0</div>
            </div>
            <div class="amarSelect dokmeh">
                <a href="javascript:void(0);" onclick="" class="btnEmkanatSelect" title="حذف سلکت شده ها"></a>
                <a href="javascript:void(0);" onclick="laghvSelect();" class="btnEmkanatSelect" title="لغو سلکت ها"></a>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script>
    var arrObjDasteh = <?php echo json_encode($arrDasteh);?>;
    var tkn = "<?php echo $tkn;?>";
</script>
</body>
</html>
<?php $con->close();?>