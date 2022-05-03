<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("code/jdf.php");
include ("code/lib.php");
include ("code/etesal-db.php");

if (isset($_GET["kh"])) if (isset($_SESSION["accountID"])) unset($_SESSION["accountID"]);

if ((!isset($_SESSION["tedadTalash"]) || $_SESSION["tedadTalash"] < 5) && !isset($_SESSION["accountID"]) && $_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST["user"]) && isset($_POST["pass"]))
{
    if (!isset($_SESSION["tedadTalash"])) $_SESSION["tedadTalash"] = 0;
    $user = (string)$_POST["user"];
    $pass = hash("md5", $_POST["pass"]);

    if (preg_match("/^09\d{9}$/", $user) == 1)
        $sql = "select id from tbl_account where vaziat = 1 and mobile = ? and ramz = ?";
    else
        $sql = "select id from tbl_account where vaziat = 1 and email = ? and ramz = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $user, $pass);
    $stmt->execute();
    $stmt->bind_result($id);
    if ($stmt->fetch())
    {
        $_SESSION["tedadTalash"] = 0;
        $_SESSION["accountID"] = $id;
    }
    else
    {
        if (isset($_SESSION["accountID"])) unset($_SESSION["accountID"]);
        $_SESSION["tedadTalash"]++;
    }
    $stmt->close();
}

if (isset($_SESSION["accountID"])) header("location:index.php");
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
                <form action="login.php" method="post" name="login">
                    <div id="titrLogin"><span class="icon"></span><span class="matnTitr">ورود به سیستم</span></div>
                    <div id="matnLogin">
                        <div class="kadrEtelaatLogin">
                            <div class="titrEtelaatLogin"><span class="icon"></span></div>
                            <input type="text" name="user" class="txtLogin" placeholder="موبایل یا ایمیل" id="usernameLogin"<?php echo (isset($_SESSION["tedadTalash"]) && $_SESSION["tedadTalash"] >= 5 ? ' style=\'pointer-events: none;\'' : '');?>/>
                        </div>
                        <div class="kadrEtelaatLogin">
                            <div class="titrEtelaatLogin"><span class="icon"></span></div>
                            <input type="password" name="pass" class="txtLogin" placeholder="رمز عبور" id="passwordLogin"<?php echo (isset($_SESSION["tedadTalash"]) && $_SESSION["tedadTalash"] >= 5 ? ' style=\'pointer-events: none;\'' : '');?>/>
                        </div>
                    </div>
                    <?php
                    if (isset($_SESSION["tedadTalash"]) && $_SESSION["tedadTalash"] >= 5)
                        echo '<div id="errorLogin"><span class="icon"></span><span class="matnTitr">ورود بیشتر از حد مجاز انجام شد، لطفا بعدا تلاش کنید.</span></div>';
                    elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
                        echo @'<div id="errorLogin"><span class="icon"></span><span class="matnTitr">اطلاعات وارد شده نادرست است.</span></div>
                                <span id="kadrDokmehLogin"><a class="dokmehLogin" href="javascript:void (0);" onclick="ersalForm(this.parentElement.parentElement);"><span class="icon"></span><span class="matnTitr">ورود</span></a></span>';
                    else
                        echo '<span id="kadrDokmehLogin"><a class="dokmehLogin" href="javascript:void (0);" onclick="ersalForm(this.parentElement.parentElement);"><span class="icon"></span><span class="matnTitr">ورود</span></a></span>';
                    ?>
                </form>
            </div>
        </div>
    </div>

</div>
<script src="script/lib.js"></script>
<script src="script/main.js"></script>
<script>
    /*      ارسال فرم ورود      */
    function ersalForm(lmnForm)
    {
        var username = document.getElementById("usernameLogin").value.toString().trim();
        var password = document.getElementById("passwordLogin").value.toString().trim();
        var errorDarad = false;

        if (!check(username, '^09[0-9]{9}$') && !check(username, '^[a-z0-9\.]+@[a-z0-9\.]+\.[a-z0-9]$', "i"))
        {
            errorInput(document.getElementById("usernameLogin"));
            errorDarad = true;
        }

        if (password === "")
        {
            errorInput(document.getElementById("passwordLogin"));
            errorDarad = true;
        }

        if (errorDarad) return;
        lmnForm.submit();
        namayeshLoading(document.getElementById("kadrLogin"));
    }
    document.getElementsByTagName("form")[0].onkeydown = function (e) {if (e.keyCode === 13) ersalForm(this);};
    document.getElementById("usernameLogin").focus();
</script>
</body>
</html>
<?php $con->close();?>