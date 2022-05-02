<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");
?>
<!DOCTYPE html>
<html lang="fa-ir">
<head>
    <title>ورود</title>
    <link rel="stylesheet" href="style/main.css"/>
    <?php include ("code/head.php");?>
</head>
<body dir="rtl">
<div id="fullCountainer">

    <div id="CountainerKadrLogin">
        <div id="kadrNamayeshLogin">
            <div id="kadrLogin">
                <form action="index.php" method="post">
                    <div id="titrLogin"><span class="icon"></span><span class="matnTitr">ورود به سیستم</span></div>
                    <div id="matnLogin">
                        <div class="kadrEtelaatLogin">
                            <div class="titrEtelaatLogin"><span class="icon"></span></div>
                            <input type="text" name="user" class="txtLogin" placeholder="موبایل یا ایمیل"/>
                        </div>
                        <div class="kadrEtelaatLogin">
                            <div class="titrEtelaatLogin"><span class="icon"></span></div>
                            <input type="password" name="pass" class="txtLogin" placeholder="رمز عبور"/>
                        </div>
                    </div>
                    <span id="kadrDokmehLogin"><a class="dokmehLogin" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">ورود</span></a></span>
                </form>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
</body>
</html>
<?php $con->close();?>