<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["meghdar"])) $meghdar = htmlspecialchars(stripcslashes(trim($_POST["meghdar"]))); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();

if ($noe === "mobile")
{
    if (preg_match("/^0\d{10}$/", $meghdar) !== 1) die();
}
elseif ($noe === "email")
{
    if (filter_var($meghdar, FILTER_VALIDATE_EMAIL) === false) die();
}
else die();

// تکراری نبودن ایمیل و موبایل در خود جدول جلوگیری شده است (ستون موبایل و ایمیل در دیتابیس یونیک میباشند)
if ($noe === "mobile")
    $sql = "update tbl_account set mobile = ? where id = ?";
elseif ($noe === "email")
    $sql = "update tbl_account set email = ? where id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("si", $meghdar, $_SESSION["accountID"]);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();