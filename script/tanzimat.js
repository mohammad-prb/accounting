/*      تنظیم صفحه تنظیمات      */
function tanzimSafTanzimat()
{
    new entekhab({lmnKadr:"kadrThemENTPSH", id:"theme", saddarsadAst:true, entekhb:Number(localStorage.getItem('darkmode')), onclick:"taghirTheme(this);", arrObjMaghadir:[
            {value:0, matn:"تم روشن"},
            {value:1, matn:"تم تاریک"}
        ]});
    new entekhab({lmnKadr:"kadrMenuENTPSH", id:"halatMenu", saddarsadAst:true, entekhb:(Number(localStorage.getItem('menu'))===1?0:1), onclick:"taghirHalatMenu(this);", arrObjMaghadir:[
            {value:1, matn:"ثابت"},
            {value:0, matn:"کشویی"}
        ]});
    new entekhab({lmnKadr:"kadrPishnahadENTPSH", id:"pishfarzPishnahad", saddarsadAst:true, entekhb:(localStorage.getItem('pishfarzPishnahad')==="sal"?0:1), onclick:"taghirPishfarzPIS(this);", arrObjMaghadir:[
            {value:"sal", matn:"اخیر"},
            {value:"kol", matn:"کل تایم"}
        ]});
    new entekhab({lmnKadr:"kadrSoorathesabENTPSH", id:"pishfarzSoorathesab", saddarsadAst:true, entekhb:(localStorage.getItem('pishfarzSoorathesab')==="rooz"?0:1), onclick:"taghirPishfarzSRT(this);", arrObjMaghadir:[
            {value:"rooz", matn:"روز جاری"},
            {value:"mah", matn:"ماه جاری"}
        ]});
    new entekhab({lmnKadr:"kadrAmarENTPSH", id:"pishfarzAmar", saddarsadAst:true, entekhb:(localStorage.getItem('pishfarzAmar')==="mah"?0:1), onclick:"taghirPishfarzAMR(this);", arrObjMaghadir:[
            {value:"mah", matn:"ماه جاری"},
            {value:"sal", matn:"سال جاری"}
        ]});
    new entekhab({lmnKadr:"kadrJodaKanandeh", id:"jodaKanandeh", saddarsadAst:true, entekhb:Number(localStorage.getItem('jodaKanandeh')), onclick:"taghirJodaKanandeh(this);", arrObjMaghadir:[
            {value:"0", matn:"غیر فعال"},
            {value:"1", matn:"فعال"}
        ]});
    new entekhab({lmnKadr:"kadrFilterSRT", id:"pishfarzFilterSRT", saddarsadAst:true, entekhb:Number(localStorage.getItem('pishfarzFilterSRT')), onclick:"taghirPishfarzFSRT(this);", arrObjMaghadir:[
            {value:"0", matn:"فیلتر بسته"},
            {value:"1", matn:"فیلتر باز"}
        ]});
    new entekhab({lmnKadr:"kadrFilterBRN", id:"pishfarzFilterBRN", saddarsadAst:true, entekhb:Number(localStorage.getItem('pishfarzFilterBRN')), onclick:"taghirPishfarzFBRN(this);", arrObjMaghadir:[
            {value:"0", matn:"فیلتر بسته"},
            {value:"1", matn:"فیلتر باز"}
        ]});
}

/*      شماره بندی حساب ها      */
function shomarehBandiHSB()
{
    var arrLmn = document.getElementsByClassName("btnHazfJTNZ");
    for (let i=0; i<arrLmn.length; i++)
    {
        arrLmn[i].parentElement.parentElement.previousElementSibling.innerHTML = i+1;
        arrLmn[i].setAttribute("onclick", "namayeshPeygham('آیا برای حذف اطمینان دارید؟', 1, 'hazfHSB("+i+");')");
    }
}

/*      حذف حساب      */
function hazfHSB(shom)
{
    bastanPeygham();
    var lmn = document.getElementsByClassName("itemJTNZ")[shom+1]; // بخاطر رد شدن از هدر جدول بعلاوه 1 میشود
    var id = Number(lmn.dataset.id);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrHesabhaTNZ"));
            if (this.responseText === "ok")
            {
                flash("حساب با موفقیت حذف شد.");
                lmn.remove();
                shomarehBandiHSB();
            }
            else namayeshPeygham("حذف با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/hazf-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrHesabhaTNZ"));
}

