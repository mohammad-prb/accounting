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

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($temp);
if (!$stmt->fetch()) die();
$stmt->close();

$arrDasteh = $arrAfrad = array();

$sql = "select id, onvan, noe, tartib from tbl_dasteh where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 and namayesh = 1 order by hesabID desc, tartib";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrDasteh, $row);

$sql = "select id, nam, noe, tartib from tbl_afrad where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 and namayesh = 1 order by hesabID desc, tartib";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrAfrad, $row);

$arrNatijeh = array("dasteh"=>$arrDasteh, "afrad"=>$arrAfrad);

$sql = @"(select tbl_soorathesab.id as id, mablagh, tarikh, onvan, khoroojiAst from tbl_soorathesab
        inner join tbl_dasteh on tbl_dasteh.id = dastehID
        where tbl_soorathesab.vaziat = 1 and tbl_soorathesab.hesabID = ". $hesabID .@" and khoroojiAst = 1
        order by tbl_soorathesab.id desc limit 1)
        union
        (select tbl_soorathesab.id as id, mablagh, tarikh, onvan, khoroojiAst from tbl_soorathesab
        inner join tbl_dasteh on tbl_dasteh.id = dastehID
        where tbl_soorathesab.vaziat = 1 and tbl_soorathesab.hesabID = ". $hesabID .@" and khoroojiAst = 0
        order by tbl_soorathesab.id desc limit 1)";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        if ($row["khoroojiAst"] == 1) $arrNatijeh["khorooji"] = $row;
        else $arrNatijeh["voroodi"] = $row;
    }
}

echo json_encode($arrNatijeh);
$con->close();