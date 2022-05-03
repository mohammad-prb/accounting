<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
if (preg_match("/^[1-9]+[0-9]*$/", $id) !== 1) die();

$sql = "update tbl_hesab set vaziat = 0 , tartib = 0 where vaziat = 1 and accountID = ? and id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $_SESSION["accountID"], $id);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();