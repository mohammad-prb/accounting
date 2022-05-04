<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/config.php");
if (VAZIAT_SITE != 1) die();

include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "index";

if (!isset($_SESSION["accountID"])) header("location:login.php");

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
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>صفحه اصلی</title>
    <link rel="stylesheet" href="style/main.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="tanzimSaf();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <?php require("code/kadr-sabt.php");?>
        <?php require("code/kadr-hesabha.php");?>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script>var tkn = "<?php echo $tkn;?>";</script>
</body>
</html>
<?php $con->close();?>