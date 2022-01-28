<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "anavin";

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
    <title>دسته بندی ها</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/anavin.css"/>
</head>
<body dir="rtl" onload="tanzimSaf();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/anavin.js"></script>
<script>
    var tkn = "<?php echo $tkn;?>";
</script>
</body>
</html>
<?php $con->close();?>