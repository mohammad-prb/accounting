<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
if (isset($_POST["khoroojiAst"])) $khoroojiAst = htmlspecialchars(stripcslashes(trim($_POST["khoroojiAst"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["dastehID"])) $dastehID = htmlspecialchars(stripcslashes(trim($_POST["dastehID"]))); else die();
if (isset($_POST["fard"])) $fard = htmlspecialchars(stripcslashes(trim($_POST["fard"]))); else die();
if (isset($_POST["rooz"])) $rooz = htmlspecialchars(stripcslashes(trim($_POST["rooz"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();
if (isset($_POST["mablagh"])) $mablagh = htmlspecialchars(stripcslashes(trim($_POST["mablagh"]))); else die();
if (isset($_POST["tozih"])) $tozih = htmlspecialchars(filter_var(stripcslashes(trim($_POST["tozih"])), FILTER_SANITIZE_STRING)); else die();

if (preg_match("/^[1-9]+[0-9]*$/", $id) !== 1) die();
if (preg_match("/^[0-1]$/", $khoroojiAst) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $dastehID) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $fard) !== 1) die();
if (preg_match("/^(0?[1-9]|[1-2][0-9]|3[0-1])$/", $rooz) !== 1) die();
if (preg_match("/^(0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^[1-9][0-9]{3}$/", $sal) !== 1) die();
if (preg_match("/^[1-9][0-9]*$/", $mablagh) !== 1) die();
$tarikh = tarikhKon($sal, $mah, $rooz);

if (jmktime(0,0,0, $mah, $rooz, $sal) > time()) die("er:ayandeh");

$sql = "select tarikhEftetah from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." and id = " . $hesabID;
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        if ($tarikh < $row["tarikhEftetah"]) die("er:tarikh:" . $row["tarikhEftetah"]);
    }
    else die();
}
else die();

if ((integer)$khoroojiAst == 1)
{
    if (isset($_POST["vasilehID"])) $vasilehID = $_POST["vasilehID"]; else die();
    if (preg_match("/^[1-5]$/", $vasilehID) !== 1) die();
    if ($vasilehID != 3) $fard = 0;

    $sql = "select mablagh from tbl_soorathesab where vaziat = 1 and id = " . $id;
    $result = $con->query($sql);
    if ($result !== false && $result->num_rows > 0)
        if ($row = $result->fetch_assoc())
            $mablaghGhabli = $row["mablagh"];

    include ("../code/mohasebeh-mandeh.php");
    if (($mandeh + $mablaghGhabli - $mablagh) < 0) die("er:mandeh");

    $sql = "update tbl_soorathesab set vasilehID=?, dastehID=?, fardID=?, mablagh=?, tarikh=?, tozih=? where id=? and hesabID=? and khoroojiAst=1 and vaziat=1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("iiiissii", $vasilehID, $dastehID, $fard, $mablagh, $tarikh, $tozih, $id, $hesabID);
}
else
{
    $sql = "update tbl_soorathesab set dastehID=?, fardID=?, mablagh=?, tarikh=?, tozih=? where id=? and hesabID=? and khoroojiAst=0 and vaziat=1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("iiissii", $dastehID, $fard, $mablagh, $tarikh, $tozih, $id, $hesabID);
}
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();