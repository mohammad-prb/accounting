<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["arr"]) && is_string($_POST["arr"]) && is_array(json_decode($_POST["arr"], true))) $arrAfrad = json_decode($_POST["arr"]); else die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();

$sql = "";
for ($i=0; $i<count($arrAfrad); $i++)
    $sql .= "update tbl_afrad set tartib = ". ($i+1) ." where id = ". $arrAfrad[$i] ." and hesabID = ". $hesabID ." and vaziat = 1;";

if ($con->multi_query($sql) === true) echo "ok";
$con->close();