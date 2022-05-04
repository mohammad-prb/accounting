<div id="kadrSabt">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">ثبت واریزی</span></h2>
    <select name="hesabha" class="sltHesabha" onchange="taghirHesabSBT(this);" title="انتخاب حساب">
        <?php
            $sql = "select * from tbl_hesab where vaziat = 1 and accountID = ". $_SESSION["accountID"] ." order by tartib";
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
    <div class="kadrVasetSBT">
        <div class="kadrSBT" id="kadrSBTK">
            <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت خروجی</span></h3>
            <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(1);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
            <div class="kadrEtelaatSBT">
                <div class="etelaatSBT" id="kadrVasilehESBT"></div>
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                    <select name="dasteh" id="dastehSBTK">
                        <?php
                        $arrDasteh = array();
                        $sql = @"select * from (select tbl_dasteh.id as id, onvan, noe, tbl_dasteh.tartib as tartib, hesabID from tbl_dasteh
                                inner join tbl_hesab on tbl_hesab.id = hesabID
                                where hesabID = ".$hesabID." and tbl_dasteh.vaziat = 1 and namayesh = 1 and accountID = ". $_SESSION["accountID"] .@"
                                union all
                                select tbl_dasteh.id as id, onvan, noe, tbl_dasteh.tartib as tartib, hesabID from tbl_dasteh
                                where hesabID = 0 and tbl_dasteh.vaziat = 1) as tbl
                                order by tbl.hesabID desc, tbl.tartib";
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
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
                    <div class="kadrTarikhSBT" id="tarikhSBTK">
                        <input type="text" class="txtTarikh" name="rooz" value="<?php echo jdate("d", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="mah" value="<?php echo jdate("m", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                        <input type="text" class="txtTarikh" name="sal" value="<?php echo jdate("Y", "", "", "Asia/Tehran", "en");?>" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById('mablaghSBTK').focus();" maxlength="4" placeholder="سال" autocomplete="off"/>
                    </div>
                </div>
                <div class="etelaatSBT" style="display:none;">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">فرد:</span></div>
                    <select name="varizBe" id="varizBeSBTK">
                        <?php
                        $arrAfrad = array();
                        $sql = @"select * from (select tbl_afrad.id as id, tbl_afrad.nam as nam, noe, tbl_afrad.tartib as tartib, hesabID from tbl_afrad 
                                inner join tbl_hesab on tbl_hesab.id = hesabID
                                where ".$hesabID." and tbl_afrad.vaziat = 1 and namayesh = 1 and accountID = ". $_SESSION["accountID"] ."
                                union all
                                select tbl_afrad.id as id, tbl_afrad.nam as nam, noe, tbl_afrad.tartib as tartib, hesabID from tbl_afrad 
                                where hesabID = 0 and tbl_afrad.vaziat = 1) as tbl
                                order by tbl.hesabID desc, tbl.tartib";
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
                <div class="etelaatSBT kadrMablagh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                    <input type="text" class="txtMablagh" id="mablaghSBTK" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال" autocomplete="off"/>
                </div>
                <div class="etelaatSBT">
                    <span class="mablaghSBT"></span>
                </div>
                <div class="etelaatSBT tamamSafheh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیح:</span></div>
                    <input type="text" class="txtTozih" id="tozihSBTK" name="tozih" data-khorooji-ast="1" oninput="taghirPishnahad(this);" onfocus="taghirPishnahad(this);" onblur="ghatePishnahad(this);" placeholder="اختیاری" autocomplete="off"/>
                    <div class="kadrPishnahad" id="kadrPishnahadKhorooji"></div>
                </div>
            </div>
        </div>
        <div class="kadrVasetAKV">
            <div class="etelaatAKV"><span class="icon"></span><span class="matnTitr">آخرین ثبت خروجی:</span></div>
            <?php
            $sql = @"select mablagh, tarikh, onvan, tozih from tbl_soorathesab
                    inner join tbl_dasteh on tbl_dasteh.id = dastehID
                    inner join tbl_hesab on tbl_hesab.id = tbl_soorathesab.hesabID
                    where tbl_soorathesab.vaziat = 1 and khoroojiAst = 1 and tbl_soorathesab.hesabID = ". $hesabID ." and accountID = ". $_SESSION["accountID"] ." order by tbl_soorathesab.id desc limit 1";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                if ($row = $result->fetch_assoc())
                {
                    echo '<div class="etelaatAKV" id="mablaghAKVK">'. momayezdar($row["mablagh"]) .'</div>';
                    echo '<div class="etelaatAKV" id="onvanAKVK">'. $row["onvan"] .'</div>';
                    echo '<div class="etelaatAKV" id="tarikhAKVK">'. $row["tarikh"] .'</div>';
                }
            }
            ?>
        </div>
    </div>

    <div class="kadrVasetSBT">
        <div class="kadrSBT" id="kadrSBTV">
            <h3 class="titrSBT"><span class="icon"></span><span class="matnTitr">ثبت ورودی</span></h3>
            <a class="btnErsalSBT" href="javascript:void(0);" onclick="sabtVarizi(0);"><span class="icon"></span><span class="matnTitr">ثبت</span></a>
            <div class="kadrEtelaatSBT">
                <div class="etelaatSBT">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
                    <select name="dasteh" id="dastehSBTV">
                        <?php
                        $sql = @"select * from (select tbl_dasteh.id as id, onvan, noe, tbl_dasteh.tartib as tartib, hesabID from tbl_dasteh
                                inner join tbl_hesab on tbl_hesab.id = hesabID
                                where hesabID = ".$hesabID." and (noe <= 1 or noe = 3) and tbl_dasteh.vaziat = 1 and namayesh = 1 and accountID = ". $_SESSION["accountID"] ."
                                union all
                                select tbl_dasteh.id as id, onvan, noe, tbl_dasteh.tartib as tartib, hesabID from tbl_dasteh
                                where hesabID = 0 and tbl_dasteh.vaziat = 1) as tbl
                                order by tbl.hesabID desc, tbl.tartib";
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
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">فرد:</span></div>
                    <select name="varizKonandeh" id="varizKonandehSBTV">
                        <?php
                        $sql = @"select * from (select tbl_afrad.id as id, tbl_afrad.nam as nam, noe, tbl_afrad.tartib as tartib, hesabID from tbl_afrad 
                                inner join tbl_hesab on tbl_hesab.id = hesabID
                                where (hesabID = ".$hesabID." or hesabID = 0) and (noe <= 1 or noe = 3) and tbl_afrad.vaziat = 1 and namayesh = 1 and accountID = ". $_SESSION["accountID"] ."
                                union all
                                select tbl_afrad.id as id, tbl_afrad.nam as nam, noe, tbl_afrad.tartib as tartib, hesabID from tbl_afrad 
                                where hesabID = 0 and tbl_afrad.vaziat = 1) as tbl
                                order by tbl.hesabID desc, tbl.tartib";
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
                <div class="etelaatSBT"></div> <!-- برای دیباگ مارجین های کادر های فرد -->
                <div class="etelaatSBT kadrMablagh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
                    <input type="text" class="txtMablagh" id="mablaghSBTV" name="mablagh" oninput="namayeshMablaghSBT(this);" maxlength="10" placeholder="به ریال" autocomplete="off"/>
                </div>
                <div class="etelaatSBT">
                    <span class="mablaghSBT"></span>
                </div>
                <div class="etelaatSBT tamamSafheh">
                    <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیح:</span></div>
                    <input type="text" class="txtTozih" id="tozihSBTV" name="tozih" data-khorooji-ast="0" oninput="taghirPishnahad(this);" onfocus="taghirPishnahad(this);" onblur="ghatePishnahad(this);" placeholder="اختیاری" autocomplete="off"/>
                    <div class="kadrPishnahad" id="kadrPishnahadVoroodi"></div>
                </div>
            </div>
        </div>
        <div class="kadrVasetAKV">
            <div class="etelaatAKV"><span class="icon"></span><span class="matnTitr">آخرین ثبت ورودی:</span></div>
            <?php
            $sql = @"select mablagh, tarikh, onvan, tozih from tbl_soorathesab
                    inner join tbl_dasteh on tbl_dasteh.id = dastehID
                    inner join tbl_hesab on tbl_hesab.id = tbl_soorathesab.hesabID
                    where tbl_soorathesab.vaziat = 1 and khoroojiAst = 0 and tbl_soorathesab.hesabID = ". $hesabID ." and accountID = ". $_SESSION["accountID"] ." order by tbl_soorathesab.id desc limit 1";
            $result = $con->query($sql);
            if ($result !== false && $result->num_rows > 0)
            {
                if ($row = $result->fetch_assoc())
                {
                    echo '<div class="etelaatAKV" id="mablaghAKVV">'. momayezdar($row["mablagh"]) .'</div>';
                    echo '<div class="etelaatAKV" id="onvanAKVV">'. $row["onvan"] .'</div>';
                    echo '<div class="etelaatAKV" id="tarikhAKVV">'. $row["tarikh"] .'</div>';
                }
            }
            ?>
        </div>
    </div>
