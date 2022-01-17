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

    <div id="CountainerKadrNamayeshPeygham" style="display: none">
        <div id="kadrNamayeshPeygham">
            <a id="kadrPoshtPeygham" href="javascript:void(0);" onclick="bastanPeygham();"></a>
            <div id="kadrPeygham">
                <div>
                    <div id="titrPeygham"><span class="icon"></span><span class="matnTitr">پیغام سیستم</span></div>
                    <div id="matnPeygham"></div>
                    <span id="kadrDokmehPeygham"></span>
                </div>
            </div>
        </div>
    </div>

    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <?php require("code/filter-soorathesab.php");?>
        <div id="kadrSoorathesab"></div>
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