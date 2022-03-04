/*      تابع اعمال فیلتر صورتحساب      */
function emalFilterBRN({id, tasviehAst = 0} = {})
{
    errorDarad = false;
    var noeVariz = document.getElementById("khoroojiAstSBTK").dataset.value.trim().toString();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var vaziat = document.getElementById("vaziatSBTK").dataset.value.trim().toString();
    var noe = document.getElementById("noeSBTK").dataset.value.trim().toString();
    var onvan = document.getElementById("onvanSBTK").value.trim().toString();
    var rooz = document.querySelectorAll("#tarikhSBTK>input")[0].value.trim().toString();
    var mah = document.querySelectorAll("#tarikhSBTK>input")[1].value.trim().toString();
    var sal = document.querySelectorAll("#tarikhSBTK>input")[2].value.trim().toString();
    var mablagh = document.getElementById("mablaghSBTK").value.trim().toString();

    if (!check(rooz, "^(|0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[0]);
    if (!check(mah, "^(|0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[1]);
    if (!check(sal, "^(|[1-9][0-9]{3})$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[2]);
    if (!check(mablagh, "^(|[1-9][0-9]*)$")) errorInput(document.getElementById("mablaghSBTK"));

    if (errorDarad) return;
    var strQ = "noeVariz=" + noeVariz + "&hesabID=" + hesabID + "&vaziat=" + vaziat + "&noe=" + noe + "&onvan=" + onvan + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh;
    if (id !== undefined) strQ += "&idPardakht=" + id + "&tasviehAst=" + tasviehAst;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrBarnameh"));
            var arrObjEtelaat = JSON.parse(this.responseText);
            var lmnKadr = document.getElementById("kadrBarnameh");
            lmnKadr.innerHTML = "";
            if (id !== undefined) flash("پرداخت با موفقیت انجام شد.");

            /*  آمار و اطلاعات فیلتر  */
            document.getElementById("tedadNataiejBRN").innerHTML = momayezdar(arrObjEtelaat.length);
            var vaziatZadeShodeh = false;
            var tedadKhorooji = 0;
            var tedadVoroodi = 0;

            /*  vaziatID : 1=jari , 2=moed pardakht , 3=tasvieh  */
            if (arrObjEtelaat.length > 0 && Number(arrObjEtelaat[0]["vaziatID"]) !== 3)
            {
                let lmnTarikh = document.createElement("div");
                lmnTarikh.setAttribute("class", "kadrSatrTarikh");
                lmnTarikh.innerHTML = "<span class='satrTarikh'>جاری</span>";
                lmnKadr.appendChild(lmnTarikh);
            }

            /*  آیتم های صورت حساب  */
            for (let i=0; i<arrObjEtelaat.length; i++)
            {
                if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1) tedadKhorooji++;
                else tedadVoroodi++;

                if (Number(arrObjEtelaat[i]["vaziatID"]) === 3 && !vaziatZadeShodeh)
                {
                    vaziatZadeShodeh = true;
                    let lmnTarikh = document.createElement("div");
                    lmnTarikh.setAttribute("class", "kadrSatrTarikh");
                    lmnTarikh.innerHTML = "<span class='satrTarikh'>تسویه</span>";
                    lmnKadr.appendChild(lmnTarikh);
                }

                var strHTML = '<div class="kadrVasetBRN">\n' +
                    '                        <div class="kadrOnvan"><span class="icon"></span><span class="matnTitr">'+ arrObjEtelaat[i]["onvan"] +'</span></div>\n' +
                    '                        <div class="kadrEmkanat">\n' +
                    '                            <a href="javascript:void(0);" class="emkanatBRN btnHazfBRN"></a>\n' +
                    '                            <a href="javascript:void(0);" onclick="virayeshBRN(this);" class="emkanatBRN btnVirayeshBRN"></a>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrVaziat"><span class="icon"></span><span class="matnTitr">وضعیت:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["vaziat"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrNoe"><span class="icon"></span><span class="matnTitr">نوع:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["noe"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrTarikhShoroo"><span class="icon"></span><span class="matnTitr">شروع:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["tarikhShoroo"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrTedadMandeh"><span class="icon"></span><span class="matnTitr">مانده:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["tedadMandeh"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrTarikh"><span class="icon"></span><span class="matnTitr">بعدی:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["tarikhBadi"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrMablaghGhest"><span class="icon"></span><span class="matnTitr">مبلغ:</span><span class="meghdarBRN">'+ momayezdar(arrObjEtelaat[i]["mablagh"]) +'</span></div>\n' +
                    '                    <div class="kadrBtnBRN">\n' +
                    '                        <a href="javascript:void(0);" class="btnBRN" onclick=""><span class="icon"></span><span class="matnTitr">اطلاعات</span></a>\n' +
                    (Number(arrObjEtelaat[i]["vaziatID"]) !== 3 ? '<a href="javascript:void(0);" class="btnBRN" onclick="emalFilterBRN({id:'+ arrObjEtelaat[i]["id"] +'});"><span class="icon"></span><span class="matnTitr">پرداخت</span></a>\n' +
                        '<a href="javascript:void(0);" class="btnBRN" onclick="emalFilterBRN({id:'+ arrObjEtelaat[i]["id"] +', tasviehAst:1});"><span class="icon"></span><span class="matnTitr">تسویه</span></a>\n' : '') +
                    '                    </div>';

                var lmn = document.createElement("div");
                lmn.setAttribute("class", "kadrBRN");
                lmn.dataset.id = arrObjEtelaat[i]["id"];
                lmn.dataset.khoroojiAst = arrObjEtelaat[i]["khoroojiAst"];
                lmn.dataset.vaziat = arrObjEtelaat[i]["vaziatID"];
                lmn.innerHTML = strHTML;
                lmnKadr.appendChild(lmn);
            }

            document.getElementById("tedadKhoroojiBRN").innerHTML = momayezdar(tedadKhorooji);
            document.getElementById("tedadVoroodiBRN").innerHTML = momayezdar(tedadVoroodi);
            shomarehBandiItemhayeBRN();
        }
    };
    xhttp.open("POST", "./ajax/gereftan-barnameh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrBarnameh"));
}

/*      شماره بندی آیتم های صورتحساب      */
function shomarehBandiItemhayeBRN()
{
    var arrlmn = document.getElementsByClassName("btnHazfBRN");
    for (let i=0; i<arrlmn.length; i++) arrlmn[i].setAttribute("onclick", "namayeshPeygham('آیا برای حذف اطمینان دارید؟', 1, 'hazfBarnameh("+i+")');");
}

/*      حذف یک صورتحساب      */
function hazfBarnameh(shom)
{
    bastanPeygham();
    var lmn = document.getElementsByClassName("kadrBRN")[shom];

    namayeshLoading(lmn);
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var id = Number(lmn.dataset.id);
    var khoroojiAst = Number(lmn.dataset.khoroojiAst);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (this.responseText === "ok")
            {
                flash("حذف با موفقیت انجام شد.");
                var tedadNataiej = document.getElementById("tedadNataiejBRN");
                tedadNataiej.innerHTML = momayezdar(hazfMomayez(tedadNataiej.innerHTML)-1);

                if (khoroojiAst === 1)
                {
                    var tedadKhorooji = document.getElementById("tedadKhoroojiBRN");
                    tedadKhorooji.innerHTML = momayezdar(hazfMomayez(tedadKhorooji.innerHTML) - 1);
                }
                else if (khoroojiAst === 0)
                {
                    var tedadVoroodi = document.getElementById("tedadVoroodiBRN");
                    tedadVoroodi.innerHTML = momayezdar(hazfMomayez(tedadVoroodi.innerHTML) - 1);
                }
                if (((lmn.nextElementSibling && lmn.nextElementSibling.className !== "kadrBRN") || !lmn.nextElementSibling) && lmn.previousElementSibling.className !== "kadrBRN")
                    lmn.previousElementSibling.remove();
                lmn.remove();
                shomarehBandiItemhayeBRN();
            }
            else namayeshPeygham("حذف با خطا مواجه شد، لطفا دوباره تلاش کنید!");
        }
    };
    xhttp.open("POST", "./ajax/hazf-barnameh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&hesabID="+hesabID+"&tk="+tkn);
}

