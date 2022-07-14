<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/jdf.php");
include ("../code/lib.php");
include ("../code/etesal-db.php");

if (!isset($_SESSION["tedadTalashTaghir"])) $_SESSION["tedadTalashTaghir"] = 0;
elseif ($_SESSION["tedadTalashTaghir"] >= 3) die("er:tedad");

if (isset($_POST["ramzG"])) $ramzGhabli = htmlspecialchars(stripcslashes(trim($_POST["ramzG"]))); else die();
if (isset($_POST["ramzJ"])) $ramzJadid = htmlspecialchars(stripcslashes(trim($_POST["ramzJ"]))); else die();
if (isset($_POST["ramzT"])) $tekrarRamz = htmlspecialchars(stripcslashes(trim($_POST["ramzT"]))); else die();

if (mb_strlen($ramzGhabli) < 8) die();
if (mb_strlen($ramzJadid) < 8) die();
if (mb_strlen($tekrarRamz) < 8) die();
if ($ramzJadid !== $tekrarRamz) die();

$ramzGhabli = hash("md5", $ramzGhabli);
$ramzJadid = hash("md5", $ramzJadid);

$sql = "select ramz from tbl_account where id = " . $_SESSION["accountID"];
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        if ($ramzGhabli != $row["ramz"])
        {
            $_SESSION["tedadTalashTaghir"]++;
            die("er:ramz");
        }

        $sql = "update tbl_account set ramz = ? where ramz = ? and id = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ssi", $ramzJadid, $ramzGhabli, $_SESSION["accountID"]);
        if ($stmt->execute() == true)
        {
            $_SESSION["tedadTalashTaghir"] = 0;
            echo "ok";
        }
        $stmt->close();
    }
}
$con->close();