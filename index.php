<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
$safheh = "index";
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>صفحه اصلی</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
</head>
<body dir="rtl">
<div id="fullCountainer">

    <div id="CountainerKadrNamayeshPeygham" style="display: none">
        <div id="kadrNamayeshPeygham">
            <a id="kadrPoshtPeygham" href="javascript:void(0);" onclick="bastanPeygham();"></a>
            <div id="kadrPeygham">
                <div>
                    <div id="titrPeygham"><span class="icon"></span><span class="matnTitr">پیغام سیستم</span></div>
                    <div id="matnPeygham"></div>
                    <span id="kadrDokmehPeygham"></span>
                </div>
            </div>
        </div>
    </div>

    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>

        <div id="kadrHesabha">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">حساب ها</span></h2>
            <?php
            $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                while ($row = $result->fetch_assoc())
                {
                    echo @'<div class="hesab">
                                <div class="titrHSB">
                                    <div class="namHSB">
                                        <img src="pic/bank/'. $row["bankID"] .@'.png" alt="bank" class="bankHSB"/>
                                        <span title="'. $row["nam"] .'" class="matnTitrHSB">'. $row["nam"] .@'</span>
                                    </div>
                                    <div title="مانده حساب" class="mandehHSB">2,135,324,024</div>
                                </div>
                                <div class="kadrShomKartHSB">
                                    <div class="titrShomKartHSB">شماره کارت: </div>
                                    <div title="'. faselehdar($row["shomKart"]) .'" class="shomKartHSB">'. faselehdar($row["shomKart"]) .@'</div>
                                </div>
                                <div class="kadrShomKartHSB">
                                    <div class="titrShomKartHSB">شماره حساب: </div>
                                    <div title="'. $row["shomHesab"] .'" class="shomKartHSB">'. $row["shomHesab"] .@'</div>
                                </div>
                                <div class="kadrEmkanatHSB">
                                    <a href="javascript:void(0);" title="حذف" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="ویرایش" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="حساب پیشفرض" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="صورتحساب" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="آمار" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="افراد" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="دسته بندی ها" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="بروزرسانی مانده" class="emkanatHSB" onclick=""></a>
                                </div>
                            </div>';
                }
            }
            ?>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
</body>
</html>
<?php $con->close();?>