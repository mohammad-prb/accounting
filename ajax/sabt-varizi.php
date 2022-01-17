<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["khoroojiAst"])) $khoroojiAst = htmlspecialchars(stripcslashes(trim($_POST["khoroojiAst"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["dastehID"])) $dastehID = htmlspecialchars(stripcslashes(trim($_POST["dastehID"]))); else die();
if (isset($_POST["fard"])) $fard = htmlspecialchars(stripcslashes(trim($_POST["fard"]))); else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();
if (isset($_POST["tozih"])) $tozih = htmlspecialchars(stripcslashes(trim($_POST["tozih"]))); else die();

if (preg_match("/^[0-1]$/", $khoroojiAst) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $dastehID) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $fard) !== 1) die();
if (preg_match("/^(0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^[1-9][0-9]{3}$/", $sal) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $mablagh) !== 1) die();

$tarikh = tarikhKon($sal, $mah, $rooz);
$zamanSabt = jdate("Y-m-d H:i:s", "", "", "Asia/Tehran", "en");

if ((integer)$khoroojiAst == 1)
{
    if (isset($_POST["noeID"])) $noeID = $_POST["noeID"]; else die();
    if (isset($_POST["vasilehID"])) $vasilehID = $_POST["vasilehID"]; else die();
    if (preg_match("/^[1-2]$/", $noeID) !== 1 || preg_match("/^[1-6]$/", $vasilehID) !== 1) die();
}
else
{
    $noeID = $vasilehID = 0;
}

$sql = "insert into tbl_soorathesab (hesabID, khoroojiAst, noeID, vasilehID, dastehID, fardID, mablagh, tarikh, tozih, zamanSabt) values (?,?,?,?,?,?,?,?,?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("iiiiiiisss", $hesabID, $khoroojiAst, $noeID, $vasilehID, $dastehID, $fard, $mablagh, $tarikh, $tozih, $zamanSabt);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();