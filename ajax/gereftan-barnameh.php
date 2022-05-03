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
if (isset($_POST["vaziat"])) $vaziat = htmlspecialchars(stripcslashes(trim($_POST["vaziat"]))); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();
if (isset($_POST["onvan"])) $onvan = "%".htmlspecialchars(stripcslashes(trim($_POST["onvan"])))."%"; else die();
if (isset($_POST["gam"])) $gam = htmlspecialchars(stripcslashes(trim($_POST["gam"]))); else die();
if (isset($_POST["tedad"])) $tedad = htmlspecialchars(stripcslashes(trim($_POST["tedad"]))); else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();
if (isset($_POST["idPardakht"])) $idPardakht = htmlspecialchars(stripcslashes(trim($_POST["idPardakht"])));
if (isset($_POST["tasviehAst"])) $tasviehAst = htmlspecialchars(stripcslashes(trim($_POST["tasviehAst"])));

if (preg_match("/^(hameh|[0-1])$/", $noeVariz) !== 1) die();
if (preg_match("/^(hameh|[1-5])$/", $noe) !== 1) die();
if (preg_match("/^(|[1-9][0-9]*)$/", $gam) !== 1) die();
if (preg_match("/^(|[1-9][0-9]*)$/", $tedad) !== 1) die();
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

if (isset($idPardakht))
{
    if (preg_match("/^[1-9]+[0-9]*$/", $idPardakht) !== 1) die();
    if (preg_match("/^[0-1]$/", $tasviehAst) !== 1) die();

    if ($tasviehAst == 1)
    {
        $sql = "select tedadPardakht, tedadKol from tbl_barnameh where vaziat = 1 and hesabID = ? and id = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ii", $hesabID, $idPardakht);
        $stmt->execute();
        $stmt->bind_result($tedadPardakht, $tedadKol);
        if ($stmt->fetch())
        {
            $max = max($tedadPardakht, $tedadKol);
            $sql = "update tbl_barnameh set tedadPardakht = ".$max.", tedadKol = ".$max." where vaziat = 1 and hesabID = ? and id = ?";
        }
        $stmt->close();
    }
    else $sql = "update tbl_barnameh set tedadPardakht = tedadPardakht+1 where vaziat = 1 and hesabID = ? and id = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $hesabID, $idPardakht);
    if ($stmt->execute() != true)
    {
        $stmt->close();
        $con->close();
        die();
    }
    $stmt->close();
}

$tarikhAlan = jdate("Y/m/d", "", "", "Asia/Tehran", "en");
$arrNatijeh = array();
$sql = "select id, onvan, khoroojiAst, noeID, gam, mablagh, tarikhShoroo, tedadKol, tedadPardakht from tbl_barnameh where vaziat = 1 and hesabID = " . $hesabID;

if ($noe != "hameh") $sql .= " and noeID = " . $noe;
if ($gam != "") $sql .= " and gam = " . $gam;
if ($tedad != "") $sql .= " and tedadKol = " . $tedad;
if ($mablagh != "") $sql .= " and mablagh = " . $mablagh;
if ($noeVariz != "hameh") $sql .= " and khoroojiAst = " . $noeVariz;
if (strlen($mah) == 1) $mah = "0".$mah;
if (strlen($rooz) == 1) $rooz = "0".$rooz;

if ($vaziat == "jari") $sql .= " and tedadKol <> tedadPardakht";
elseif ($vaziat == "tasvieh") $sql .= " and tedadKol = tedadPardakht";

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
                $row["noe"] = "روزانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "rooz", $row["gam"], $row["tedadPardakht"]);
                break;
            case 2:
                $row["noe"] = "ماهانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "mah", $row["gam"], $row["tedadPardakht"]);
                break;
            case 3:
                $row["noe"] = "سالانه";
                $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "sal", $row["gam"], $row["tedadPardakht"]);
                break;
            default: die();
        }

        if ((integer)$row["tedadKol"] == 0)
            $row["tedadMandeh"] = "-";
        else
            $row["tedadMandeh"] = (integer)$row["tedadKol"] - (integer)$row["tedadPardakht"];

        if ((integer)$row["tedadKol"] != 0 && $row["tedadMandeh"] == 0)
        {
            $row["tarikhBadi"] = "تمام";
            $row["vaziatID"] = "3";
            $row["vaziat"] = "تسویه";
        }
        else
        {
            $row["vaziatID"] = "1";
            $row["vaziat"] = "جاری";
        }

        if ($row["tarikhBadi"] < $tarikhAlan)
        {
            $row["vaziatID"] = "2";
            $row["vaziat"] = "موعد";
        }

        if (($vaziat == "moed" && $row["tarikhBadi"] < $tarikhAlan || $vaziat != "moed"))
            array_push($arrNatijeh, $row);
    }
}

/*      تابع مرتب کردن بر اساس تاریخ بعدی      */
function moratabKon($a, $b)
{
    if ($a["tarikhBadi"] == $b["tarikhBadi"])
    {
        if ($a["tarikhShoroo"] < $b["tarikhShoroo"]) return 1;
        else return 0;
    }

    if ($a["tarikhBadi"] > $b["tarikhBadi"]) return 1;
    else return 0;
}
usort($arrNatijeh, "moratabKon");
echo json_encode($arrNatijeh);
$con->close();