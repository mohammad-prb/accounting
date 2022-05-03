<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["ai"]) && is_string($_POST["ai"]) && is_array(json_decode($_POST["ai"], true))) $arrId = json_decode($_POST["ai"]); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($temp);
if (!$stmt->fetch()) die();
$stmt->close();

$arrNatijeh = array();
for ($i=0; $i<count($arrId); $i++)
{
    if (preg_match("/^[1-9]+[0-9]*$/", $arrId[$i]) === 1)
    {
        $sql = "update tbl_soorathesab set vaziat = 0 where vaziat = 1 and id = ? and hesabID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ii", $arrId[$i], $hesabID);
        if ($stmt->execute() == true) array_push($arrNatijeh, "ok");
        else array_push($arrNatijeh, "er1");
        $stmt->close();
    }
    else array_push($arrNatijeh, "er2");
}
echo json_encode($arrNatijeh);
$con->close();