/*      افزودن برنامه      */
function afzoodanBRN()
{
    if (document.getElementById("CountainerKadrViraieshBRN")) return;
    var strHTML = '<div id="kadrNamayeshVBRN">\n' +
        '            <a id="kadrPoshtVBRN" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '            <div id="kadrVBRN">\n' +
        '                <div>\n' +
        '                    <div id="titrVBRN"><span class="icon"></span><span class="matnTitr">افزودن برنامه</span></div>\n' +
        '                    <div class="etelaatVBRN">\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">خ/و:</span></div>\n' +
        '                            <div class="kadrENT" id="KhoroojiAstVBRN">\n' +
        '                                <span class="kadrPoshtENT"></span>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">خروجی</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="0" href="javascript:void(0);">ورودی</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">عنوان:</span></div>\n' +
        '                            <input type="text" class="txtOnvan" id="onvanVBRN" name="onvan" maxlength="255" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>\n' +
        '                            <div class="kadrENT" id="noeVBRN">\n' +
        '                                <span class="kadrPoshtENT"></span>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">روزانه</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">ماهانه</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">سالانه</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">گام</span></div>\n' +
        '                            <input type="text" class="txtGam" id="gamVBRN" name="gam" maxlength="3" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تعداد کل:</span></div>\n' +
        '                            <input type="text" class="txtTedad" id="tedadVBRN" name="tedad" maxlength="4" placeholder="اختیاری" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">شروع:</span></div>\n' +
        '                            <div class="kadrTarikhSBT" id="tarikhVBRN">\n' +
        '                                <input type="text" class="txtTarikh" name="rooz" value="'+ tarikh.split("/")[2] +'" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off">\n' +
        '                                <input type="text" class="txtTarikh" name="mah" value="'+ tarikh.split("/")[1] +'" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off">\n' +
        '                                <input type="text" class="txtTarikh" name="sal" value="'+ tarikh.split("/")[0] +'" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById(\'mablaghVBRN\').focus();" maxlength="4" placeholder="سال" autocomplete="off">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>\n' +
        '                            <input type="text" class="txtMablagh" id="mablaghVBRN" name="mablagh" maxlength="10" placeholder="به ریال" autocomplete="off">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <span id="kadrDokmehVBRN">\n' +
        '                        <a class="dokmehTL dokmehTaeed" onclick="sabtVirayeshBRN();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>\n' +
        '                        <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>\n' +
        '                    </span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';

    var lmn = document.createElement("div");
    lmn.setAttribute("id", "CountainerKadrViraieshBRN");
    lmn.innerHTML = strHTML;
    document.body.appendChild(lmn);

    var arrLmnEntekhab = document.querySelectorAll("a.gozinehENT:nth-child(2)");
    for (let i=0; i<arrLmnEntekhab.length; i++) taghirENT(arrLmnEntekhab[i]);

    document.getElementById("onvanVBRN").select();
    lmn.onkeydown = function(e){
        if (e.keyCode === 13) sabtVirayeshBRN(); // enter
        else if (e.keyCode === 27) document.getElementById("CountainerKadrViraieshBRN").remove(); // escape
    };

    document.getElementById("mablaghVBRN").onkeydown = function(e){
        if (e.keyCode === 107) { // +
            event.preventDefault();
            if (this.value.length < 7) this.value += "0000";
        }
        else if (e.keyCode === 109) { // -
            event.preventDefault();
            if (this.value.length < 8) this.value += "000";
        }
    };
}

