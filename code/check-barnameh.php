<?php
$tarikhEmrouz = jdate("Y/m/d", "", "", "Asia/Tehran", "en");
$natijeh = array();
$tedadKol = 0;

$sql = @"select tbl_barnameh.id as id, nam, hesabID, noeID, gam, tarikhShoroo, tedadKol, tedadPardakht from tbl_barnameh
        inner join tbl_hesab on tbl_hesab.id = hesabID
        where tbl_hesab.vaziat = 1 and tbl_barnameh.vaziat = 1 and (tedadKol <> tedadPardakht or tedadKol = 0) and accountID = ". $_SESSION["accountID"];
$result = $con->query($sql);
if ($result !== false && $result->num_rows > 0)
{
    while ($row = $result->fetch_assoc())
    {
        switch ($row["noeID"])
        {
            case 1: $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "rooz", $row["gam"], $row["tedadPardakht"]); break;
            case 2: $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "mah", $row["gam"], $row["tedadPardakht"]); break;
            case 3: $row["tarikhBadi"] = gereftanTarikhGhest($row["tarikhShoroo"], "sal", $row["gam"], $row["tedadPardakht"]);
        }

        if ($tarikhEmrouz > $row["tarikhBadi"])
        {
            $tedadKol++;
            if (isset($natijeh["h".$row["hesabID"]])) $natijeh["h".$row["hesabID"]][1]++;
            else $natijeh["h".$row["hesabID"]] = array($row["nam"], 1);
        }
    }
}
?>

<a href="barnameh.php" id="kadrCheckBarnameh"<?php if ($tedadKol == 0) echo ' style="display: none;"';?>>
    <span class="icon"></span>
    <span class="matnTitr">موعد پرداخت <?php echo $tedadKol;?> مورد از برنامه زمانی فرا رسیده. <?php
            echo "(";
            $i = 1;
            foreach ($natijeh as $key)
            {
                if ($i > 1) echo " و ";
                echo $key[1] . " مورد از حساب " . $key[0];
                $i++;
            }
            echo ")";
        ?></span>
</a>