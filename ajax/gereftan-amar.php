<?php
session_start();
date_default_timezone_set("Asia/Tehran");
include ("../code/config.php");
include ("../code/taeed-etebar.php");
include ("../code/lib.php");
include ("../code/jdf.php");
include ("../code/etesal-db.php");

if (isset($_POST["hesabID"])) $hesabID = htmlspecialchars(stripcslashes(trim($_POST["hesabID"]))); else die();
if (isset($_POST["mah"])) $mah = htmlspecialchars(stripcslashes(trim($_POST["mah"]))); else die();
if (isset($_POST["sal"])) $sal = htmlspecialchars(stripcslashes(trim($_POST["sal"]))); else die();

if (preg_match("/^[1-9]+[0-9]*$/", $hesabID) !== 1) die();
if (preg_match("/^(|0?[1-9]|1[0-2])$/", $mah) !== 1) die();
if (preg_match("/^(|[1-9][0-9]{3})$/", $sal) !== 1) die();
if ($sal == "" && $mah != "") die();
if (strlen((string)$mah) == 1) $mah = "0".$mah;

if ($sal != "" && $mah != "") $sharthMahdoodeh = " and substr(tarikh,1,8) <= '" . $sal."/".$mah."/'";
elseif ($sal != "" && $mah == "") $sharthMahdoodeh = " and substr(tarikh,1,5) <= '" . $sal."/'";
else $sharthMahdoodeh = "";

$arrMax = $arrMin = $arrKhorooji = $arrVoroodi = $arrMandeh = array();
$meghdarKhorooji = $meghdarVoroodi = $tedadKhorooji = $tedadVoroodi = 0;

$sql = "select mablaghTaraz, tarikhEftetah from tbl_hesab where vaziat = 1 and id = " . $hesabID;
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    if ($row = $result->fetch_assoc())
    {
        $mandeh = (float)$row["mablaghTaraz"];
        $tarikhEftetah = $row["tarikhEftetah"];
    }
}

