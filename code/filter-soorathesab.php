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
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
            <div class="kadrENT" id="noeSBTK">
                <span class="kadrPoshtENT"></span>
                <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>
                <a class="gozinehENT" onclick="taghirENT(this);taghirNoeFSRT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>
            </div>
        </div>
        <div class="etelaatSBT" style="display:none;">
            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>
            <div class="kadrENT" id="vasilehSBTK"></div>
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
    </div>
</div>
<script>
    document.getElementById("kadrFilterSoorathesab").onkeydown = function(e){if (e.keyCode === 13) emalFilterSRT();};
    var tarikhAmadehAst = <?php echo ($tarikhAmadehAst ? 'true' : 'false')?>;
    if (tarikhAmadehAst || localStorage.getItem("pishfarzSoorathesab") === "mah")
    {
        document.getElementsByClassName("txtTarikh")[1].value = "<?php echo $mah;?>";
        document.getElementsByClassName("txtTarikh")[2].value = "<?php echo $sal;?>";
    }
    else if (!tarikhAmadehAst || localStorage.getItem("pishfarzSoorathesab") === "sal")
    {
            document.getElementsByClassName("txtTarikh")[2].value = "<?php echo $sal;?>";
    }
</script>