/*      ثبت افزودن برنامه      */
function sabtVirayeshBRN()
{
    errorDarad = false;
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var khoroojiAst = Number(document.getElementById("KhoroojiAstVBRN").dataset.value);
    var onvan = document.getElementById("onvanVBRN").value.toString().trim().replace(/(<([^>]+)>)/ig, '');
    var noe = Number(document.getElementById("noeVBRN").dataset.value);
    var gam = document.getElementById("gamVBRN").value.toString();
    var tedadKol = document.getElementById("tedadVBRN").value.toString();
    var rooz = document.querySelectorAll("#tarikhVBRN>input.txtTarikh")[0].value.toString();
    var mah = document.querySelectorAll("#tarikhVBRN>input.txtTarikh")[1].value.toString();
    var sal = document.querySelectorAll("#tarikhVBRN>input.txtTarikh")[2].value.toString();
    var mablagh = document.getElementById("mablaghVBRN").value.toString();

    if (onvan === "") errorInput(document.getElementById("onvanVBRN"));
    if (!check(gam, "^[1-9][0-9]*$")) errorInput(document.getElementById("gamVBRN"));
    if (!check(tedadKol, "^(|[1-9][0-9]*)$")) errorInput(document.getElementById("tedadVBRN"));
    if (!check(rooz, "^(0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[0]);
    if (!check(mah, "^(0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[1]);
    if (!check(sal, "^[1-9][0-9]{3}$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[2]);
    if (!check(mablagh, "^[1-9][0-9]*$")) errorInput(document.getElementById("mablaghVBRN"));

    if (errorDarad) return;
    var strQ = "hesabID=" + hesabID + "&khoroojiAst=" + khoroojiAst + "&onvan=" + onvan + "&noe=" + noe + "&gam=" + gam + "&tedadKol=" + tedadKol + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrVBRN"));
            var natijeh = this.responseText;
            if (natijeh === "ok")
            {
                flash("ثبت با موفقیت انجام شد.");
                document.getElementById("CountainerKadrViraieshBRN").remove();
                emalFilterBRN();
            }
            else namayeshPeygham("ثبت با خطا مواجه شد، لطفا پس از بررسی فیلد ها مجددا تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-barnameh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrVBRN"));
}