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
<body dir="rtl" onload="tanzimSaf();emalFilterBRN();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrTitrAnavin">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">برنامه زمانی</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="emalFilterBRN();" title="انتخاب حساب">
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
            <div id="kadrBarnameh"></div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/barnameh.js"></script>
<script>
    var tkn = "<?php echo $tkn;?>";
    var tarikh = "<?php echo jdate("Y/m/d", "", "", "Asia/Tehran", "en");?>";
</script>
</body>
</html>
<?php $con->close();?>