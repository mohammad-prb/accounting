<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

// نوع = 1:خروجی و ورودی - 2:خروجی - 3:ورودی
if (isset($_POST["id"])) $id = htmlspecialchars(stripcslashes(trim($_POST["id"]))); else die();
if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["onvan"])) $onvan = htmlspecialchars(filter_var(stripcslashes(trim($_POST["onvan"])), FILTER_SANITIZE_STRING)); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();

if (preg_match("/^[1-9]+[0-9]*$/", $id) !== 1) die();
if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^.{1,30}$/", $onvan) !== 1) die();
if (preg_match("/^[1-3]$/", $noe) !== 1) die();

$sql = "select id from tbl_hesab where id=? and accountID=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $hesabID, $_SESSION["accountID"]);
$stmt->execute();
$stmt->bind_result($temp);
if (!$stmt->fetch()) die();
$stmt->close();

$sql = "select noe from tbl_dasteh where id = ? and hesabID = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $id, $hesabID);
$stmt->execute();
$stmt->bind_result($noeGhabli);
if ($stmt->fetch())
{
    $stmt->close();
    if ($noeGhabli > 1)
    {
        $sql = "select count(*) from tbl_soorathesab where vaziat = 1 and hesabID = ? and dastehID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ii", $hesabID, $id);
        $stmt->execute();
        $stmt->bind_result($tedad);
        if ($stmt->fetch())
        {
            if ($noeGhabli == 2 && $noe == 3 && $tedad > 0) die("er:noe");
            if ($noeGhabli == 3 && $noe == 2 && $tedad > 0) die("er:noe");
        }
        $stmt->close();
    }
    elseif ($noe == 2)
    {
        $sql = "select count(*) from tbl_soorathesab where vaziat = 1 and khoroojiAst = 0 and hesabID = ? and dastehID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ii", $hesabID, $id);
        $stmt->execute();
        $stmt->bind_result($tedad);
        if ($stmt->fetch()) if ($tedad > 0) die("er:khorooji");
        $stmt->close();
    }
    elseif ($noe == 3)
    {
        $sql = "select count(*) from tbl_soorathesab where vaziat = 1 and khoroojiAst = 1 and hesabID = ? and dastehID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ii", $hesabID, $id);
        $stmt->execute();
        $stmt->bind_result($tedad);
        if ($stmt->fetch()) if ($tedad > 0) die("er:voroodi");
        $stmt->close();
    }
}
else die();

$sql = "update tbl_dasteh set onvan = ?, noe = ? where id = ? and hesabID = ? and vaziat = 1";
$stmt = $con->prepare($sql);
$stmt->bind_param("siii", $onvan, $noe, $id, $hesabID);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();