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
        '                            <input type="text" id="namVTNZ" name="nam" value="'+ nam +'" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">بانک:</span></div>\n' +
        '                            <select id="bankVTNZ" name="bank">\n';

    for (let i=0; i<arrBank.length; i++)
        strHTML += '<option value="'+ arrBank[i]["id"] +'"'+ (bank === Number(arrBank[i]["id"]) ? " selected" : "") +'>'+ arrBank[i]["nam"] +'</option>';

    strHTML += '</select>\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">شماره حساب:</span></div>\n' +
        '                            <input type="text" id="shomHesabVTNZ" name="shomHesab" value="'+ shomHesab +'" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">شماره کارت:</span></div>\n' +
        '                            <input type="text" id="shomKartVTNZ" name="shomKart" value="'+ shomKart +'" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مانده تراز:</span></div>\n' +
        '                            <input type="text" id="mandehVTNZ" name="mandeh" value="'+ mandehTaraz +'" autocomplete="off">\n' +
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
    lmnKadr.onkeydown = function(e){if (e.keyCode === 13) sabtVirayeshHSB(id);};
}

/*      ثبت ویرایش حساب      */
function sabtVirayeshHSB(id)
{
    var nam = document.getElementById("namVTNZ").value.trim().replace(/(<([^>]+)>)/ig, '');
    var shomHesab = document.getElementById("shomHesabVTNZ").value.trim();
    var shomKart = document.getElementById("shomKartVTNZ").value.trim();
    var mandehTaraz = document.getElementById("mandehVTNZ").value.trim();
    var bankID = document.getElementById("bankVTNZ").value.trim();

    if (!check(nam, "^.{1,30}$")) {
        namayeshPeygham("نام اشتباه است.");
        return;
    }

    if (!check(shomHesab, "^[0-9]{1,100}$")) {
        namayeshPeygham("شماره حساب اشتباه است.");
        return;
    }

    if (!check(shomKart, "^[0-9]{16}$")) {
        namayeshPeygham("شماره کارت اشتباه است.");
        return;
    }

    if (!check(mandehTaraz, "^(0|[1-9][0-9]*)$")) {
        namayeshPeygham("مانده تراز اشتباه است.");
        return;
    }

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
    var nam = document.getElementById("namATNZ").value.trim().replace(/(<([^>]+)>)/ig, '');
    var bank = document.getElementById("bankATNZ").value.trim();
    var shomHesab = document.getElementById("shomHesabATNZ").value.trim();
    var shomKart = document.getElementById("shomKartATNZ").value.trim();
    var taraz = document.getElementById("mandehATNZ").value.trim();

    if (!check(nam, "^.{1,30}$")) {
        namayeshPeygham("نام اشتباه است.");
        return;
    }

    if (!check(shomHesab, "^[0-9]{1,100}$")) {
        namayeshPeygham("شماره حساب اشتباه است.");
        return;
    }

    if (!check(shomKart, "^[0-9]{16}$")) {
        namayeshPeygham("شماره کارت اشتباه است.");
        return;
    }

    if (!check(taraz, "^(0|[1-9][0-9]*)$")) {
        namayeshPeygham("مانده تراز اشتباه است.");
        return;
    }

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
            else namayeshPeygham("ثبت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nam="+nam+"&bank="+bank+"&shomHesab="+shomHesab+"&shomKart="+shomKart+"&taraz="+taraz+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrHesabhaTNZ"));
}

/*      تغییر تم      */
function taghirTheme(darkModeAst)
{
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