var darHalJabejaeiAst = false;
/*      جابجایی حساب ها      */
function jabejaeiHSB(lmn, balaAst)
{
    if (balaAst && !darHalJabejaeiAst)
    {
        if (lmn.previousElementSibling)
        {
            darHalJabejaeiAst = true;
            lmn.setAttribute("class", "itemJTNZ");
            lmn.previousElementSibling.setAttribute("class", "itemJTNZ");
            lmn.style.top = "-40px";
            lmn.previousElementSibling.style.top = "40px";
            setTimeout(function ()
            {
                lmn.previousElementSibling.setAttribute("class", "itemJTNZ itemJabejaeiJTNZ");
                lmn.style.top = "0";
                lmn.previousElementSibling.style.top = "0";
                var lmnJadid = document.createElement("div");
                lmn.parentElement.insertBefore(lmnJadid, lmn.previousElementSibling);
                lmn.parentElement.replaceChild(lmn, lmnJadid);
                shomarehBandiHSB();
                darHalJabejaeiAst = false;
            }, 200);
            document.getElementById("kadrTaeedJabejaei").style.bottom = "20px";
        }
    }
    else if (lmn.nextElementSibling)
        jabejaeiHSB(lmn.nextElementSibling, true);
}

/*      تایید جابجایی      */
function sabtJabejaei()
{
    document.getElementById("kadrTaeedJabejaei").style.bottom = "-81px";
    var arrLmn = document.querySelectorAll("#jadvalTNZ>.itemJTNZ");
    var arrTartib = [];
    for (let i=0; i<arrLmn.length; i++) arrTartib.push(Number(arrLmn[i].dataset.id));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrHesabhaTNZ"));
            if (this.responseText === "ok")
            {
                flash("جابجایی ها با موفقیت ثبت شد.");
                for (let i=0; i<arrLmn.length-1; i++) arrLmn[i].dataset.tartib = (i+1);
            }
            else namayeshPeygham("جابجایی با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/taghir-tartib-hesabha.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("arr="+JSON.stringify(arrTartib)+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrHesabhaTNZ"));
}

/*      ویرایش حساب ها      */
function virayeshHSB(lmn)
{
    var nam = lmn.parentElement.parentElement.getElementsByClassName("onvanJTNZ")[0].innerHTML.trim();
    var id = Number(lmn.parentElement.parentElement.parentElement.dataset.id);
    var bank = Number(lmn.parentElement.parentElement.parentElement.dataset.bank);
    var shomHesab = lmn.parentElement.parentElement.getElementsByClassName("shomHesabJTNZ")[0].innerHTML.trim();
    var shomKart = lmn.parentElement.parentElement.getElementsByClassName("shomKartJTNZ")[0].innerHTML.trim();
    var mandehTaraz = hazfMomayez(lmn.parentElement.parentElement.getElementsByClassName("mandehTarazJTNZ")[0].innerHTML.trim());
    var strHTML = '<div id="kadrNamayeshVTNZ">\n' +
        '            <a id="kadrPoshtVTNZ" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '            <div id="kadrVTNZ">\n' +
        '                <div>\n' +
        '                    <div id="titrVTNZ"><span class="icon"></span><span class="matnTitr">ویرایش حساب</span></div>\n' +
        '                    <div class="etelaatVTNZ">\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نام:</span></div>\n' +
        '                            <input type="text" id="namVTNZ" name="nam" value="'+ nam +'" autocomplete="off" placeholder="نام حساب" maxlength="30">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">بانک:</span></div>\n' +
        '                            <select id="bankVTNZ" name="bank">\n';

    for (let i=0; i<arrBank.length; i++)
        strHTML += '<option value="'+ arrBank[i]["id"] +'"'+ (bank === Number(arrBank[i]["id"]) ? " selected" : "") +'>'+ arrBank[i]["nam"] +'</option>';

    strHTML += '</select>\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">ش حساب:</span></div>\n' +
        '                            <input type="text" id="shomHesabVTNZ" name="shomHesab" value="'+ shomHesab +'" autocomplete="off" placeholder="شماره حساب">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">ش کارت:</span></div>\n' +
        '                            <input type="text" id="shomKartVTNZ" name="shomKart" value="'+ shomKart +'" autocomplete="off" placeholder="شماره کارت">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مانده تراز:</span></div>\n' +
        '                            <input type="text" id="mandehVTNZ" name="mandeh" value="'+ mandehTaraz +'" autocomplete="off" placeholder="مانده زمان افتتاح">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <span id="kadrDokmehVTNZ">\n' +
        '                        <a class="dokmehTL dokmehTaeed" onclick="sabtVirayeshHSB('+ id +');" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>\n' +
        '                        <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>\n' +
        '                    </span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';

    var lmnKadr = document.createElement("div");
    lmnKadr.setAttribute("id", "CountainerKadrViraieshTNZ");
    lmnKadr.innerHTML = strHTML;
    document.body.appendChild(lmnKadr);
    document.getElementById("namVTNZ").select();

    lmnKadr.onkeydown = function(e){
        if (e.keyCode === 13) sabtVirayeshHSB(id); // enter
        else if (e.keyCode === 27) document.getElementById("CountainerKadrViraieshTNZ").remove(); // escape
    };
}