$shomarandehRooz = 1;
$shomarandehMah = 1;
$shomarandehSal = (integer)substr($tarikhEftetah, 0, 4);
$mandehGhabli = $mandeh;
$tarikhGhabli = "";
$sql = "select khoroojiAst, mablagh, tarikh from tbl_soorathesab where vaziat = 1 and hesabID = " . $hesabID . $sharthMahdoodeh . " order by tarikh, id";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        $khoroojiAst = (integer)$row["khoroojiAst"];
        $mablagh = (float)$row["mablagh"];
        $tarikh = $row["tarikh"];

        /*  پر کردن آرایه مقدار خروجی و ورودی  */
        if ($khoroojiAst == 1)
        {
            $mandeh -= $mablagh;

            if ($sal != "" && $mah != "" && substr($tarikh,0,8) == $sal."/".$mah."/")
            {
                $tedadKhorooji++;
                $meghdarKhorooji += $mablagh;
                $andis = (integer)substr($tarikh,8,2);
                if (isset($arrKhorooji[$andis])) $arrKhorooji[$andis] += $mablagh;
                else $arrKhorooji[$andis] = $mablagh;
            }
            elseif ($sal != "" && $mah == "" && substr($tarikh,0,5) == $sal."/")
            {
                $tedadKhorooji++;
                $meghdarKhorooji += $mablagh;
                $andis = (integer)substr($tarikh,5,2);
                if (isset($arrKhorooji[$andis])) $arrKhorooji[$andis] += $mablagh;
                else $arrKhorooji[$andis] = $mablagh;
            }
            elseif ($sal == "" && $mah == "")
            {
                $tedadKhorooji++;
                $meghdarKhorooji += $mablagh;
                if (isset($arrKhorooji[substr($tarikh,0,4)])) $arrKhorooji[substr($tarikh,0,4)] += $mablagh;
                else $arrKhorooji[(string)substr($tarikh,0,4)] = $mablagh;
            }
        }
        else
        {
            $mandeh += $mablagh;

            if ($sal != "" && $mah != "" && substr($tarikh,0,8) == $sal."/".$mah."/")
            {
                $tedadVoroodi++;
                $meghdarVoroodi += $mablagh;
                $andis = (integer)substr($tarikh,8,2);
                if (isset($arrVoroodi[$andis])) $arrVoroodi[$andis] += $mablagh;
                else $arrVoroodi[$andis] = $mablagh;
            }
            elseif ($sal != "" && $mah == "" && substr($tarikh,0,5) == $sal."/")
            {
                $tedadVoroodi++;
                $meghdarVoroodi += $mablagh;
                $andis = (integer)substr($tarikh,5,2);
                if (isset($arrVoroodi[$andis])) $arrVoroodi[$andis] += $mablagh;
                else $arrVoroodi[$andis] = $mablagh;
            }
            elseif ($sal == "" && $mah == "")
            {
                $tedadVoroodi++;
                $meghdarVoroodi += $mablagh;
                if (isset($arrVoroodi[substr($tarikh,0,4)])) $arrVoroodi[substr($tarikh,0,4)] += $mablagh;
                else $arrVoroodi[(string)substr($tarikh,0,4)] = $mablagh;
            }
        }

        /*  پر کردن آرایه مانده و ماکزیمم، مینیمم مانده  */
        if ($sal != "" && $mah != "" && substr($tarikh,0,8) == $sal."/".$mah."/")
        {
            if ($tarikhGhabli == $tarikh)
            {
                $shomarandehRooz--;
                array_pop($arrMandeh);
            }

            while ((integer)substr($tarikh,8,2) >= $shomarandehRooz)
            {
                if ((integer)substr($tarikh,8,2) == $shomarandehRooz)
                {
                    array_push($arrMandeh, $mandeh);
                    if (count($arrMandeh) > count($arrMax)) array_push($arrMax, $mandehGhabli);
                    if (count($arrMandeh) > count($arrMin)) array_push($arrMin, $mandehGhabli);

                    if ($mandeh > $arrMax[count($arrMax)-1]) $arrMax[count($arrMax)-1] = $mandeh;
                    if ($mandeh < $arrMin[count($arrMin)-1]) $arrMin[count($arrMin)-1] = $mandeh;
                }
                else
                {
                    array_push($arrMandeh, $mandehGhabli);
                    array_push($arrMax, $mandehGhabli);
                    array_push($arrMin, $mandehGhabli);
                }
                $shomarandehRooz++;
            }
        }
        elseif ($sal != "" && $mah == "" && substr($tarikh,0,5) == $sal."/")
        {
            if (substr($tarikhGhabli,5,2) == substr($tarikh,5,2))
            {
                $shomarandehMah--;
                array_pop($arrMandeh);
            }

            while ((integer)substr($tarikh,5,2) >= $shomarandehMah)
            {
                if ((integer)substr($tarikh,5,2) == $shomarandehMah)
                {
                    array_push($arrMandeh, $mandeh);
                    if (count($arrMandeh) > count($arrMax)) array_push($arrMax, $mandehGhabli);
                    if (count($arrMandeh) > count($arrMin)) array_push($arrMin, $mandehGhabli);

                    if ($mandeh > $arrMax[count($arrMax)-1]) $arrMax[count($arrMax)-1] = $mandeh;
                    if ($mandeh < $arrMin[count($arrMin)-1]) $arrMin[count($arrMin)-1] = $mandeh;
                }
                else
                {
                    array_push($arrMandeh, $mandehGhabli);
                    array_push($arrMax, $mandehGhabli);
                    array_push($arrMin, $mandehGhabli);
                }
                $shomarandehMah++;
            }
        }
        elseif ($sal == "" && $mah == "")
        {
            if (substr($tarikhGhabli,0,4) == substr($tarikh,0,4))
            {
                $shomarandehSal--;
                array_pop($arrMandeh);
            }

            while ((integer)substr($tarikh,0,4) >= $shomarandehSal)
            {
                if ((integer)substr($tarikh,0,4) == $shomarandehSal)
                {
                    array_push($arrMandeh, $mandeh);
                    if (count($arrMandeh) > count($arrMax)) array_push($arrMax, $mandehGhabli);
                    if (count($arrMandeh) > count($arrMin)) array_push($arrMin, $mandehGhabli);

                    if ($mandeh > $arrMax[count($arrMax)-1]) $arrMax[count($arrMax)-1] = $mandeh;
                    if ($mandeh < $arrMin[count($arrMin)-1]) $arrMin[count($arrMin)-1] = $mandeh;
                }
                else
                {
                    array_push($arrMandeh, $mandehGhabli);
                    array_push($arrMax, $mandehGhabli);
                    array_push($arrMin, $mandehGhabli);
                }
                $shomarandehSal++;
            }
        }

        $mandehGhabli = $mandeh;
        $tarikhGhabli = $tarikh;
    }
}