</div>
<script>
    document.getElementById("kadrSBTK").onkeydown = function(e){if (e.keyCode === 13) sabtVarizi(1);}; // enter
    document.getElementById("kadrSBTV").onkeydown = function(e){if (e.keyCode === 13) sabtVarizi(0);}; // enter

    /*  مبالغ  */
    document.getElementById("mablaghSBTK").onkeydown = function(e){
        if (e.keyCode === 107) { // +
            event.preventDefault();
            if (this.value.length < 7) this.value += "0000";
        }
        else if (e.keyCode === 109) { // -
            event.preventDefault();
            if (this.value.length < 8) this.value += "000";
        }
        namayeshMablaghSBT(this);
    };
    document.getElementById("mablaghSBTV").onkeydown = function(e){
        if (e.keyCode === 107) { // +
            event.preventDefault();
            if (this.value.length < 7) this.value += "0000";
        }
        else if (e.keyCode === 109) { // -
            event.preventDefault();
            if (this.value.length < 8) this.value += "000";
        }
        namayeshMablaghSBT(this);
    };

    /*  کادر پیشنهاد توضیحات  */
    document.getElementById("tozihSBTK").onkeydown = function(e){
        if (e.keyCode === 13) // enter
            entekhabPishnahad(this);
        else if (e.keyCode === 27) { // Esc
            event.preventDefault();
            ghatePishnahad(this);
        }
        else if (e.keyCode === 38) { // jahat bala
            event.preventDefault();
            peymayeshPishnahadha(true);
        }
        else if (e.keyCode === 40) { // jahat paeen
            event.preventDefault();
            peymayeshPishnahadha(false);
        }
    };
    document.getElementById("tozihSBTV").onkeydown = function(e){
        if (e.keyCode === 13) // enter
            entekhabPishnahad(this);
        else if (e.keyCode === 27) { // Esc
            event.preventDefault();
            ghatePishnahad(this);
        }
        else if (e.keyCode === 38) { // jahat bala
            event.preventDefault();
            peymayeshPishnahadha(true);
        }
        else if (e.keyCode === 40) { // jahat paeen
            event.preventDefault();
            peymayeshPishnahadha(false);
        }
    };
</script>