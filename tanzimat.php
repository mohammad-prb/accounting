<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "tanzimat";
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>تنظیمات</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/tanzimat.css"/>
</head>
<body dir="rtl" onload="tanzimSaf();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrTitrTanzimat">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">تنظیمات</span></h2>
            <div class="kadrENT" id="theme">
                <span class="kadrPoshtENT"></span>
                <a class="gozinehENT" onclick="taghirENT(this);" data-value="0" href="javascript:void(0);">تم روشن</a>
                <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">تم تاریک</a>
            </div>
        </div>
        <div id="kadrHesabhaTNZ">
            <div id="kadrHeaderJTNZ">
                <div class="itemJTNZ">
                    <div class="shomJTNZ">ردیف</div>
                    <div class="etelaatJTNZ">
                        <div class="bankJTNZ"></div>
                        <div class="onvanJTNZ">نام</div>
                        <div class="shomHesabJTNZ">شماره حساب</div>
                        <div class="shomKartJTNZ">شماره کارت</div>
                        <div class="eftetahJTNZ">تاریخ افتتاح</div>
                        <div class="mandehTarazJTNZ">مانده تراز</div>
                        <div class="emkanatJTNZ">امکانات</div>
                    </div>
                </div>
            </div>
            <div id="jadvalTNZ">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        echo @'<div class="itemJTNZ" data-id="'. $row["id"] .'" data-bank="'. $row["bankID"] .'" data-tartib="'. $row["tartib"] .@'">
                                <div class="shomJTNZ"></div>
                                <div class="etelaatJTNZ">
                                    <div class="bankJTNZ"><img src="pic/bank/'. $row["bankID"] .@'.png" alt="bank" class="aksBankJTNZ"/></div>
                                    <div class="onvanJTNZ">'. $row["nam"] .@'</div>
                                    <div class="shomHesabJTNZ">'. $row["shomHesab"] .@'</div>
                                    <div class="shomKartJTNZ">'. $row["shomKart"] .@'</div>
                                    <div class="eftetahJTNZ">'. $row["tarikhEftetah"] .@'</div>
                                    <div class="mandehTarazJTNZ">'. momayezdar($row["mablaghTaraz"]) .@'</div>
                                    <div class="emkanatJTNZ">
                                        <a href="javascript:void(0);" class="btnJTNZ btnHazfJTNZ" title="حذف"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnVirayeshJTNZ" onclick="virayeshHSB(this)" title="ویرایش"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnPaeenJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, false);" title="جا به جایی"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnBalaJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, true);" title="جا به جایی"></a>
                                    </div>
                                </div>
                            </div>';
                    }
                }
                ?>
            </div>
        </div>
        <div id="kadrTaeedJabejaei">
            <a class="dokmehTL dokmehTaeed" id="btnZakhirehJabejaei" onclick="sabtJabejaei();"><span class="icon"></span><span class="matnTitr">ثبت جا به جایی ها</span></a>
            <a class="dokmehTL dokmehLaghv" id="btnLaghvJabejaei" onclick="location.assign('tanzimat.php')"><span class="icon"></span><span class="matnTitr">لغو جا به جایی ها</span></a>
        </div>
        <div id="kadrAfzoodanHesab">
            <h3 class="titrAfzoodanHesab"><span class="icon"></span><span class="matnTitr">افزودن حساب</span></h3>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">نام:</span></div>
                <input type="text" id="namATNZ" name="nam" maxlength="30" autocomplete="off"/>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">بانک:</span></div>
                <select name="bank" id="bankATNZ">
                    <?php
                    $arrBank = array();
                    $sql = "select * from tbl_bank order by nam";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            array_push($arrBank, $row);
                            echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                        }
                    }
                    ?>
                </select>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">شماره حساب:</span></div>
                <input type="text" id="shomHesabATNZ" name="shomHesab" maxlength="100" autocomplete="off"/>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">شماره کارت:</span></div>
                <input type="text" id="shomKartATNZ" name="shomKart" maxlength="16" autocomplete="off"/>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">مانده تراز:</span></div>
                <input type="text" id="mandehATNZ" name="mandeh" maxlength="20" placeholder="مانده فعلی" autocomplete="off"/>
            </div>
            <a href="javascript:void(0);" onclick="sabtHesab();" id="btnAfzoodanTNZ"><span class="icon"></span><span class="matnTitr">افزودن</span></a>
        </div>
        <script>
            document.getElementById("kadrAfzoodanHesab").onkeydown = function(e){if (e.keyCode === 13) sabtHesab();};
        </script>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/tanzimat.js"></script>
<script>
    shomarehBandiHSB();
    var tkn = "<?php echo $tkn;?>";
    var arrBank = <?php echo json_encode($arrBank);?>;
</script>
</body>
</html>
<?php $con->close();?>