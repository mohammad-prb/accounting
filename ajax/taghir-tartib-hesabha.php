<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["arr"]) && is_string($_POST["arr"]) && is_array(json_decode($_POST["arr"], true))) $arrHesab = json_decode($_POST["arr"]); else die();
$sql = "";
for ($i=0; $i<count($arrHesab); $i++)
    $sql .= "update tbl_hesab set tartib = ". ($i+1) ." where id = ". $arrHesab[$i] ." and vaziat = 1;";
if ($con->multi_query($sql) === true) echo "ok";
$con->close();