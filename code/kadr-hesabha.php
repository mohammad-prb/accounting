<div id="kadrHesabha">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">حساب ها</span></h2>
    <?php
    $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
    $result = $con->query($sql);
    if ($result !== false && $result->num_rows > 0)
    {
        while ($row = $result->fetch_assoc())
        {
            $hesabID = $row["id"];
            include ("code/mohasebeh-mandeh.php");
            echo @'<div class="hesab">
                                <div class="titrHSB">
                                    <div class="namHSB">
                                        <img src="pic/bank/'. $row["bankID"] .@'.png" alt="bank" class="bankHSB"/>
                                        <span title="'. $row["nam"] .'" class="matnTitrHSB">'. $row["nam"] .@'</span>
                                    </div>
                                    <div title="مانده حساب" class="mandehHSB" id="mandeh'. $row["id"] .'">'. momayezdar($mandeh) .@'</div>
                                </div>
                                <div class="kadrShomKartHSB">
                                    <div class="titrShomKartHSB">شماره کارت: </div>
                                    <div title="'. faselehdar($row["shomKart"]) .'" class="shomKartHSB">'. faselehdar($row["shomKart"]) .@'</div>
                                </div>
                                <div class="kadrShomKartHSB">
                                    <div class="titrShomKartHSB">شماره حساب: </div>
                                    <div title="'. $row["shomHesab"] .'" class="shomKartHSB">'. $row["shomHesab"] .@'</div>
                                </div>
                                <div class="kadrEmkanatHSB">
                                    <a href="soorathesab.php?hesabID='. $hesabID .@'" title="صورتحساب" class="emkanatHSB"></a>
                                    <a href="amar.php?hesabID='. $hesabID .@'" title="آمار حساب" class="emkanatHSB"></a>
                                    <a href="anavin.php?hesabID='. $hesabID .@'" title="دسته بندی ها" class="emkanatHSB"></a>
                                    <a href="afrad.php?hesabID='. $hesabID .@'" title="افراد" class="emkanatHSB"></a>
                                    <a href="javascript:void(0);" title="بروزرسانی مانده" class="emkanatHSB" onclick="gereftanMandeh('. $row["id"] .@', this.parentElement.parentElement.getElementsByClassName(\'mandehHSB\')[0]);"></a>
                                </div>
                            </div>';
        }
    }
    ?>
</div>