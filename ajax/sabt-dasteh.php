<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

// نوع = 1:خروجی و ورودی - 2:خروجی - 3:ورودی
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["onvan"])) $onvan = htmlspecialchars(filter_var(stripcslashes(trim($_POST["onvan"])), FILTER_SANITIZE_STRING)); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();
if (isset($_POST["tartib"])) $tartib = htmlspecialchars(stripcslashes(trim($_POST["tartib"]))); else die();

if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^.{1,30}$/", $onvan) !== 1) die();
if (preg_match("/^[1-3]$/", $noe) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $tartib) !== 1) die();

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($id);
if (!$stmt->fetch()) die();
$stmt->close();

$sql = "insert into tbl_dasteh (hesabID, onvan, vaziat, noe, tartib) values (?,?,1,?,?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("isii", $hesabID, $onvan, $noe, $tartib);
if ($stmt->execute() == true) echo "ok:" . $stmt->insert_id;
$stmt->close();
$con->close();