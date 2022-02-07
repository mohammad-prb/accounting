<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "anavin";

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
    <title>دسته بندی ها</title>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/anavin-afrad.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="tanzimSaf();gereftanDasteh();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrTitrAnavin">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">دسته بندی ها</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="gereftanDasteh();" title="انتخاب حساب">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                    while ($row = $result->fetch_assoc())
                        echo '<option value="'. $row["id"] .'"'. ($hesabAmadehAst && $row["id"] == $hesabID ? " selected" : "") .'>'. $row["nam"] .'</option>';
                ?>
            </select>
        </div>
        <div id="kadrRahnama">
            <div id="kadrVasetRahnama">
                <a href="javascript:void(0);" onclick="taghirNoeDST(this);" class="rahnama" data-vaziat="1"><span class="icon"></span><span class="matnTitr">خروجی و ورودی</span></a>
                <a href="javascript:void(0);" onclick="taghirNoeDST(this);" class="rahnama" data-vaziat="1"><span class="icon"></span><span class="matnTitr">خروجی</span></a>
                <a href="javascript:void(0);" onclick="taghirNoeDST(this);" class="rahnama" data-vaziat="1"><span class="icon"></span><span class="matnTitr">ورودی</span></a>
                <a href="javascript:void(0);" onclick="taghirNoeDST(this);" class="rahnama" data-vaziat="1"><span class="icon"></span><span class="matnTitr">پرداخت</span></a>
            </div>
            <div id="kadrTedadDST">
                <div class="tedadDST"><span class="icon"></span><span class="matnTitr"></span></div>
                <div class="tedadDST"><span class="icon"></span><span class="matnTitr"></span></div>
                <div class="tedadDST"><span class="icon"></span><span class="matnTitr"></span></div>
                <div class="tedadDST"><span class="icon"></span><span class="matnTitr"></span></div>
            </div>
        </div>
        <div id="kadrJadvalDST">
            <div id="kadrHeaderJDST">
                <div class="itemJDST">
                    <div class="shomJDST">ردیف</div>
                    <div class="etelaatJDST">
                        <div class="iconJDST makhfiDarMobile"></div>
                        <div class="onvanJDST">عنوان</div>
                        <div class="tedadMahJDST makhfiDarMobile">تعداد (ماه)</div>
                        <div class="tedadSalJDST makhfiDarMobile">تعداد (سال)</div>
                        <div class="tedadKolJDST makhfiDarMobile">تعداد (کل)</div>
                        <div class="emkanatJDST">امکانات</div>
                    </div>
                </div>
            </div>
            <div id="jadvalDST"></div>
        </div>
        <div id="kadrAfzoodanDasteh">
            <div class="kadrAfzoodanDST">
                <div class="afzoodanDST"><span class="icon"></span><span class="matnTitr">افزودن:</span></div>
                <input type="text" class="txtDasteh" id="dastehDST" name="dasteh" maxlength="30" placeholder="نام دسته" autocomplete="off"/>
            </div>
            <div class="kadrAfzoodanDST">
                <div class="kadrENT" id="noeDST">
                    <span class="kadrPoshtENT"></span>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">خروجی و ورودی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">خروجی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">ورودی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="4" href="javascript:void(0);">پرداخت</a>
                </div>
            </div>
            <a href="javascript:void(0);" onclick="sabtDasteh();" id="btnAfzoodanDST"><span class="icon"></span><span class="matnTitr">افزودن</span></a>
        </div>
        <script>
            document.getElementById("kadrAfzoodanDasteh").onkeydown = function(e){if (e.keyCode === 13) sabtDasteh();};
        </script>
        <div id="kadrTaeedJabejaei">
            <a class="dokmehTL dokmehTaeed" id="btnZakhirehJabejaei" onclick="sabtJabejaei();"><span class="icon"></span><span class="matnTitr">ثبت جا به جایی ها</span></a>
            <a class="dokmehTL dokmehLaghv" id="btnLaghvJabejaei" onclick="gereftanDasteh();"><span class="icon"></span><span class="matnTitr">لغو جا به جایی ها</span></a>
        </div>
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