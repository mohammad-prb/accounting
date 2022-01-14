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

$arrDasteh = $arrAfrad = array();

$sql = "select id, onvan, noe from tbl_dasteh where vaziat = 1 and hesabID = ". $hesabID ." order by onvan";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrDasteh, $row);

$sql = "select id, nam, noe from tbl_afrad where vaziat = 1 and hesabID = ". $hesabID ." order by nam";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrAfrad, $row);

$arrNatijeh = array("dasteh"=>$arrDasteh, "afrad"=>$arrAfrad);
echo json_encode($arrNatijeh);
$con->close();