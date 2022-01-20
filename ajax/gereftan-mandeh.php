<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
include ("../code/mohasebeh-mandeh.php");
echo $mandeh;
$con->close();