// اضافه شدن مانده و ماکزیمم و مینیمم برای زمانی که در چند روز (یا ماه یا سال) اخیر واریز ثبت نشده
if ($sal != "" && $mah != "")
{
    $timeStampInAlan = jmktime(0, 0, 0, jdate("m", "", "", "Asia/Tehran", "en"), 1, jdate("Y", "", "", "Asia/Tehran", "en"));
    $timeStampMahdoode = jmktime(0, 0, 0, $mah, 1, $sal);
    $tedadRoozMahMahdoode = jdate("t", $timeStampMahdoode, "", "Asia/Tehran", "en");

    if ($timeStampInAlan == $timeStampMahdoode)
    {
        while (count($arrMandeh) < jdate("d", "", "", "Asia/Tehran", "en"))
        {
            array_push($arrMandeh, $mandeh);
            array_push($arrMax, $mandeh);
            array_push($arrMin, $mandeh);
        }
    }
    elseif ($sal > substr($tarikhEftetah,0,4) || ($sal == substr($tarikhEftetah,0,4) && $mah == substr($tarikhEftetah,5,2)))
    {
        while (count($arrMandeh) < $tedadRoozMahMahdoode)
        {
            array_push($arrMandeh, $mandeh);
            array_push($arrMax, $mandeh);
            array_push($arrMin, $mandeh);
        }
    }
}
else if ($sal != "" && $mah == "")
{
    if ($sal == jdate("Y", "", "", "Asia/Tehran", "en"))
    {
        while (count($arrMandeh) < jdate("m", "", "", "Asia/Tehran", "en"))
        {
            array_push($arrMandeh, $mandeh);
            array_push($arrMax, $mandeh);
            array_push($arrMin, $mandeh);
        }
    }
    elseif ($sal >= substr($tarikhEftetah,0,4))
    {
        while (count($arrMandeh) < 12)
        {
            array_push($arrMandeh, $mandeh);
            array_push($arrMax, $mandeh);
            array_push($arrMin, $mandeh);
        }
    }
}

$arrDasteh = array();
$sql = @"select tbl_dasteh.id as id, onvan, noe, count(*) as tedad from tbl_dasteh
    inner join tbl_soorathesab on tbl_dasteh.id = dastehID
    where tbl_soorathesab.vaziat = 1 and tbl_dasteh.vaziat = 1 and tbl_soorathesab.hesabID = ". $hesabID . str_replace('<', '', $sharthMahdoodeh) ." and (tbl_dasteh.hesabID = ". $hesabID .@" or tbl_dasteh.hesabID = 0)
    group by dastehID order by tedad desc";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrDasteh, $row);

$arrAfrad = array();
$sql = @"select tbl_afrad.id as id, nam, noe, count(*) as tedad from tbl_afrad
    inner join tbl_soorathesab on tbl_afrad.id = fardID
    where tbl_soorathesab.vaziat = 1 and tbl_afrad.vaziat = 1 and tbl_soorathesab.hesabID = ". $hesabID . str_replace('<', '', $sharthMahdoodeh) ." and (tbl_afrad.hesabID = ". $hesabID ." or tbl_afrad.hesabID = 0)
    group by fardID order by tedad desc";
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
    while ($row = $result->fetch_assoc())
        array_push($arrAfrad, $row);

$arrNatijeh = array("arrKhorooji"=>$arrKhorooji,
    "arrVoroodi"=>$arrVoroodi,
    "arrMandeh"=>$arrMandeh,
    "arrMax"=>$arrMax,
    "arrMin"=>$arrMin,
    "arrDasteh"=>$arrDasteh,
    "arrAfrad"=>$arrAfrad,
    "meghdarKhorooji"=>$meghdarKhorooji,
    "meghdarVoroodi"=>$meghdarVoroodi,
    "tedadKhorooji"=>$tedadKhorooji,
    "tedadVoroodi"=>$tedadVoroodi,
    "mandeh"=>$mandeh,
    "tedadRoozMah"=>(isset($tedadRoozMahMahdoode)?$tedadRoozMahMahdoode:0));

echo json_encode($arrNatijeh);
$con->close();