<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
if (isset($_POST["nam"])) $nam = htmlspecialchars(filter_var(stripcslashes(trim($_POST["nam"])), FILTER_SANITIZE_STRING)); else die();
if (isset($_POST["shomHesab"])) $shomHesab = htmlspecialchars(stripcslashes(trim($_POST["shomHesab"]))); else die();
if (isset($_POST["shomKart"])) $shomKart = htmlspecialchars(stripcslashes(trim($_POST["shomKart"]))); else die();
if (isset($_POST["mandehTaraz"])) $mandehTaraz = htmlspecialchars(stripcslashes(trim($_POST["mandehTaraz"]))); else die();
if (isset($_POST["bankID"])) $bankID = htmlspecialchars(stripcslashes(trim($_POST["bankID"]))); else die();

if (preg_match("/^[1-9]+[0-9]*$/", $id) !== 1) die();
if (preg_match("/^.{1,30}$/", $nam) !== 1) die();
if (preg_match("/^[0-9]{1,100}$/", $shomHesab) !== 1) die();
if (preg_match("/^[0-9]{16}$/", $shomKart) !== 1) die();
if (preg_match("/^(0|[1-9][0-9]*)$/", $mandehTaraz) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $bankID) !== 1) die();

$sql = "update tbl_hesab set nam = ?, shomHesab = ?, shomKart = ?, mablaghTaraz = ?, bankID = ? where id = ? and accountID = ? and vaziat = 1";
$stmt = $con->prepare($sql);
$stmt->bind_param("sssiiii", $nam, $shomHesab, $shomKart, $mandehTaraz, $bankID, $id, $_SESSION["accountID"]);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();