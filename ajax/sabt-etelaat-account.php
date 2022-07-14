<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["meghdar"])) $meghdar = htmlspecialchars(stripcslashes(trim($_POST["meghdar"]))); else die();
if (isset($_POST["noe"])) $noe = htmlspecialchars(stripcslashes(trim($_POST["noe"]))); else die();

if ($noe === "mobile")
{
    if (preg_match("/^0\d{10}$/", $meghdar) !== 1) die();
}
elseif ($noe === "email")
{
    if (filter_var($meghdar, FILTER_VALIDATE_EMAIL) === false) die();
}
else die();

$sql = "select id from tbl_account where vaziat = 1 and ". $noe ." = '". $meghdar ."'";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    if ($row = $result->fetch_assoc())
        die("er:tekrari");

if ($noe === "mobile")
    $sql = "update tbl_account set mobile = ? where id = ?";
elseif ($noe === "email")
    $sql = "update tbl_account set email = ? where id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("si", $meghdar, $_SESSION["accountID"]);
if ($stmt->execute() == true) echo "ok";
$stmt->close();
$con->close();