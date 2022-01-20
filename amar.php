<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
$safheh = "amar";

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


$tarikhMahdoodeh = jdate("Y/m/", "", "", "Asia/Tehran", "en");
$arrKhorooji = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$arrVoroodi = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$meghdarKhorooji = 0;
$meghdarVoroodi = 0;
$tedadKhorooji = 0;
$tedadVoroodi = 0;

$sql = "select mablaghTaraz from tbl_hesab where vaziat = 1 and id = " . $hesabID;
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    if ($row = $result->fetch_assoc())
        $mandeh = (float)$row["mablaghTaraz"];

$sql = "select khoroojiAst, mablagh, tarikh from tbl_soorathesab where vaziat = 1 and hesabID = " . $hesabID;
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        $khoroojiAst = (integer)$row["khoroojiAst"];
        $mablagh = (float)$row["mablagh"];
        $tarikh = $row["tarikh"];

        if ($khoroojiAst == 1)
        {
            $mandeh -= $mablagh;
            if ($tarikhMahdoodeh == substr($tarikh,0,8))
            {
                $tedadKhorooji++;
                $meghdarKhorooji += $mablagh;
                $arrKhorooji[(integer)substr($tarikh,8,2)] += $mablagh;
            }
        }
        else
        {
            $mandeh += $mablagh;
            if ($tarikhMahdoodeh == substr($tarikh,0,8))
            {
                $tedadVoroodi++;
                $meghdarVoroodi += $mablagh;
                $arrVoroodi[(integer)substr($tarikh,8,2)] += $mablagh;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>آمار حساب</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="pic/logo.png"/>
    <link rel="stylesheet" href="style/main.css"/>
    <link rel="stylesheet" href="style/amar.css"/>
    <link rel="stylesheet" href="script/chartjs/chart.css"/>
</head>
<body dir="rtl" onload="tanzimSaf();">
<div id="fullCountainer">

    <?php require("code/peygham.php");?>
    <?php require("code/menu.php");?>

    <div id="sotoonChap">
        <?php require("code/navar-bala.php");?>
        <div id="kadrKolAmar">
            <h2 class="titr"><span class="icon"></span><span class="matnTitr">آمار حساب</span></h2>
            <select name="hesabha" class="sltHesabha" onchange="taghirHesabAMR(this);" title="انتخاب حساب">
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
            <div id="kadrFilterAMR">
                <div class="filterSRT">
                    <div class="titrFSRT"><span class="icon"></span><span class="matnTitr">محدوده زمانی:</span></div>
                    <div id="tarikhFSRT">
                        <input type="text" class="txtTarikh" name="rooz" value="" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال" autocomplete="off"/>
                    </div>
                </div>
                <a id="btnFSRT" href="javascript:void(0);" onclick="emalTarikh();"><span class="icon"></span><span class="matnTitr">اعمال</span></a>
                <script>
                    document.getElementById("kadrFilterAMR").onkeydown = function(e){if (e.keyCode === 13) emalTarikh();};
                </script>
            </div>
            <div id="kadrAmar">
                <div id="kadrAmarMablagh">
                    <div class="amarMablagh" id="mandeh">
                        <div class="titrAMR"><span class="icon"></span><span class="matnTitr">مانده حساب:</span></div>
                        <div class="meghdarAMR"><?php echo momayezdar($mandeh);?></div>
                    </div>
                    <div class="amarMablagh" id="khorooji">
                        <div class="titrAMR"><span class="icon"></span><span class="matnTitr">خروجی:</span></div>
                        <div class="meghdarAMR" style="color:hsl(352, 100%, 35%);"><?php echo momayezdar($meghdarKhorooji);?></div>
                    </div>
                    <div class="amarMablagh" id="voroodi">
                        <div class="titrAMR"><span class="icon"></span><span class="matnTitr">ورودی:</span></div>
                        <div class="meghdarAMR" style="color:hsl(148, 64%, 40%);"><?php echo momayezdar($meghdarVoroodi);?></div>
                    </div>
                    <div class="amarMablagh" id="taraz">
                        <div class="titrAMR"><span class="icon"></span><span class="matnTitr">تراز:</span></div>
                        <div class="meghdarAMR" style="color:hsl(39, 100%, 35%);direction: ltr"><?php echo momayezdar($meghdarVoroodi - $meghdarKhorooji);?></div>
                    </div>
                </div>
                <div id="kadrNemoodarMablagh">
                    <canvas class="nemoodar" id="cnvNemoodarMablagh"></canvas>
                </div>
                <div id="kadrAmarTedad">
                    <div class="amarTedad" id="jamTedad" title="تعداد واریزی">
                        <div class="titrAMR"><span class="icon"></span></div>
                        <div class="meghdarAMR"><?php echo momayezdar($tedadKhorooji+$tedadVoroodi);?></div>
                    </div>
                    <div class="amarTedad" id="khorooji" style="color:hsl(352, 100%, 35%);" title="تعداد خروجی">
                        <div class="titrAMR"><span class="icon"></span></div>
                        <div class="meghdarAMR"><?php echo momayezdar($tedadKhorooji);?></div>
                    </div>
                    <div class="amarTedad" id="voroodi" style="color:hsl(148, 64%, 35%);" title="تعداد ورودی">
                        <div class="titrAMR"><span class="icon"></span></div>
                        <div class="meghdarAMR"><?php echo momayezdar($tedadVoroodi);?></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script src="script/chartjs/chart.js"></script>
<script src="script/chartjs/moment.js"></script>
<script src="script/amar.js"></script>
<script>
    var tkn = "<?php echo $tkn;?>";
    Chart.defaults.global.defaultFontColor = "black";
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontFamily = "vazir";
    var myChart = new Chart(document.getElementById("cnvNemoodarMablagh"), {
        type: 'line',
        data: {
            labels: [<?php for($i=1; $i<jdate("t", "", "", "Asia/Tehran", "en"); $i++) echo $i.","; echo $i?>],
            datasets: [{
                label: 'خروجی',
                data: [<?php for($i=1; $i<jdate("t", "", "", "Asia/Tehran", "en"); $i++) echo $arrKhorooji[$i].","; echo $arrKhorooji[$i]?>],
                backgroundColor: ['hsla(352, 100%, 35%, 0.5)'],
                borderColor: ['hsla(352, 100%, 35%, 1)'],
                pointBackgroundColor : 'hsla(352, 100%, 35%, 1)',
                borderWidth: 1,
                fill: 'transparent'
            },{
                label: 'ورودی',
                data: [<?php for($i=1; $i<jdate("t", "", "", "Asia/Tehran", "en"); $i++) echo $arrVoroodi[$i].","; echo $arrVoroodi[$i]?>],
                backgroundColor: ['rgba(41, 188, 110, 0.5)'],
                borderColor: ['rgba(41, 188, 110, 1)'],
                pointBackgroundColor : 'rgba(41, 188, 110, 1)',
                borderWidth: 1,
                fill: 'transparent'
            }]
        },
        options:{scales:{yAxes:[{ticks:{beginAtZero: true}}]}}
    });
</script>
</body>
</html>
<?php $con->close();?>