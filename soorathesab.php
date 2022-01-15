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
        <div id="kadrSoorathesab">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">صورتحساب</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="" title="انتخاب حساب">
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
            <div id="kadrFilterSRT">
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">خ/و:</span></div>
                    <div class="kadrENT" id="khoroojiAstSBTK">
                        <span class="kadrPoshtENT"></span>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="1" href="javascript:void(0);">خروجی</a>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="0" href="javascript:void(0);">ورودی</a>
                    </div>
                </div>
                <div class="etelaatSBT" style="display:none;">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
                    <div class="kadrENT" id="noeSBTK">
                        <span class="kadrPoshtENT"></span>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>
                        <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>
                    </div>
                </div>
                <div class="etelaatSBT" style="display:none;">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>
                    <div class="kadrENT" id="vasilehSBTK"></div>
                </div>
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                    <select name="dasteh" id="dastehSBTK">
                        <option value="hameh">-</option>
                        <?php
                        $arrDasteh = array();
                        $sql = "select id, onvan, noe from tbl_dasteh where hesabID = ".$hesabID." and vaziat = 1 order by onvan";
                        $result = $con->query($sql);
                        if ($result !== false && $result->num_rows > 0)
                        {
                            while ($row = $result->fetch_assoc())
                            {
                                array_push($arrDasteh, $row);
                                if ($row["noe"] == 1)
                                    echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                            }
                        }
                        ?>
                        <option value="1">دیگر...</option>
                    </select>
                </div>
                <div class="etelaatSBT" style="display:none;">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز به:</span></div>
                    <select name="varizBe" id="varizBeSBTK">
                        <option value="hameh">-</option>
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
                        <option value="1">نامشخص</option>
                        <option value="2">دیگران...</option>
                    </select>
                </div>
                <div class="etelaatSBT" style="display:none;">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز کننده:</span></div>
                    <select name="varizKonandeh" id="varizKonandehSBTV">
                        <option value="hameh">-</option>
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
                        <option value="1">نامشخص</option>
                        <option value="2">دیگران...</option>
                    </select>
                </div>
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                    <div class="kadrTarikhSBT" id="tarikhSBTK">
                        <input type="text" class="txtTarikh" name="rooz" value="" onfocus="this.select();" maxlength="2" placeholder="روز"/>
                        <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="ماه"/>
                        <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال"/>
                    </div>
                </div>
                <div class="etelaatSBT tamamSafheh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                    <input type="text" class="txtMablagh" id="mablaghSBTK" name="mablagh" maxlength="10" placeholder="به ریال"/>
                </div>
                <div class="etelaatSBT tamamSafheh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
                    <input type="text" class="txtTozih" id="tozihSBTK" name="tozih"/>
                </div>
            </div>
        </div>
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