<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["noeVariz"])) $noeVariz = htmlspecialchars(stripcslashes(trim($_POST["noeVariz"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();
if (isset($_POST["onvan"])) $onvan = "%".htmlspecialchars(stripcslashes(trim($_POST["onvan"])))."%"; else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();


if (preg_match("/^(hameh|[0-1])$/", $noeVariz) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^(hameh|[1-5])$/", $noe) !== 1) die();
if (preg_match("/^(|0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(|0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^(|[1-9][0-9]{3})$/", $sal) !== 1) die();
if (preg_match("/^(|[1-9][0-9]*)$/", $mablagh) !== 1) die();

$arrNatijeh = array();
$sql = "select onvan, khoroojiAst, noeID, mablagh, tarikhShoroo, tedadKol, tedadPardakht from tbl_barnameh where vaziat = 1 and hesabID = " . $hesabID;

if ($mablagh != "") $sql .= " and mablagh = " . $mablagh;
if ($noeVariz != "hameh") $sql .= " and khoroojiAst = " . $noeVariz;
if (strlen($mah) == 1) $mah = "0".$mah;
if (strlen($rooz) == 1) $rooz = "0".$rooz;

if ($sal == "") $strTarikh = "____/";
else $strTarikh = $sal."/";
if ($mah == "") $strTarikh .= "__/";
else $strTarikh .= $mah."/";
if ($rooz == "") $strTarikh .= "__";
else $strTarikh .= $rooz;

$sql .= " and tarikhShoroo like '". $strTarikh ."' and onvan like '". $onvan ."' order by tarikhShoroo, id desc";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        switch ($row["noeID"])
        {
            case 1:
                $row["noe"] = "یکبار";
                $row["tarikhBadi"] = $row["tarikhShoroo"];
                break;
            case 2:
                $row["noe"] = "روزانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], 1, $row["tedadPardakht"]);
                break;
            case 3:
                $row["noe"] = "هفتگی";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], 7, $row["tedadPardakht"]);
                break;
            case 4:
                $row["noe"] = "ماهانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "mah", $row["tedadPardakht"]);
                break;
            case 5:
                $row["noe"] = "سالانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "sal", $row["tedadPardakht"]);
                break;
            default: die();
        }
        $row["tedadMandeh"] = (integer)$row["tedadKol"] - (integer)$row["tedadPardakht"];
        array_push($arrNatijeh, $row);
    }
}

echo json_encode($arrNatijeh);
$con->close();