<div id="kadrFilterBRN">
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وضعیت:</span></div>
        <div class="kadrVasetSBT" id="vaziatENTBRN"></div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">خ/و:</span></div>
        <div class="kadrVasetSBT" id="KhvENTBRN"></div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>
        <div class="kadrVasetSBT" id="noeENTBRN"></div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">عنوان:</span></div>
        <div class="kadrVasetSBT">
            <input type="text" class="txtTozih" id="onvanSBTK" name="tozih" autocomplete="off"/>
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">گام:</span></div>
        <div class="kadrVasetSBT">
            <input type="text" class="txtGam" id="gamSBTK" name="gam" maxlength="3" autocomplete="off"/>
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تعداد:</span></div>
        <div class="kadrVasetSBT">
            <input type="text" class="txtTedad" id="tedadSBTK" name="tedad" maxlength="4" autocomplete="off">
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">شروع:</span></div>
        <div class="kadrTarikhSBT" id="tarikhSBTK">
            <input type="text" class="txtTarikh" name="rooz" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>
            <input type="text" class="txtTarikh" name="mah" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>
            <input type="text" class="txtTarikh" name="sal" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById('mablaghSBTK').focus();" maxlength="4" placeholder="سال" autocomplete="off"/>
        </div>
    </div>
    <div class="etelaatSBT">
        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>
        <div class="kadrVasetSBT">
            <input type="text" class="txtMablagh" id="mablaghSBTK" name="mablagh" maxlength="10" placeholder="به ریال" autocomplete="off"/>
        </div>
    </div>
    <a href="javascript:void(0);" onclick="emalFilterBRN();" id="emalFilter">
        <span id="kadrVasetEmalFilter">
            <span class="icon"></span>
            <span class="matnTitr">اعمال فیلتر</span>
        </span>
    </a>
    <a id="btnAfzoodanBRN" href="javascript:void(0);" onclick="afzoodanBRN();" title="افزودن برنامه"></a>
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