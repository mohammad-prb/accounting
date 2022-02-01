<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["nam"])) $nam = htmlspecialchars(filter_var(stripcslashes(trim($_POST["nam"])), FILTER_SANITIZE_STRING)); else die();
if (isset($_POST["bank"])) $bankID = htmlspecialchars(stripcslashes(trim($_POST["bank"]))); else die();
if (isset($_POST["shomHesab"])) $shomHesab = htmlspecialchars(stripcslashes(trim($_POST["shomHesab"]))); else die();
if (isset($_POST["shomKart"])) $shomKart = htmlspecialchars(stripcslashes(trim($_POST["shomKart"]))); else die();
if (isset($_POST["taraz"])) $mandehTaraz = htmlspecialchars(stripcslashes(trim($_POST["taraz"]))); else die();
$tarikhEftetah = jdate("Y/m/d", "", "", "Asia/Tehran", "en");

if (preg_match("/^.{1,30}$/", $nam) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $bankID) !== 1) die();
if (preg_match("/^[0-9]{1,100}$/", $shomHesab) !== 1) die();
if (preg_match("/^[0-9]{16}$/", $shomKart) !== 1) die();
if (preg_match("/^(0|[1-9][0-9]*)$/", $mandehTaraz) !== 1) die();

$sql = "select tartib from tbl_hesab where vaziat = 1 order by tartib desc limit 1";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    if ($row = $result->fetch_assoc())
        $tartib = $row["tartib"] + 1;

$sql = "insert into tbl_hesab (nam, vaziat, bankID, shomHesab, shomKart, mablaghTaraz, tarikhEftetah, tartib) values (?,1,?,?,?,?,?,?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("sissisi", $nam, $bankID, $shomHesab, $shomKart, $mandehTaraz, $tarikhEftetah, $tartib);
if ($stmt->execute() == true) echo "ok:" . $stmt->insert_id . ":" . $tartib . ":" . $tarikhEftetah;
$stmt->close();
$con->close();