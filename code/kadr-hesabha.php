<div id="kadrHesabha">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">حساب ها</span></h2>
    <?php
    $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
    $result = $con->query($sql);
    if ($result !== false && $result->num_rows > 0)
    {
        while ($row = $result->fetch_assoc())
        {
            echo @'<div class="hesab">
                                <div class="titrHSB">
                                    <div class="namHSB">
                                        <img src="pic/bank/'. $row["bankID"] .@'.png" alt="bank" class="bankHSB"/>
                                        <span title="'. $row["nam"] .'" class="matnTitrHSB">'. $row["nam"] .@'</span>
                                    </div>
                                    <div title="مانده حساب" class="mandehHSB">2,135,324,024</div>
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
                                    <a href="javascript:void(0);" title="حذف" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="ویرایش" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="صورتحساب" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="آمار حساب" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="افراد" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="دسته بندی ها" class="emkanatHSB" onclick=""></a>
                                    <a href="javascript:void(0);" title="بروزرسانی مانده" class="emkanatHSB" onclick=""></a>
                                </div>
                            </div>';
        }
    }
    ?>
</div>