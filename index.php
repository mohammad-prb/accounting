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
    <title>حساب ها</title>
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
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
</body>
</html>
<?php $con->close();?>