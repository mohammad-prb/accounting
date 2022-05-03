<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["hazfDarad"])) $hazfDarad = htmlspecialchars(stripcslashes(trim($_POST["hazfDarad"]))); else die();

if (preg_match("/^[1-9][0-9]*$/", $id) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[0-1]$/", $hazfDarad) !== 1) die();

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($temp);
if (!$stmt->fetch()) die();
$stmt->close();

if ($hazfDarad == 1)
{
    $sql = "update tbl_barnameh set tedadPardakht = tedadPardakht-1 where vaziat = 1 and tedadPardakht > 0 and hesabID = ? and id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $hesabID, $id);
    if ($stmt->execute() != true) die("er:hazf");
    $stmt->close();
}

$sql = "select id, hesabID, onvan, khoroojiAst, noeID, gam, mablagh, tarikhShoroo, tedadKol, tedadPardakht from tbl_barnameh where vaziat = 1 and hesabID = ". $hesabID ." and id = " . $id;
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        switch ($row["noeID"])
        {
            case 1:
                $row["noe"] = "روزانه";
                if ((integer)$row["tedadKol"] == 0)
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "rooz", (integer)$row["gam"], (integer)$row["tedadPardakht"]);
                else
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "rooz", (integer)$row["gam"], (integer)$row["tedadKol"]);
                break;
            case 2:
                $row["noe"] = "ماهانه";
                if ((integer)$row["tedadKol"] == 0)
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "mah", (integer)$row["gam"], (integer)$row["tedadPardakht"]);
                else
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "mah", (integer)$row["gam"], (integer)$row["tedadKol"]);
                break;
            case 3:
                $row["noe"] = "سالانه";
                if ((integer)$row["tedadKol"] == 0)
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "sal", (integer)$row["gam"], (integer)$row["tedadPardakht"]);
                else
                    $row["rizTarikh"] = gereftanRizTarikh($row["tarikhShoroo"], "sal", (integer)$row["gam"], (integer)$row["tedadKol"]);
                break;
            default: die();
        }

        if ((integer)$row["tedadKol"] == 0)
        {
            $row["tedadMandeh"] = "-";
            $row["mablaghKol"] = "-";
            $row["mablaghMandeh"] = "-";
            $row["mablaghPardakhti"] = (integer)$row["mablagh"] * (integer)$row["tedadPardakht"];
        }
        else
        {
            $row["tedadMandeh"] = (integer)$row["tedadKol"] - (integer)$row["tedadPardakht"];
            $row["mablaghKol"] = (integer)$row["mablagh"] * (integer)$row["tedadKol"];
            $row["mablaghPardakhti"] = (integer)$row["mablagh"] * (integer)$row["tedadPardakht"];
            $row["mablaghMandeh"] = $row["mablaghKol"] - $row["mablaghPardakhti"];
        }

        if ((integer)$row["tedadKol"] != 0 && $row["tedadMandeh"] == 0)
        {
            $row["vaziatID"] = "3";
            $row["vaziat"] = "تسویه";
        }
        else
        {
            $row["vaziatID"] = "1";
            $row["vaziat"] = "جاری";
        }
    }
}

echo json_encode($row);
$con->close();