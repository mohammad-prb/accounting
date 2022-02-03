<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["ebarat"])) $ebarat = htmlspecialchars(stripcslashes(trim($_POST["ebarat"]))); else die();
if (isset($_POST["khoroojiAst"])) $khoroojiAst = htmlspecialchars(stripcslashes(trim($_POST["khoroojiAst"]))); else die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[0-1]$/", $khoroojiAst) !== 1) die();
$ebaratLike = "%" . $ebarat . "%";

$arrNatijeh = array();
$sql = @"select tozih, count(*) as tedad from tbl_soorathesab
        where tozih like ? and tozih <> ? and hesabID = ? and khoroojiAst = ? and vaziat = 1 and tozih <> ''
        group by tozih order by tedad desc limit 5";
$stmt = $con->prepare($sql);
$stmt->bind_param("ssii", $ebaratLike, $ebarat, $hesabID, $khoroojiAst);
$stmt->execute();
$stmt->bind_result($tozih, $tedad);
while ($stmt->fetch()) array_push($arrNatijeh, array("tozih"=>$tozih, "tedad"=>$tedad));
$stmt->close();
$con->close();

echo json_encode($arrNatijeh);