/*      ثبت ویرایش حساب      */
function sabtVirayeshHSB(id)
{
    errorDarad = false;
    var nam = document.getElementById("namVTNZ").value.trim().replace(/(<([^>]+)>)/ig, '');
    var shomHesab = document.getElementById("shomHesabVTNZ").value.trim();
    var shomKart = document.getElementById("shomKartVTNZ").value.trim();
    var mandehTaraz = document.getElementById("mandehVTNZ").value.trim();
    var bankID = document.getElementById("bankVTNZ").value.trim();

    if (nam.length === 0) errorInput(document.getElementById("namVTNZ"));
    if (!check(shomHesab, "^[0-9]{1,100}$")) errorInput(document.getElementById("shomHesabVTNZ"));
    if (!check(shomKart, "^[0-9]{16}$")) errorInput(document.getElementById("shomKartVTNZ"));
    if (!check(mandehTaraz, "^(0|[1-9][0-9]*)$")) errorInput(document.getElementById("mandehVTNZ"));
    if (errorDarad) return;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("CountainerKadrViraieshTNZ"));
            if (this.responseText === "ok")
            {
                flash("ویرایش موفقیت آمیز بود.");
                document.getElementById("CountainerKadrViraieshTNZ").remove();
                var lmn = document.querySelector(".itemJTNZ[data-id='"+id+"']");
                lmn.dataset.bank = bankID;
                lmn.getElementsByClassName("onvanJTNZ")[0].innerHTML = nam;
                lmn.getElementsByClassName("shomHesabJTNZ")[0].innerHTML = shomHesab;
                lmn.getElementsByClassName("shomKartJTNZ")[0].innerHTML = shomKart;
                lmn.getElementsByClassName("mandehTarazJTNZ")[0].innerHTML = momayezdar(mandehTaraz);
                lmn.getElementsByClassName("aksBankJTNZ")[0].src = "pic/bank/"+ bankID + ".png";
            }
            else if (this.responseText === "er:tool") namayeshPeygham("ثبت با خطا مواجه شد! نام حساب نباید بیشتر از 30 کاراکتر باشد.");
            else namayeshPeygham("ویرایش با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/virayesh-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&nam="+nam+"&shomHesab="+shomHesab+"&shomKart="+shomKart+"&mandehTaraz="+mandehTaraz+"&bankID="+bankID+"&tk="+tkn);
    namayeshLoading(document.getElementById("CountainerKadrViraieshTNZ"));
}

