<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["khoroojiAst"])) $khoroojiAst = htmlspecialchars(stripcslashes(trim($_POST["khoroojiAst"]))); else die();
if (isset($_POST["onvan"])) $onvan = htmlspecialchars(filter_var(stripcslashes(trim($_POST["onvan"])), FILTER_SANITIZE_STRING)); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();
if (isset($_POST["gam"])) $gam = htmlspecialchars(stripcslashes(trim($_POST["gam"]))); else die();
if (isset($_POST["tedadKol"])) $tedadKol = htmlspecialchars(stripcslashes(trim($_POST["tedadKol"]))); else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();

if (preg_match("/^[0-1]$/", $khoroojiAst) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[1-3]$/", $noe) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $gam) !== 1 && $noe == 1) die();
if (preg_match("/^(|[1-9]+[0-9]*)$/", $tedadKol) !== 1) die();
if (preg_match("/^(0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^[1-9][0-9]{3}$/", $sal) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $mablagh) !== 1) die();

$tarikh = tarikhKon($sal, $mah, $rooz);
$zamanSabt = jdate("Y-m-d H:i:s", "", "", "Asia/Tehran", "en");

$sql = "insert into tbl_barnameh (hesabID, onvan, khoroojiAst, noeID, gam, mablagh, tarikhShoroo, tedadKol, tedadPardakht, zamanSabt) values (?,?,?,?,?,?,?,?,0,?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("isiiiisis", $hesabID, $onvan, $khoroojiAst, $noe, $gam, $mablagh, $tarikh, $tedadKol, $zamanSabt);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();