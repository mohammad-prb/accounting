<div id="kadrSabt">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">ثبت واریزی</span></h2>
    <select name="hesabha" class="sltHesabha" onchange="taghirHesabSBT(this);">
        <?php
            $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                while ($row = $result->fetch_assoc())
                {
                    echo '<option value="'. $row["id"] .'">'. $row["nam"] .' ('. substr($row["shomKart"], 12, 4) .')</option>';
                }
            }
        ?>
    </select>
    <div class="kadrSBT" id="kadrSBTK">
        <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت خروجی</span></h3>
        <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(1);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
        <div class="kadrEtelaatSBT">
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
                <div class="kadrENT" id="noeSBTK">
                    <span class="kadrPoshtENT"></span>
                    <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>
                    <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>
                </div>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>
                <div class="kadrENT" id="vasilehSBTK">
                    <span class="kadrPoshtENT"></span>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">کارتخوان</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">عابر بانک</a>
                </div>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                <select name="dasteh" id="dastehSBTK">
                    <?php
                    $arrDasteh = array();
                    $sql = "select id, onvan, noe from tbl_dasteh where hesabID = ".$hesabID." and vaziat = 1 order by onvan";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            array_push($arrDasteh, $row);
                            if ($row["noe"] <= 2)
                                echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                        }
                    }
                    ?>
                    <option value="1">دیگر...</option>
                </select>
            </div>
            <div class="etelaatSBT" style="display:none;">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز به:</span></div>
                <select name="varizBe" id="varizBeSBTK">
                    <?php
                    $sql = "select id, nam, noe from tbl_afrad where hesabID = ".$hesabID." and noe <= 2 and vaziat = 1 order by nam";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                        }
                    }
                    ?>
                    <option value="1">نامشخص</option>
                    <option value="2">دیگران...</option>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                <div class="kadrTarikhSBT" id="tarikhSBTK">
                    <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="روز"/>
                    <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="ماه"/>
                    <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال"/>
                </div>
            </div>
            <div class="etelaatSBT tamamSafheh">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                <input type="text" class="txtMablagh" id="mablaghSBTK" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال"/>
                <span class="mablaghSBT"></span>
            </div>
            <div class="etelaatSBT tamamSafheh">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
                <input type="text" class="txtTozih" id="tozihSBTK" name="tozih" placeholder="اختیاری"/>
            </div>
        </div>
    </div>

    <div class="kadrSBT" id="kadrSBTV">
        <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت ورودی</span></h3>
        <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(0);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
        <div class="kadrEtelaatSBT">
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                <select name="dasteh" id="dastehSBTV">
                    <?php
                    $sql = "select id, onvan, noe from tbl_dasteh where hesabID = ".$hesabID." and (noe = 1 or noe = 3) and vaziat = 1 order by onvan";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                        }
                    }
                    ?>
                    <option value="1">دیگر...</option>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز کننده:</span></div>
                <select name="varizKonandeh" id="varizKonandehSBTV">
                    <?php
                    $sql = "select id, nam, noe from tbl_afrad where hesabID = ".$hesabID." and (noe = 1 or noe = 3) and vaziat = 1 order by nam";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                        }
                    }
                    ?>
                    <option value="1">نامشخص</option>
                    <option value="2">دیگران...</option>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                <div class="kadrTarikhSBT" id="tarikhSBTV">
                    <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="روز"/>
                    <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="2" placeholder="ماه"/>
                    <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" maxlength="4" placeholder="سال"/>
                </div>
            </div>
            <div class="etelaatSBT tamamSafheh">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                <input type="text" class="txtMablagh" id="mablaghSBTV" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال"/>
                <span class="mablaghSBT"></span>
            </div>
            <div class="etelaatSBT tamamSafheh">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
                <input type="text" class="txtTozih" id="tozihSBTV" name="tozih" placeholder="اختیاری"/>
            </div>
        </div>
    </div>
</div>
<script>
    document.getElementById("kadrSBTK").onkeydown = function(e){
        if (e.keyCode === 13) sabtVarizi(1);
    };
    document.getElementById("kadrSBTV").onkeydown = function(e){
        if (e.keyCode === 13) sabtVarizi(0);
    };
</script>