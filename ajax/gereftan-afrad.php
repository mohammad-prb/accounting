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

$arrNatijeh = array();

$sql = "select id, nam, noe, tartib from tbl_afrad where vaziat = 1 and (hesabID = ". $hesabID ." or hesabID = 0) order by hesabID desc, tartib";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrNatijeh, array("fardID"=>$row["id"], "nam"=>$row["nam"], "noe"=>$row["noe"], "tartib"=>$row["tartib"], "tedadKol"=>0, "tedadSal"=>0, "tedadMah"=>0));

$i = 0;
$sql = @"select fardID, tarikh from tbl_afrad
        left join tbl_soorathesab on tbl_afrad.id = fardID
        where tbl_soorathesab.vaziat = 1 and tbl_afrad.vaziat = 1 and (tbl_soorathesab.hesabID = ". $hesabID ." or tbl_soorathesab.hesabID = 0) order by tbl_afrad.hesabID desc, tartib, tarikh";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        while ($arrNatijeh[$i]["fardID"] != $row["fardID"]) $i++;

        $arrNatijeh[$i]["tedadKol"]++;
        if (substr($tarikhAlan, 0, 4) == substr($row["tarikh"], 0, 4)) $arrNatijeh[$i]["tedadSal"]++;
        if ($tarikhAlan == substr($row["tarikh"], 0, 7)) $arrNatijeh[$i]["tedadMah"]++;
    }
}

echo json_encode($arrNatijeh);
$con->close();