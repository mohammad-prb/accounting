<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/config.php");
if (VAZIAT_SITE != 1) die();

include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
include ("code/tolid-token.php");
$safheh = "tanzimat";

if (!isset($_SESSION["accountID"])) header("location:login.php");
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>تنظیمات</title>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/tanzimat.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl" onload="tanzimSafTanzimat();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrTitrTanzimat">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">تنظیمات</span></h2>
        </div>
        <div id="kadrHesabhaTNZ">
            <div id="kadrHeaderJTNZ">
                <div class="itemJTNZ">
                    <div class="shomJTNZ">ردیف</div>
                    <div class="etelaatJTNZ">
                        <div class="bankJTNZ"></div>
                        <div class="onvanJTNZ">نام</div>
                        <div class="shomHesabJTNZ makhfiDarMobile">شماره حساب</div>
                        <div class="shomKartJTNZ makhfiDarMobile">شماره کارت</div>
                        <div class="eftetahJTNZ makhfiDarMobile">تاریخ افتتاح</div>
                        <div class="mandehTarazJTNZ makhfiDarMobile">مانده تراز</div>
                        <div class="emkanatJTNZ">امکانات</div>
                    </div>
                </div>
            </div>
            <div id="jadvalTNZ">
                <?php
                $sql = "select * from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." order by tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        echo @'<div class="itemJTNZ" data-id="'. $row["id"] .'" data-bank="'. $row["bankID"] .'" data-tartib="'. $row["tartib"] .@'">
                                <div class="shomJTNZ"></div>
                                <div class="etelaatJTNZ">
                                    <div class="bankJTNZ"><img src="pic/bank/'. $row["bankID"] .@'.png" alt="bank" class="aksBankJTNZ"/></div>
                                    <div class="onvanJTNZ" onclick="if (mobileAst(1000)) namayeshPeygham(\'' . $row["nam"] . '<br/> شماره حساب: ' . $row["shomHesab"] . ' <br/> شماره کارت: ' . $row["shomKart"] . ' <br/> تاریخ افتتاح: ' . $row["tarikhEftetah"] . ' <br/> مانده تراز: ' . momayezdar($row["mablaghTaraz"]) .'\');">'. $row["nam"] .@'</div>
                                    <div class="shomHesabJTNZ makhfiDarMobile">'. $row["shomHesab"] .@'</div>
                                    <div class="shomKartJTNZ makhfiDarMobile">'. $row["shomKart"] .@'</div>
                                    <div class="eftetahJTNZ makhfiDarMobile">'. $row["tarikhEftetah"] .@'</div>
                                    <div class="mandehTarazJTNZ makhfiDarMobile" onclick="namayeshPeygham(\''. momayezdar($row["mablaghTaraz"]) .'\');">'. momayezdar($row["mablaghTaraz"]) .@'</div>
                                    <div class="emkanatJTNZ">
                                        <a href="javascript:void(0);" class="btnJTNZ btnHazfJTNZ" title="حذف"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnVirayeshJTNZ" onclick="virayeshHSB(this)" title="ویرایش"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnPaeenJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, false);" title="جابجایی"></a>
                                        <a href="javascript:void(0);" class="btnJTNZ btnBalaJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, true);" title="جابجایی"></a>
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
            <h2 class="titrTNZ"><span class="icon"></span><span class="matnTitr">افزودن حساب</span></h2>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">نام حساب:</span></div>
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
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">ش حساب:</span></div>
                <input type="text" id="shomHesabATNZ" name="shomHesab" maxlength="100" autocomplete="off" placeholder="شماره حساب"/>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">ش کارت:</span></div>
                <input type="text" id="shomKartATNZ" name="shomKart" maxlength="16" autocomplete="off" placeholder="شماره کارت"/>
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
        <?php
        $sql = "select * from tbl_account where vaziat = 1 and id = " . $_SESSION["accountID"];
        $result = $con->query($sql);
        if ($result !== false && $result->num_rows > 0)
        {
            if ($row = $result->fetch_assoc())
            {
                $mobile = $row["mobile"];
                $email = $row["email"];
            }
        }
        ?>
        <div id="kadrPishfarzha">
            <h2 class="titrTNZ"><span class="icon"></span><span class="matnTitr">پیشفرض ها</span></h2>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">تم برنامه:</span></div>
                <div class="kadrENTTNZ" id="kadrThemENTPSH"></div>
            </div>
            <div class="kadrPSH makhfiDarMobile">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">حالت منو:</span></div>
                <div class="kadrENTTNZ" id="kadrMenuENTPSH"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">پیشنهادها:</span></div>
                <div class="kadrENTTNZ" id="kadrPishnahadENTPSH"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">بازه صورتحساب:</span></div>
                <div class="kadrENTTNZ" id="kadrSoorathesabENTPSH"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">بازه آمار:</span></div>
                <div class="kadrENTTNZ" id="kadrAmarENTPSH"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">جداکننده تاریخ:</span></div>
                <div class="kadrENTTNZ" id="kadrJodaKanandeh"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">صورتحساب:</span></div>
                <div class="kadrENTTNZ" id="kadrFilterSRT"></div>
            </div>
            <div class="kadrPSH">
                <div class="titrPSH"><span class="icon"></span><span class="matnTitr">برنامه زمانی:</span></div>
                <div class="kadrENTTNZ" id="kadrFilterBRN"></div>
            </div>
        </div>
        <div id="kadrEtelaatAccount">
            <h2 class="titrTNZ"><span class="icon"></span><span class="matnTitr">اطلاعات حساب کاربری</span></h2>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">موبایل:</span></div>
                <input type="text" id="mobileTNZ" name="mobile" value="<?php echo $mobile;?>" oninput="taghirMobile(this);" maxlength="11" autocomplete="off"/>
                <a href="javascript:void(0);" class="btnTaeed" onclick="sabtEtelaatAccount(this, 'mobile');" title="ثبت"></a>
            </div>
            <div class="kadrAfzoodanTNZ">
                <div class="afzoodanTNZ"><span class="icon"></span><span class="matnTitr">ایمیل:</span></div>
                <input type="text" id="emailTNZ" name="email" value="<?php echo $email;?>" oninput="taghirEmail(this);" autocomplete="off"/>
                <a href="javascript:void(0);" class="btnTaeed" onclick="sabtEtelaatAccount(this, 'email');" title="ثبت"></a>
            </div>
            <div class="kadrAfzoodanTNZ">
                <a href="javascript:void(0);" class="btnEmkanatAccount" id="btnTaghirRamzAccount" onclick="taghirRamz();">
                    <span class="icon"></span><span class="matnTitr">تغییر رمز</span>
                </a>
                <a href="javascript:void(0);" class="btnEmkanatAccount" id="btnHazfAccount" onclick="tooltip({lmn:this, mahvShavad:10, fnc:taeedHazfAccount, matn:'آیا برای حذف اطمینان دارید؟'});">
                    <span class="icon"></span><span class="matnTitr">حذف حساب</span>
                </a>
            </div>
        </div>
        <script>
            document.getElementById("mobileTNZ").onkeydown = function(e){if (e.keyCode === 13) sabtEtelaatAccount(this.nextElementSibling, 'mobile');};
            document.getElementById("emailTNZ").onkeydown = function(e){if (e.keyCode === 13) sabtEtelaatAccount(this.nextElementSibling, 'email');};
        </script>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/tanzimat.js"></script>
<script>
    var mobile = '<?php echo $mobile;?>';
    var email = '<?php echo $email;?>';
    <?php if (isset($_GET["p"])) echo 'namayeshPeygham("برای شروع به کار، ابتدا یک حساب باز کنید.");';?>
    shomarehBandiHSB();
    var tkn = "<?php echo $tkn;?>";
    var arrBank = <?php echo json_encode($arrBank);?>;
</script>
</body>
</html>
<?php $con->close();?>