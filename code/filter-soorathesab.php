<div id="kadrFilterSoorathesab">
    <h2 class="titr"><span class="icon"></span><span class="matnTitr">صورتحساب</span></h2>
    <select name="hesabha" class="sltHesabha" onchange="tavizHesabSRT(this);" title="انتخاب حساب">
        <?php
        $sql = "select * from tbl_hesab where vaziat = 1 order by tartib";
        $result = $con->query($sql);
        if ($result !== false && $result->num_rows > 0)
            while ($row = $result->fetch_assoc())
                echo '<option value="'. $row["id"] .'"'. ($hesabAmadehAst && $row["id"] == $hesabID ? " selected" : "") .'>'. $row["nam"] .'</option>';
        ?>
    </select>
    <div id="kadrFilterSRT">
        <div class="etelaatSBT">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">خ/و:</span></div>
            <div class="kadrENT" id="khoroojiAstSBTK">
                <span class="kadrPoshtENT"></span>
                <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="1" href="javascript:void(0);">خروجی</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirKVFSRT(this);" data-value="0" href="javascript:void(0);">ورودی</a>
            </div>
        </div>
        <div class="etelaatSBT" style="display:none;">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>
            <div class="kadrENT" id="vasilehSBTK">
                <span class="kadrPoshtENT"></span>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="3" href="javascript:void(0);">انتقال</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="4" href="javascript:void(0);">پرداخت</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="5" href="javascript:void(0);">چک</a>
            </div>
        </div>
        <div class="etelaatSBT">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>
            <select name="dasteh" id="dastehSBTK">
                <option value="hameh">-</option>
                <?php
                $arrDasteh = array();
                $sql = "select id, onvan, noe, tartib from tbl_dasteh where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 order by hesabID desc, tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        array_push($arrDasteh, $row);
                        if ($row["noe"] <= 1)
                            echo '<option value="'. $row["id"] .'">'. $row["onvan"] .'</option>';
                    }
                }
                ?>
            </select>
        </div>
        <div class="etelaatSBT">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">فرد:</span></div>
            <select name="varizBe" id="varizBeSBTK">
                <option value="hameh">-</option>
                <?php
                $arrAfrad = array();
                $sql = "select id, nam, noe, tartib from tbl_afrad where (hesabID = ".$hesabID." or hesabID = 0) and vaziat = 1 order by hesabID desc, tartib";
                $result = $con->query($sql);
                if ($result !== false && $result->num_rows > 0)
                {
                    while ($row = $result->fetch_assoc())
                    {
                        array_push($arrAfrad, $row);
                        if ($row["noe"] <= 1)
                            echo '<option value="'. $row["id"] .'">'. $row["nam"] .'</option>';
                    }
                }
                ?>
            </select>
        </div>
        <div class="etelaatSBT">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>
            <div class="kadrTarikhSBT" id="tarikhSBTK">
                <input type="text" class="txtTarikh" name="rooz" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>
                <input type="text" class="txtTarikh" name="mah" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
                <input type="text" class="txtTarikh" name="sal" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById('mablaghSBTK').focus();" maxlength="4" placeholder="سال" autocomplete="off"/>
            </div>
        </div>
        <div class="etelaatSBT tamamSafheh">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
            <input type="text" class="txtMablagh" id="mablaghSBTK" name="mablagh" maxlength="10" placeholder="به ریال" autocomplete="off"/>
        </div>
        <div class="etelaatSBT tamamSafheh">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>
            <input type="text" class="txtTozih" id="tozihSBTK" name="tozih" autocomplete="off"/>
        </div>
        <a href="javascript:void(0);" onclick="emalFilterSRT();" id="emalFilter">
            <span id="kadrVasetEmalFilter">
                <span class="icon"></span>
                <span class="matnTitr">اعمال فیلتر</span>
            </span>
        </a>
        <a id="btnAmaSRT" href="amar.php" title="آمار"></a>
    </div>
</div>
<script>
    document.getElementById("kadrFilterSoorathesab").onkeydown = function(e){if (e.keyCode === 13) emalFilterSRT();};
    document.getElementById("mablaghSBTK").onkeydown = function(e){
        if (e.keyCode === 107) { // +
            event.preventDefault();
            if (this.value.length < 7) this.value += "0000";
        }
        else if (e.keyCode === 109) { // -
            event.preventDefault();
            if (this.value.length < 8) this.value += "000";
        }
    };

    document.getElementsByClassName("txtTarikh")[1].value = "<?php echo $mah;?>";
    document.getElementsByClassName("txtTarikh")[2].value = "<?php echo $sal;?>";

    var tarikhAmadehAst = <?php echo ($tarikhAmadehAst ? 'true' : 'false')?>;
    if (!tarikhAmadehAst && localStorage.getItem("pishfarzSoorathesab") === "rooz")
            document.getElementsByClassName("txtTarikh")[0].value = "<?php echo $rooz;?>";
</script>