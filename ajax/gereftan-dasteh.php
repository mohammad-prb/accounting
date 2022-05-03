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
$tarikhAlan = jdate("Y/m", "", "", "Asia/Tehran", "en");

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($id);
if (!$stmt->fetch()) die();
$stmt->close();

$arrNatijeh = array();

$sql = "select id, onvan, noe, tartib, namayesh from tbl_dasteh where vaziat = 1 and (hesabID = ". $hesabID ." or hesabID = 0) order by hesabID desc, tartib";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrNatijeh, array("dastehID"=>$row["id"], "onvan"=>$row["onvan"], "noe"=>$row["noe"], "tartib"=>$row["tartib"], "namayesh"=>$row["namayesh"], "tedadKol"=>0, "tedadSal"=>0, "tedadMah"=>0));

$i = 0;
$sql = @"select dastehID, tarikh from tbl_dasteh
        left join tbl_soorathesab on tbl_dasteh.id = dastehID
        where tbl_soorathesab.vaziat = 1 and tbl_dasteh.vaziat = 1 and (tbl_soorathesab.hesabID = ". $hesabID ." or tbl_soorathesab.hesabID = 0) order by tbl_dasteh.hesabID desc, tartib, tarikh";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        while ($arrNatijeh[$i]["dastehID"] != $row["dastehID"]) $i++;

        $arrNatijeh[$i]["tedadKol"]++;
        if (substr($tarikhAlan, 0, 4) == substr($row["tarikh"], 0, 4)) $arrNatijeh[$i]["tedadSal"]++;
        if ($tarikhAlan == substr($row["tarikh"], 0, 7)) $arrNatijeh[$i]["tedadMah"]++;
    }
}

echo json_encode($arrNatijeh);
$con->close();