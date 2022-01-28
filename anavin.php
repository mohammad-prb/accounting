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
        <div id="kadrTitrAnavin">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">دسته بندی ها</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="taghirHesabANV(this);" title="انتخاب حساب">
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
        </div>
        <div id="kadrAfzoodanDasteh">
            <div class="kadrAfzoodanDST">
                <div class="afzoodanDST"><span class="icon"></span><span class="matnTitr">افزودن دسته:</span></div>
                <input type="text" class="txtDasteh" id="dastehDST" name="dasteh" maxlength="30" placeholder="نام دسته" autocomplete="off"/>
            </div>
            <div class="kadrAfzoodanDST">
                <div class="afzoodanDST"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
                <div class="kadrENT" id="noeDST">
                    <span class="kadrPoshtENT"></span>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">خروجی و ورودی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">خروجی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">ورودی</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="4" href="javascript:void(0);">پرداخت</a>
                </div>
            </div>
            <a href="javascript:void(0);" onclick="sabtDasteh();" id="btnAfzoodanDST"><span class="icon"></span><span class="matnTitr">افزودن</span></a>
        </div>
        <script>
            document.getElementById("kadrAfzoodanDasteh").onkeydown = function(e){if (e.keyCode === 13) sabtDasteh();};
        </script>
        <div id="kadrRahnama">
            <div id="kadrVasetRahnama">
                <a href="javascript:void(0);" onclick="" class="rahnama"><span class="icon"></span><span class="matnTitr">خروجی و ورودی</span></a>
                <a href="javascript:void(0);" onclick="" class="rahnama"><span class="icon"></span><span class="matnTitr">خروجی</span></a>
                <a href="javascript:void(0);" onclick="" class="rahnama"><span class="icon"></span><span class="matnTitr">ورودی</span></a>
                <a href="javascript:void(0);" onclick="" class="rahnama"><span class="icon"></span><span class="matnTitr">پرداخت</span></a>
            </div>
        </div>
        <div id="kadrJadvalDST">
            <div id="kadrHeaderJDST">
                <div class="itemJDST">
                    <div class="shomJDST">ردیف</div>
                    <div class="etelaatJDST">
                        <div class="iconJDST"></div>
                        <div class="onvanJDST">عنوان</div>
                        <div class="tedadMahJDST">تعداد (ماه)</div>
                        <div class="tedadSalJDST">تعداد (سال)</div>
                        <div class="tedadKolJDST">تعداد (کل)</div>
                        <div class="emkanatJDST">امکانات</div>
                    </div>
                </div>
            </div>
            <div id="jadvalDST">
                <?php
                $i = 1;
                $sql = "select * from tbl_dasteh where vaziat = 1 and (hesabID = ". $hesabID ." or hesabID = 0) order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        echo '<div class="itemJDST">
                                <div class="shomJDST">'. $i++ .'</div>
                                <div class="etelaatJDST" data-noe="'. $row["noe"] .'">
                                    <div class="iconJDST"></div>
                                    <div class="onvanJDST">'. $row["onvan"] .'</div>
                                    <div class="tedadMahJDST">354</div>
                                    <div class="tedadSalJDST">1,456</div>
                                    <div class="tedadKolJDST">12,456</div>
                                    <div class="emkanatJDST">
                                        <a href="javascript:void(0);" class="btnJDST btnHazfJDST" onclick="" title="حذف"></a>
                                        <a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="" title="ویرایش"></a>
                                        <a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="" title="جابجایی"></a>
                                        <a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="" title="جابجایی"></a>
                                    </div>
                                </div>
                            </div>';
                    }
                }
                ?>
            </div>
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