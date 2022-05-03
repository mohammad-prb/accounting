<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["noeVariz"])) $noeVariz = htmlspecialchars(stripcslashes(trim($_POST["noeVariz"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["dastehID"])) $dastehID = htmlspecialchars(stripcslashes(trim($_POST["dastehID"]))); else die();
if (isset($_POST["fard"])) $fard = htmlspecialchars(stripcslashes(trim($_POST["fard"]))); else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();
if (isset($_POST["tozih"])) $tozih = "%".htmlspecialchars(stripcslashes(trim($_POST["tozih"])))."%"; else die();

if (preg_match("/^(hameh|[0-1])$/", $noeVariz) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^(hameh|[1-9]+[0-9]*)$/", $dastehID) !== 1) die();
if (preg_match("/^(hameh|[1-9]+[0-9]*)$/", $fard) !== 1) die();
if (preg_match("/^(|0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(|0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^(|[1-9][0-9]{3})$/", $sal) !== 1) die();
if (preg_match("/^(|[1-9][0-9]*)$/", $mablagh) !== 1) die();

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($temp);
if (!$stmt->fetch()) die();
$stmt->close();

$vasilehID = 0;
if ((integer)$noeVariz == 1)
{
    if (isset($_POST["vasileh"])) $vasilehID = $_POST["vasileh"]; else die();
    if (preg_match("/^(hameh|[1-5])$/", $vasilehID) !== 1) die();
}

$arrNatijeh = array();
$sql = @"select tbl_soorathesab.id as id, khoroojiAst, tbl_vasileh.nam as vasileh, vasilehID, dastehID, onvan, fardID, tbl_afrad.nam as nam, mablagh, tarikh, tozih from tbl_soorathesab
        inner join tbl_dasteh on tbl_dasteh.id = dastehID
        left join tbl_vasileh on tbl_vasileh.id = vasilehID
        left join tbl_afrad on tbl_afrad.id = fardID
        where tbl_soorathesab.vaziat = 1 and tbl_soorathesab.hesabID = " . $hesabID;

if ($dastehID != "hameh") $sql .= " and dastehID = " . $dastehID;
if ($mablagh != "") $sql .= " and mablagh = " . $mablagh;
if ($noeVariz != "hameh")
{
    $sql .= " and khoroojiAst = " . $noeVariz;
    if ($noeVariz == 1 && $vasilehID != "hameh") $sql .= " and vasilehID = " . $vasilehID;
}

if ($fard != "hameh") $sql .= " and fardID = " . $fard;
if (strlen($mah) == 1) $mah = "0".$mah;
if (strlen($rooz) == 1) $rooz = "0".$rooz;

if ($sal == "") $strTarikh = "____/";
else $strTarikh = $sal . "/";
if ($mah == "") $strTarikh .= "__/";
else $strTarikh .= $mah . "/";
if ($rooz == "") $strTarikh .= "__";
else $strTarikh .= $rooz;

$sql .= " and tarikh like '". $strTarikh ."' and tozih like '". $tozih ."' order by tarikh desc, id desc";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrNatijeh, $row);

echo json_encode($arrNatijeh);
$con->close();