/*      افزودن حساب      */
function sabtHesab()
{
    errorDarad = false;
    var nam = document.getElementById("namATNZ").value.trim().replace(/(<([^>]+)>)/ig, '');
    var bank = document.getElementById("bankATNZ").value.trim();
    var shomHesab = document.getElementById("shomHesabATNZ").value.trim();
    var shomKart = document.getElementById("shomKartATNZ").value.trim();
    var taraz = document.getElementById("mandehATNZ").value.trim();

    if (nam.length === 0) errorInput(document.getElementById("namATNZ"));
    if (!check(shomHesab, "^[0-9]{1,100}$")) errorInput(document.getElementById("shomHesabATNZ"));
    if (!check(shomKart, "^[0-9]{16}$")) errorInput(document.getElementById("shomKartATNZ"));
    if (!check(taraz, "^(0|[1-9][0-9]*)$")) errorInput(document.getElementById("mandehATNZ"));
    if (errorDarad) return;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrHesabhaTNZ"));
            if (this.responseText.substr(0,2) === "ok")
            {
                flash("حساب با موفقیت اضافه شد.");
                document.getElementById("namATNZ").value = "";
                document.getElementById("shomHesabATNZ").value = "";
                document.getElementById("shomKartATNZ").value = "";
                document.getElementById("mandehATNZ").value = "";

                let lmnHesab = document.createElement("div");
                lmnHesab.setAttribute("class", "itemJTNZ");
                lmnHesab.dataset.id = this.responseText.split(":")[1];
                lmnHesab.dataset.bank = bank;
                lmnHesab.dataset.tartib = this.responseText.split(":")[2];
                lmnHesab.innerHTML = '<div class="shomJTNZ"></div>\n' +
                    '<div class="etelaatJTNZ">\n' +
                    '    <div class="bankJTNZ"><img src="pic/bank/'+ bank +'.png" alt="bank" class="aksBankJTNZ"/></div>\n' +
                    '    <div class="onvanJTNZ" title="">'+ nam +'</div>\n' +
                    '    <div class="shomHesabJTNZ">'+ shomHesab +'</div>\n' +
                    '    <div class="shomKartJTNZ">'+ shomKart +'</div>\n' +
                    '    <div class="eftetahJTNZ">'+ this.responseText.split(":")[3] +'</div>\n' +
                    '    <div class="mandehTarazJTNZ">'+ momayezdar(taraz) +'</div>\n' +
                    '    <div class="emkanatJTNZ">\n' +
                    '        <a href="javascript:void(0);" class="btnJTNZ btnHazfJTNZ" title="حذف"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJTNZ btnVirayeshJTNZ" onclick="virayeshHSB(this);" title="ویرایش"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJTNZ btnBalaJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, false);" title="جابجایی"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJTNZ btnPaeenJTNZ" onclick="jabejaeiHSB(this.parentElement.parentElement.parentElement, true);" title="جابجایی"></a>\n' +
                    '    </div>\n' +
                    '</div>';
                document.getElementById("jadvalTNZ").appendChild(lmnHesab);
                shomarehBandiHSB();
            }
            else if (this.responseText === "er:tool") namayeshPeygham("ثبت با خطا مواجه شد! نام حساب نباید بیشتر از 30 کاراکتر باشد.");
            else namayeshPeygham("ثبت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nam="+nam+"&bank="+bank+"&shomHesab="+shomHesab+"&shomKart="+shomKart+"&taraz="+taraz+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrHesabhaTNZ"));
}

/*      تغییر تم      */
function taghirTheme(lmnEnt)
{
    var darkModeAst = Number(lmnEnt.dataset.value);
    localStorage.setItem("darkmode", darkModeAst);
    if (darkModeAst === 1 && document.querySelector('link[href="style/dark-mode.css"]') === null)
    {
        var lmn = document.createElement("link");
        lmn.rel = "stylesheet";
        lmn.href = "style/dark-mode.css";
        document.head.appendChild(lmn);

        lmn = document.createElement("meta");
        lmn.name = "theme-color";
        lmn.content = "#1a1a1a";
        document.head.appendChild(lmn);
    }
    else if (darkModeAst === 0 && document.querySelector('link[href="style/dark-mode.css"]'))
    {
        document.querySelector('link[href="style/dark-mode.css"]').remove();
        document.querySelector('meta[name="theme-color"]').remove();
    }
}

/*      تغییر حالت منو      */
function taghirHalatMenu(lmnEnt)
{
    var bazAst = Number(lmnEnt.dataset.value);
    localStorage.setItem("menu", bazAst);
    if (bazAst === 0 && document.querySelector('link[href="style/menu-basteh.css"]') === null)
    {
        var lmn = document.createElement("link");
        lmn.rel = "stylesheet";
        lmn.href = "style/menu-basteh.css";
        document.head.appendChild(lmn);
    }
    else if (bazAst === 1 && document.querySelector('link[href="style/menu-basteh.css"]'))
    {
        document.querySelector('link[href="style/menu-basteh.css"]').remove();
    }

    setTimeout(function(){entekhab.tanzimENT();}, 300);
}

/*      تغییر پیشفرض پیشنهادها      */
function taghirPishfarzPIS(lmn)
{
    var meghdar = lmn.parentElement.dataset.value;
    localStorage.setItem("pishfarzPishnahad", meghdar);
}

/*      تغییر پیشفرض صورتحساب      */
function taghirPishfarzSRT(lmn)
{
    var meghdar = lmn.parentElement.dataset.value;
    localStorage.setItem("pishfarzSoorathesab", meghdar);
}

/*      تغییر پیشفرض آمار      */
function taghirPishfarzAMR(lmn)
{
    var meghdar = lmn.parentElement.dataset.value;
    localStorage.setItem("pishfarzAmar", meghdar);
}

/*      تغییر پیشفرض جدا کننده تاریخ صورتحساب      */
function taghirJodaKanandeh(lmnEnt)
{
    var entekhab = Number(lmnEnt.dataset.value);
    localStorage.setItem("jodaKanandeh", entekhab);
}

/*      تغییر پیشفرض حالت فیلتر صورتحساب      */
function taghirPishfarzFSRT(lmnEnt)
{
    var entekhab = Number(lmnEnt.dataset.value);
    localStorage.setItem("pishfarzFilterSRT", entekhab);
}

/*      تغییر پیشفرض حالت فیلتر برنامه زمانی      */
function taghirPishfarzFBRN(lmnEnt)
{
    var entekhab = Number(lmnEnt.dataset.value);
    localStorage.setItem("pishfarzFilterBRN", entekhab);
}

/*      تغییر موبایل      */
function taghirMobile(lmn)
{
    if (lmn.value.trim() === mobile)
    {
        lmn.nextElementSibling.removeAttribute("style");
    }
    else
    {
        lmn.nextElementSibling.style.pointerEvents = "unset";
        lmn.nextElementSibling.style.opacity = "1";
    }
}

/*      تغییر ایمیل      */
function taghirEmail(lmn)
{
    if (lmn.value.trim() === email)
    {
        lmn.nextElementSibling.removeAttribute("style");
    }
    else
    {
        lmn.nextElementSibling.style.pointerEvents = "unset";
        lmn.nextElementSibling.style.opacity = "1";
    }
}

/*      ثبت اطلاعات اکانت      */
function sabtEtelaatAccount(lmn, noe)
{
    var meghdar = lmn.previousElementSibling.value.trim();
    lmn.previousElementSibling.blur();
    if (noe === "mobile" && !check(meghdar, PATTERN_MOBILE_BA0))
    {
        errorInput(lmn.previousElementSibling);
        return;
    }
    else if (noe === "email" && !check(meghdar, PATTERN_EMAIL))
    {
        errorInput(lmn.previousElementSibling);
        return;
    }

    namayeshLoading(document.getElementById("kadrEtelaatAccount"));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrEtelaatAccount"));
            if (this.responseText === "ok")
            {
                flash("ثبت اطلاعات با موفقیت انجام شد.");
                if (noe === "mobile")
                {
                    mobile = meghdar;
                    taghirMobile(lmn.previousElementSibling);
                }
                else if (noe === "email")
                {
                    email = meghdar;
                    taghirEmail(lmn.previousElementSibling);
                }
            }
            else if (this.responseText === "er:tekrari")
            {
                if (noe === "mobile")
                    namayeshPeygham("ثبت با خطا مواجه شد، این شماره قبلا ثبت شده است.");
                else if (noe === "email")
                    namayeshPeygham("ثبت با خطا مواجه شد، این ایمیل قبلا ثبت شده است.");
            }
            else namayeshPeygham("ثبت با خطا مواجه شد، لطفا پس از بررسی مجدد تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-etelaat-account.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("meghdar="+meghdar+"&noe="+noe+"&tk="+tkn);
}

/*      باز کردن کادر تغییر رمز اکانت      */
function taghirRamz()
{
    var lmnPeygham = document.createElement("div");
    lmnPeygham.setAttribute("id", "CountainerKadrNamayeshPeyghamHA");
    lmnPeygham.innerHTML = '<div id="kadrNamayeshPeyghamHA">\n' +
        '            <a id="kadrPoshtPeyghamHA" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '            <div id="kadrPeyghamHA">\n' +
        '                <div>\n' +
        '                    <div id="titrPeyghamHA"><span class="icon"></span><span class="matnTitr">تغییر رمز عبور</span></div>\n' +
        '                    <div id="matnPeyghamHA">رمز باید حداقل 8 کاراکتر باشد.</div>\n' +
        '                    <input type="password" class="txtPeygham" id="txtRamzGhabliHA" placeholder="رمز عبور فعلی" autocomplete="off"/>\n' +
        '                    <input type="password" class="txtPeygham" id="txtRamzJadidHA" placeholder="رمز عبور جدید" autocomplete="off"/>\n' +
        '                    <input type="password" class="txtPeygham" id="txtTekrarRamzJadidHA" placeholder="تکرار رمز عبور جدید" autocomplete="off"/>\n' +
        '                    <span id="kadrDokmehPeyghamHA">' +
        '                       <a class="dokmehTL dokmehTaeed" onclick="SabtTaghirRamz();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>' +
        '                       <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>' +
        '                   </span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';
    document.body.appendChild(lmnPeygham);
    lmnPeygham.onkeydown = function(e){if (e.keyCode === 13) SabtTaghirRamz();};
}

/*      ثبت تغییر رمز اکانت      */
function SabtTaghirRamz()
{
    var ramzGhabli = document.getElementById("txtRamzGhabliHA").value.trim();
    var ramzJadid = document.getElementById("txtRamzJadidHA").value.trim();
    var tekrarRamz = document.getElementById("txtTekrarRamzJadidHA").value.trim();
    var check = true;

    if (ramzGhabli.length < 8)
    {
        check = false;
        errorInput(document.getElementById("txtRamzGhabliHA"));
    }
    if (ramzJadid.length < 8)
    {
        check = false;
        errorInput(document.getElementById("txtRamzJadidHA"));
    }
    if (tekrarRamz.length < 8)
    {
        check = false;
        errorInput(document.getElementById("txtTekrarRamzJadidHA"));
    }

    if (!check)
    {
        namayeshPeygham("رمز عبور باید بیشتر از 8 کاراکتر باشد.");
        return;
    }

    if (ramzJadid !== tekrarRamz)
    {
        errorInput(document.getElementById("txtTekrarRamzJadidHA"));
        namayeshPeygham("رمز عبور جدید با تکرار رمز عبور مطابقت ندارد.");
        return;
    }

    namayeshLoading(document.getElementById("CountainerKadrNamayeshPeyghamHA"));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("CountainerKadrNamayeshPeyghamHA"));
            if (this.responseText === "ok")
            {
                flash("تغییر رمز موفقیت آمیز بود.");
                document.getElementById("CountainerKadrNamayeshPeyghamHA").remove();
            }
            else if (this.responseText === "er:tedad") namayeshPeygham("تعداد تلاش شما بیش از حد مجاز بوده، لطفا پس از مدتی دوباره تلاش کنید.");
            else if (this.responseText === "er:ramz") namayeshPeygham("'رمز قبلی' وارد شده نامعتبر است.");
            else namayeshPeygham("تغییر رمز با خطا مواجه شد. پس از بررسی مجدد فیلد ها، دوباره تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/taghir-ramz.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ramzG="+ramzGhabli+"&ramzJ="+ramzJadid+"&ramzT="+tekrarRamz+"&tk="+tkn);
}

/*      باز کردن کادر تایید حذف اکانت      */
function taeedHazfAccount()
{
    var lmnPeygham = document.createElement("div");
    lmnPeygham.setAttribute("id", "CountainerKadrNamayeshPeyghamHA");
    lmnPeygham.innerHTML = '<div id="kadrNamayeshPeyghamHA">\n' +
        '            <a id="kadrPoshtPeyghamHA" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '            <div id="kadrPeyghamHA">\n' +
        '                <div>\n' +
        '                    <div id="titrPeyghamHA"><span class="icon"></span><span class="matnTitr">حذف حساب کاربری</span></div>\n' +
        '                    <div id="matnPeyghamHA">اگر برای حذف کامل حساب کابری خود اطمینان دارید، پس از وارد کردن رمز عبور دکمه تایید را بزنید.</div>\n' +
        '                    <input type="text" class="txtPeygham" id="txtRamzHA" placeholder="رمز عبور" autocomplete="off"/>\n' +
        '                    <span id="kadrDokmehPeyghamHA">' +
        '                       <a class="dokmehTL dokmehTaeed" onclick="hazfAccount();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>' +
        '                       <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>' +
        '                   </span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';
    document.body.appendChild(lmnPeygham);
    lmnPeygham.onkeydown = function(e){if (e.keyCode === 13) hazfAccount();};
}

/*      حذف اکانت      */
function hazfAccount()
{
    var ramz = document.getElementById("txtRamzHA").value.trim();
    if (ramz === "")
    {
        errorInput(document.getElementById("txtRamzHA"));
        return;
    }

    namayeshLoading(document.getElementById("CountainerKadrNamayeshPeyghamHA"));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("CountainerKadrNamayeshPeyghamHA"));
            if (this.responseText === "ok") location.reload();
            else if (this.responseText === "er:tedad") namayeshPeygham("تعداد تلاش شما بیش از حد مجاز بوده، لطفا پس از مدتی دوباره تلاش کنید.");
            else namayeshPeygham("رمز وارد شده نامعتبر است.");
        }
    };
    xhttp.open("POST", "./ajax/hazf-account.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ramz="+ramz+"&tk="+tkn);
}