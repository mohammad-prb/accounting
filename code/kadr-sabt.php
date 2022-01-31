<div id="kadrSabt">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">ثبت واریزی</span></h2>
    <select name="hesabha" class="sltHesabha" onchange="taghirHesabSBT(this);" title="انتخاب حساب">
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
        <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت خروجی</span></h3>
        <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(1);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
        <div class="kadrEtelaatSBT">
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
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
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>
                    <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>
                </div>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                <select name="dasteh" id="dastehSBTK">
                    <?php
                    $arrDasteh = array();
                    $sql = "select id, onvan, noe, tartib from tbl_dasteh where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 and namayesh = 1 order by hesabID desc, tartib";
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
                </select>
            </div>
            <div class="etelaatSBT" style="display:none;">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز به:</span></div>
                <select name="varizBe" id="varizBeSBTK">
                    <?php
                    $arrAfrad = array();
                    $sql = "select id, nam, noe, tartib from tbl_afrad where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 and namayesh = 1 order by tartib";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            array_push($arrAfrad, $row);
                            if ($row["noe"] <= 2)
                                echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                        }
                    }
                    ?>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                <div class="kadrTarikhSBT" id="tarikhSBTK">
                    <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز"/>
                    <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه"/>
                    <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById('mablaghSBTK').focus();" maxlength="4" placeholder="سال"/>
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
        <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت ورودی</span></h3>
        <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(0);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
        <div class="kadrEtelaatSBT">
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                <select name="dasteh" id="dastehSBTV">
                    <?php
                    $sql = "select id, onvan, noe, tartib from tbl_dasteh where (hesabID = ".$hesabID." or hesabID = 0) and (noe <= 1 or noe = 3) and vaziat = 1 and namayesh = 1 order by hesabID desc, tartib";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                        }
                    }
                    ?>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز کننده:</span></div>
                <select name="varizKonandeh" id="varizKonandehSBTV">
                    <?php
                    $sql = "select id, nam, noe, tartib from tbl_afrad where (hesabID = ".$hesabID." or hesabID = 0) and (noe <= 1 or noe = 3) and vaziat = 1 and namayesh = 1 order by hesabID desc, tartib";
                    $result = $con->query($sql);
                    if ($result !== false && $result->num_rows > 0)
                    {
                        while ($row = $result->fetch_assoc())
                        {
                            echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                        }
                    }
                    ?>
                </select>
            </div>
            <div class="etelaatSBT">
                <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                <div class="kadrTarikhSBT" id="tarikhSBTV">
                    <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>
                    <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                    <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById('mablaghSBTV').focus();" maxlength="4" placeholder="سال" autocomplete="off"/>
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
    <div class="kadrAkharinVariz">
        <div class="kadrVasetAKV">
            <div class="etelaatAKV"><span class="icon"></span><span class="matnTitr">آخرین ثبت خروجی:</span></div>
            <?php
            $sql = @"select mablagh, tarikh, onvan, tozih from tbl_soorathesab
                    inner join tbl_dasteh on tbl_dasteh.id = dastehID
                    where tbl_soorathesab.vaziat = 1 and khoroojiAst = 1 and tbl_soorathesab.hesabID = ". $hesabID ." order by tbl_soorathesab.id desc limit 1";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                if ($row = $result->fetch_assoc())
                {
                    echo '<div class="etelaatAKV">'. momayezdar($row["mablagh"]) .'</div>';
                    echo '<div class="etelaatAKV">'. $row["onvan"] .'</div>';
                    echo '<div class="etelaatAKV">'. $row["tarikh"] .'</div>';
                }
            }
            ?>
        </div>
        <div class="kadrVasetAKV">
            <div class="etelaatAKV"><span class="icon"></span><span class="matnTitr">آخرین ثبت ورودی:</span></div>
            <?php
            $sql = @"select mablagh, tarikh, onvan, tozih from tbl_soorathesab
                    inner join tbl_dasteh on tbl_dasteh.id = dastehID
                    where tbl_soorathesab.vaziat = 1 and khoroojiAst = 0 and tbl_soorathesab.hesabID = ". $hesabID ." order by tbl_soorathesab.id desc limit 1";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                if ($row = $result->fetch_assoc())
                {
                    echo '<div class="etelaatAKV">'. momayezdar($row["mablagh"]) .'</div>';
                    echo '<div class="etelaatAKV">'. $row["onvan"] .'</div>';
                    echo '<div class="etelaatAKV">'. $row["tarikh"] .'</div>';
                }
            }
            ?>
        </div>
    </div>
</div>
<script>
    document.getElementById("kadrSBTK").onkeydown = function(e){if (e.keyCode === 13) sabtVarizi(1);};
    document.getElementById("kadrSBTV").onkeydown = function(e){if (e.keyCode === 13) sabtVarizi(0);};
</script>