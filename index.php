<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
$safheh = "index";
$hesabID = 1;
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
<body dir="rtl" onload="tanzimSaf();">
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

        <div id="kadrSabt">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">ثبت واریزی</span></h2>
            <div class="kadrSBT" id="kadrSBTK">
                <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت خروجی</span></h3>
                <a class="btnErsalSBT" href="javascript:void(0);" onclick=""><span class="icon"></span><span class="matnTitr">ثبت</span></a>
                <div class="kadrEtelaatSBT">
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
                        <div class="kadrENT" id="noeSBTK">
                            <span class="kadrPoshtENT"></span>
                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>
                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>
                        </div>
                    </div>
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>
                        <div class="kadrENT" id="vasilehSBTK">
                            <span class="kadrPoshtENT"></span>
                            <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">کارتخوان</a>
                            <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">عابر بانک</a>
                        </div>
                    </div>
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                        <select name="dasteh" id="dastehSBTK">
                            <?php
                            $arrDasteh = array();
                            $sql = "select id, onvan, noe from tbl_dasteh where hesabID = ".$hesabID." and vaziat = 1 order by onvan";
                            $result = $con->query($sql);
                            if ($result !== false && $result->num_rows > 0)
                            {
                                while ($row = $result->fetch_assoc())
                                {
                                    array_push($arrDasteh, $row);
                                    if ($row["noe"] <= 2)
                                        echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                                }
                            }
                            ?>
                            <option value="1" data-noe="0">دیگر...</option>
                        </select>
                    </div>
                    <div class="etelaatSBT" style="display:none;">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز به:</span></div>
                        <select name="varizBe" id="varizBeSBTK">
                            <?php
                            $sql = "select id, nam, noe from tbl_afrad where hesabID = ".$hesabID." and noe <= 2 and vaziat = 1 order by nam";
                            $result = $con->query($sql);
                            if ($result !== false && $result->num_rows > 0)
                            {
                                while ($row = $result->fetch_assoc())
                                {
                                    echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                        <div class="kadrTarikhSBT" id="tarikhSBTK">
                            <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="روز"/>
                            <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="ماه"/>
                            <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال"/>
                        </div>
                    </div>
                    <div class="etelaatSBT tamamSafheh">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                        <input type="text" class="txtMablagh" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال"/>
                        <span class="mablaghSBT"></span>
                    </div>
                    <div class="etelaatSBT tamamSafheh">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
                        <input type="text" class="txtTozih" name="tozih" placeholder="اختیاری"/>
                    </div>
                </div>
            </div>

            <div class="kadrSBT" id="kadrSBTV">
                <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت ورودی</span></h3>
                <a class="btnErsalSBT" href="javascript:void(0);" onclick=""><span class="icon"></span><span class="matnTitr">ثبت</span></a>
                <div class="kadrEtelaatSBT">
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                        <select name="dasteh" id="noeSBTV">
                            <?php
                            $sql = "select id, onvan, noe from tbl_dasteh where hesabID = ".$hesabID." and (noe = 1 or noe = 3) and vaziat = 1 order by onvan";
                            $result = $con->query($sql);
                            if ($result !== false && $result->num_rows > 0)
                            {
                                while ($row = $result->fetch_assoc())
                                {
                                    echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                                }
                            }
                            ?>
                            <option value="1" data-noe="0">دیگر...</option>
                        </select>
                    </div>
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز کننده:</span></div>
                        <select name="varizKonandeh" id="varizKonandehSBTV">
                            <?php
                            $sql = "select id, nam, noe from tbl_afrad where hesabID = ".$hesabID." and (noe = 1 or noe = 3) and vaziat = 1 order by nam";
                            $result = $con->query($sql);
                            if ($result !== false && $result->num_rows > 0)
                            {
                                while ($row = $result->fetch_assoc())
                                {
                                    echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
                    <div class="etelaatSBT">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                        <div class="kadrTarikhSBT" id="tarikhSBTV">
                            <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="روز"/>
                            <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="ماه"/>
                            <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال"/>
                        </div>
                    </div>
                    <div class="etelaatSBT tamamSafheh">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                        <input type="text" class="txtMablagh" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال"/>
                        <span class="mablaghSBT"></span>
                    </div>
                    <div class="etelaatSBT tamamSafheh">
                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
                        <input type="text" class="txtTozih" name="tozih" placeholder="اختیاری"/>
                    </div>
                </div>
            </div>
        </div>

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
                                    <a href="javascript:void(0);" title="صورتحساب" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="آمار حساب" class="emkanatHSB" onclick=""></a>
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
<script>
    <?php echo 'var arrObjDasteh = ' . json_encode($arrDasteh) . ";";?>
</script>
</body>
</html>
<?php $con->close();?>