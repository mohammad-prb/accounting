<div id="kadrFilterBRN">
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وضعیت:</span></div>
        <div class="kadrENT" id="vaziatSBTK">
            <span class="kadrPoshtENT"></span>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="moed" href="javascript:void(0);">موعد</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="jari" href="javascript:void(0);">جاری</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="tasvieh" href="javascript:void(0);">تسویه</a>
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">خ/و:</span></div>
        <div class="kadrENT" id="khoroojiAstSBTK">
            <span class="kadrPoshtENT"></span>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">خروجی</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="0" href="javascript:void(0);">ورودی</a>
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
        <div class="kadrENT" id="noeSBTK">
            <span class="kadrPoshtENT"></span>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="hameh" href="javascript:void(0);">همه</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">روز</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">ماهانه</a>
            <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">سالانه</a>
        </div>
    </div>
    <div class="etelaatSBT tamamSafheh">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">عنوان:</span></div>
        <input type="text" class="txtTozih" id="onvanSBTK" name="tozih" autocomplete="off"/>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">شروع:</span></div>
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
    <a href="javascript:void(0);" onclick="emalFilterBRN();" id="emalFilter">
        <span id="kadrVasetEmalFilter">
            <span class="icon"></span>
            <span class="matnTitr">اعمال فیلتر</span>
        </span>
    </a>
</div>
<script>
    document.getElementById("kadrFilterBRN").onkeydown = function(e){if (e.keyCode === 13) emalFilterBRN();};
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
</script>