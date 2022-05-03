<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
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

if (empty($onvan)) die();
if (preg_match("/^[1-9][0-9]*$/", $id) !== 1) die();
if (preg_match("/^[0-1]$/", $khoroojiAst) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[1-3]$/", $noe) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $gam) !== 1) die();
if (preg_match("/^(|[1-9][0-9]*)$/", $tedadKol) !== 1) die();
if (preg_match("/^(0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^[1-9][0-9]{3}$/", $sal) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $mablagh) !== 1) die();
$tarikh = tarikhKon($sal, $mah, $rooz);
if (empty($tedadKol)) $tedadKol = 0;

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($id);
if (!$stmt->fetch()) die();
$stmt->close();

$sql = "update tbl_barnameh set onvan=?, khoroojiAst=?, noeID=?, gam=?, tedadKol=?, tarikhShoroo=?, mablagh=? where id=? and hesabID=? and vaziat=1";
$stmt = $con->prepare($sql);
$stmt->bind_param("siiiisiii", $onvan, $khoroojiAst, $noe, $gam, $tedadKol, $tarikh, $mablagh, $id, $hesabID);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();