<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (isset($_POST["ramz"])) $ramz = hash("md5", trim($_POST["ramz"])); else die();
if (!isset($_SESSION["tedadTalashHazf"])) $_SESSION["tedadTalashHazf"] = 0;
elseif ($_SESSION["tedadTalashHazf"] >= 3) die("er:tedad");

$sql = "select id from tbl_account where id = ". $_SESSION["accountID"] ." and ramz = '". $ramz . "'";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        $sql = "update tbl_account set vaziat = 0 where id = ".  $row["id"];
        if ($con->query($sql) === true)
        {
            session_unset();
            echo "ok";
        }
    }
}
else $_SESSION["tedadTalashHazf"]++;
$con->close();