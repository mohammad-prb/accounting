<?php
$sql2 = "select mablaghTaraz from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." and id = " . $hesabID;
$result2 = $con->query($sql2);
if ($result2 !== false && $result2->num_rows > 0)
    if ($row2 = $result2->fetch_assoc())
        $mandeh = (integer)$row2["mablaghTaraz"];

if (isset($idSoorathesab))
    $sql2 = "select khoroojiAst, mablagh from tbl_soorathesab 
            inner join tbl_hesab on tbl_hesab.id = hesabID
            where tbl_soorathesab.vaziat = 1 and accountID = ". $_SESSION["accountID"] ." and hesabID = " . $hesabID ." and tbl_soorathesab.id <= " . $idSoorathesab;
else
    $sql2 = "select khoroojiAst, mablagh from tbl_soorathesab 
            inner join tbl_hesab on tbl_hesab.id = hesabID
            where tbl_soorathesab.vaziat = 1 and accountID = ". $_SESSION["accountID"] ." and hesabID = " . $hesabID;
$result2 = $con->query($sql2);
if ($result2 !== false && $result2->num_rows > 0)
{
    while ($row2 = $result2->fetch_assoc())
    {
        if ($row2["khoroojiAst"] == 1) $mandeh -= (integer)$row2["mablagh"];
        else $mandeh += (integer)$row2["mablagh"];
    }
}