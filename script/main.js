/*      تنظیم صفحه بعد از لود کامل      */
function tanzimSaf()
{
    var lmnENT = document.getElementsByClassName("kadrENT");
    for (let i=0; i<lmnENT.length; i++)
        if (lmnENT[i].getElementsByClassName("gozinehENT")[0])
            taghirENT(lmnENT[i].getElementsByClassName("gozinehENT")[0]);
}

/*      باز و بست منو      */
function bazobastMNU(vaziat)
{
    var menu = document.getElementById("navarRast");
    var kadrPosht = document.getElementById("kadrMeshkiMNU");

    if (vaziat === undefined)
    {
        if (menu.dataset.vaziat === "1")
        {
            menu.dataset.vaziat = "0";
            kadrPosht.style.display = "none";
            kadrPosht.style.opacity = 0;
        }
        else
        {
            menu.dataset.vaziat = "1";
            kadrPosht.style.display = "block";
            kadrPosht.style.opacity = 1;
        }
    }
    else
    {
        menu.dataset.vaziat = vaziat;

        if (vaziat === 1)
        {
            kadrPosht.style.display = "block";
            kadrPosht.style.opacity = 1;
        }
        else
        {
            kadrPosht.style.display = "none";
            kadrPosht.style.opacity = 0;
        }
    }
}

/*      بستن کادر پیغام      */
function bastanPeygham()
{
    document.getElementById("CountainerKadrNamayeshPeygham").style.display = 'none';
}

/*      نمایش پیغام      */
function namayeshPeygham(matn, dokmehha = 0, tabe = "")
{
    document.getElementById("CountainerKadrNamayeshPeygham").style.display = 'table';
    document.getElementById("matnPeygham").innerHTML = matn;
    if (dokmehha === 1)
        document.getElementById("kadrDokmehPeygham").innerHTML = '<a class="dokmehTL dokmehTaeed" onclick="' + tabe + '" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>' +
            '<a class="dokmehTL dokmehLaghv" onclick="bastanPeygham();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>';
    else
        document.getElementById("kadrDokmehPeygham").innerHTML = "";

    if (dokmehha === 0) document.getElementById("kadrPoshtPeygham").focus();
}

/*      نمایش فلش      */
function flash(matn, icon = "")
{
    var lmn = document.createElement("div");
    lmn.setAttribute("class", "kadrFlash");
    lmn.innerHTML = '<div class="iconFlash">'+ icon +'</div><div class="matnFlash">'+ matn +'</div>';
    document.body.appendChild(lmn);
    setTimeout(function(){lmn.remove();}, 5000);
}

/*      بستن کادر لودینگ      */
function bastanLoading(lmn)
{
    lmn.getElementsByClassName("kadrKolLoading")[0].remove();
}

/*      نمایش لودینگ      */
function namayeshLoading(lmn)
{
    var loading = document.createElement("div");
    loading.setAttribute("class", "kadrKolLoading");
    loading.innerHTML = '<div class="kadrLoading"><img src="pic/loading.png" class="loading"></div>';
    lmn.appendChild(loading);
}

/*      عوض کردن ورودی و خروجی در ثبت واریزی      */
function taghirENT(lmn)
{
    var lmnPosht = lmn.parentElement.getElementsByClassName("kadrPoshtENT")[0];
    lmn.parentElement.dataset.value = lmn.dataset.value;
    lmnPosht.style.width = lmn.clientWidth + "px";
    lmnPosht.style.top = lmn.offsetTop + "px";
    lmnPosht.style.left = lmn.offsetLeft + "px";
}

/*      نمایش مبلغ ورودی کاربر با ممیز      */
function namayeshMablaghSBT(lmn)
{
    var meghdar = lmn.value.trim();
    if (!adadiAst(meghdar)) return;
    if (meghdar === "") lmn.parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = "";
    else lmn.parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = momayezdar(meghdar) + " ریال";
}

var vasileh = 1;  // پیشفرض: کارتخوان
/*      تغییر وسیله پرداخت      */
function taghirVasilehSBT(lmn)
{
    if (vasileh === Number(lmn.parentElement.dataset.value)) return;
    vasileh = Number(lmn.parentElement.dataset.value);

    if (vasileh === 3) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
    else document.getElementById("varizBeSBTK").parentElement.style.display = "none";
}

/*      تغییر حساب در ثبت واریزی      */
function taghirHesabSBT(lmn)
{
    var hesabID = Number(lmn.value);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrSBTK"));
            bastanLoading(document.getElementById("kadrSBTV"));

            var objNatijeh = JSON.parse(this.responseText);
            var arrObjAfrad = objNatijeh["afrad"];
            var arrObjDasteh = objNatijeh["dasteh"];
            vasileh = 0; // برای اینکه تابع "تغییر وسیله" در صورت تغییر این متغیر کار میکند
            taghirVasilehSBT(document.querySelector("#vasilehSBTK .gozinehENT"));

            /* دسته بندی ثبت خروجی */
            var lmnSelectDastehBandi = document.getElementById("dastehSBTK");
            lmnSelectDastehBandi.innerHTML = "";
            for (let i=0; i<arrObjDasteh.length; i++)
            {
                if (Number(arrObjDasteh[i]["noe"]) <= 2)
                {
                    var option = document.createElement("option");
                    option.value = arrObjDasteh[i]["id"];
                    option.innerHTML = arrObjDasteh[i]["onvan"];
                    lmnSelectDastehBandi.appendChild(option);
                }
            }

            /* دسته بندی ثبت ورودی */
            lmnSelectDastehBandi = document.getElementById("dastehSBTV");
            lmnSelectDastehBandi.innerHTML = "";
            for (let i=0; i<arrObjDasteh.length; i++)
            {
                if (Number(arrObjDasteh[i]["noe"]) <= 1 || Number(arrObjDasteh[i]["noe"]) === 3)
                {
                    var option = document.createElement("option");
                    option.value = arrObjDasteh[i]["id"];
                    option.innerHTML = arrObjDasteh[i]["onvan"];
                    lmnSelectDastehBandi.appendChild(option);
                }
            }

            /* واریز به ها */
            var lmnSelectSBTK = document.getElementById("varizBeSBTK");
            lmnSelectSBTK.innerHTML = "";
            for (let i=0; i<arrObjAfrad.length; i++)
            {
                if (arrObjAfrad[i]["noe"] <= 2)
                {
                    option = document.createElement("option");
                    option.value = arrObjAfrad[i]["id"];
                    option.innerHTML = arrObjAfrad[i]["nam"];
                    lmnSelectSBTK.appendChild(option);
                }
            }

            /* واریز کننده ها */
            var lmnSelectSBTV = document.getElementById("varizKonandehSBTV");
            lmnSelectSBTV.innerHTML = "";
            for (let i=0; i<arrObjAfrad.length; i++)
            {
                if (Number(arrObjAfrad[i]["noe"]) <= 1 || Number(arrObjAfrad[i]["noe"]) === 3)
                {
                    option = document.createElement("option");
                    option.value = arrObjAfrad[i]["id"];
                    option.innerHTML = arrObjAfrad[i]["nam"];
                    lmnSelectSBTV.appendChild(option);
                }
            }

            /* اخرین ثبت ها */
            if (objNatijeh["khorooji"] !== undefined)
            {
                document.getElementById("mablaghAKVK").innerHTML = momayezdar(objNatijeh["khorooji"]["mablagh"]);
                document.getElementById("onvanAKVK").innerHTML = objNatijeh["khorooji"]["onvan"];
                document.getElementById("tarikhAKVK").innerHTML = objNatijeh["khorooji"]["tarikh"];
            }
            else
            {
                document.getElementById("mablaghAKVK").innerHTML = "";
                document.getElementById("onvanAKVK").innerHTML = "";
                document.getElementById("tarikhAKVK").innerHTML = "";
            }

            if (objNatijeh["voroodi"] !== undefined)
            {
                document.getElementById("mablaghAKVV").innerHTML = momayezdar(objNatijeh["voroodi"]["mablagh"]);
                document.getElementById("onvanAKVV").innerHTML = objNatijeh["voroodi"]["onvan"];
                document.getElementById("tarikhAKVV").innerHTML = objNatijeh["voroodi"]["tarikh"];
            }
            else
            {
                document.getElementById("mablaghAKVV").innerHTML = "";
                document.getElementById("onvanAKVV").innerHTML = "";
                document.getElementById("tarikhAKVV").innerHTML = "";
            }
        }
    };
    xhttp.open("POST", "./ajax/gereften-etelaat-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrSBTK"));
    namayeshLoading(document.getElementById("kadrSBTV"));
}

/*      وارد کردن توضیحات و تغییر کادر پیشنهاد زیرش      */
function taghirPishnahad(lmn)
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var ebarat = lmn.value.trim().toString();
    var khoroojiAst = Number(lmn.dataset.khoroojiAst);
    var lmnKadr = lmn.nextElementSibling;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (!jsonMotabarAst(this.responseText)) return;
            lmnKadr.innerHTML = "";
            var arrObjNatijeh = JSON.parse(this.responseText);
            for (let i=0; i<arrObjNatijeh.length; i++)
            {
                var lmnPishnahad = document.createElement("a");
                lmnPishnahad.href = "javascript:void(0);";
                lmnPishnahad.setAttribute("class", "itemPishnahad");
                lmnPishnahad.addEventListener("click", function (){entekhabPishnahad(lmn, i)});
                lmnPishnahad.innerHTML = '<span class="titrPishnahad">'+ arrObjNatijeh[i]["tozih"] +'</span><span class="meghdarPishnahad">'+ arrObjNatijeh[i]["tedad"] +'</span>';
                lmnKadr.appendChild(lmnPishnahad);
            }
        }
    };
    xhttp.open("POST", "./ajax/gereftan-pishnahad.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&ebarat="+ebarat+"&khoroojiAst="+khoroojiAst+"&tk="+tkn);
}

/*      پیمایش پیشنهادها      */
function peymayeshPishnahadha(balaAst)
{
    var lmnFaal = document.querySelector("a.itemPishnahad[data-entekhabi]");
    if (lmnFaal !== null)
    {
        if (balaAst && lmnFaal.previousElementSibling)
        {
            document.querySelector("a.itemPishnahad[data-entekhabi]").removeAttribute("data-entekhabi");
            lmnFaal.previousElementSibling.dataset.entekhabi = "";
        }
        else if (balaAst)
        {
            document.querySelector("a.itemPishnahad[data-entekhabi]").removeAttribute("data-entekhabi");
        }
        else if (!balaAst && lmnFaal.nextElementSibling)
        {
            document.querySelector("a.itemPishnahad[data-entekhabi]").removeAttribute("data-entekhabi");
            lmnFaal.nextElementSibling.dataset.entekhabi = "";
        }
    }
    else if (!balaAst)
    {
        document.getElementsByClassName("itemPishnahad")[0].dataset.entekhabi = "";
    }
}

/*      انتخاب پیشنهاد      */
function entekhabPishnahad(lmn, shom)
{
    lmn.focus();
    var lmnPishnehad = document.querySelector("a.itemPishnahad[data-entekhabi]>span.titrPishnahad");
    if (lmnPishnehad)
    {
        if (shom === undefined)
            document.activeElement.value = lmnPishnehad.innerHTML.trim();
        else
            lmn.value = document.getElementsByClassName("titrPishnahad")[shom].innerHTML.trim();
        taghirPishnahad(lmn);
    }
}

/*      قطع پیشنهاد ها      */
function ghatePishnahad(lmn)
{
    setTimeout(function ()
    {
        if (document.activeElement.getAttribute("class") !== "itemPishnahad") lmn.nextElementSibling.innerHTML = "";
    },1)
}

var errorDarad;
/*      ارور اینپوت ها      */
function errorInput(lmn)
{
    errorDarad = true;
    if (lmn.getAttribute("data-error") !== null) return;
    lmn.dataset.error = "";
    var fnc = () => {
        lmn.removeAttribute("data-error");
        lmn.removeEventListener("focus", fnc);
    };
    lmn.addEventListener("focus", fnc);
}

/*      ثبت واریزی      */
function sabtVarizi(noe)
{
    if (document.querySelector("a.itemPishnahad[data-entekhabi]")) return;
    errorDarad = false;
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var strQ = "khoroojiAst=" + noe;

    if (noe === 1)
    {
        ghatePishnahad(document.getElementById("tozihSBTK"));
        var vasilehID = document.getElementById("vasilehSBTK").dataset.value.toString();
        var dastehID = document.getElementById("dastehSBTK").value.toString();
        var fard = document.getElementById("varizBeSBTK").value.toString();
        var rooz = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[0].value.toString();
        var mah = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[1].value.toString();
        var sal = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[2].value.toString();
        var mablagh = document.getElementById("mablaghSBTK").value.toString();
        var tozih = document.getElementById("tozihSBTK").value.toString().replace(/(<([^>]+)>)/ig, '');
        strQ += "&vasilehID=" + vasilehID;

        if (!check(rooz, "^(0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[0]);
        if (!check(mah, "^(0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[1]);
        if (!check(sal, "^[1-9][0-9]{3}$")) errorInput(document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[2]);
        if (!check(mablagh, "^[1-9][0-9]*$")) errorInput(document.getElementById("mablaghSBTK"));
    }
    else if (noe === 0)
    {
        ghatePishnahad(document.getElementById("tozihSBTV"));
        var dastehID = document.getElementById("dastehSBTV").value.toString();
        var fard = document.getElementById("varizKonandehSBTV").value.toString();
        var rooz = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[0].value.toString();
        var mah = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[1].value.toString();
        var sal = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[2].value.toString();
        var mablagh = document.getElementById("mablaghSBTV").value.toString();
        var tozih = document.getElementById("tozihSBTV").value.toString().replace(/(<([^>]+)>)/ig, '');

        if (!check(rooz, "^(0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[0]);
        if (!check(mah, "^(0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[1]);
        if (!check(sal, "^[1-9][0-9]{3}$")) errorInput(document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[2]);
        if (!check(mablagh, "^[1-9][0-9]*$")) errorInput(document.getElementById("mablaghSBTV"));
    }
    else return;

    if (errorDarad) return;
    strQ += "&hesabID=" + hesabID + "&dastehID=" + dastehID + "&fard=" + fard + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh + "&tozih=" + tozih;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (noe === 1) bastanLoading(document.getElementById("kadrSBTK"));
            else bastanLoading(document.getElementById("kadrSBTV"));

            var natijeh = this.responseText;
            if (natijeh === "ok")
            {
                flash("واریز با موفقیت ثبت شد.");
                var lmnMandeh = document.getElementById("mandeh"+hesabID);
                if (noe === 1)
                {
                    document.getElementById("mablaghSBTK").value = "";
                    document.getElementById("tozihSBTK").value = "";
                    document.getElementById("mablaghSBTK").parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = "";
                    lmnMandeh.innerHTML = momayezdar(hazfMomayez(lmnMandeh.innerHTML) - Number(mablagh));
                    document.getElementById("mablaghSBTK").select();

                    var lmnDasteh = document.getElementById("dastehSBTK");
                    document.getElementById("mablaghAKVK").innerHTML = momayezdar(mablagh);
                    document.getElementById("onvanAKVK").innerHTML = lmnDasteh.options[lmnDasteh.selectedIndex].text;
                    document.getElementById("tarikhAKVK").innerHTML = tarikhKon(sal, mah, rooz);
                }
                else
                {
                    document.getElementById("mablaghSBTV").value = "";
                    document.getElementById("tozihSBTV").value = "";
                    document.getElementById("mablaghSBTV").parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = "";
                    lmnMandeh.innerHTML = momayezdar(hazfMomayez(lmnMandeh.innerHTML) + Number(mablagh));
                    document.getElementById("mablaghSBTV").select();

                    var lmnDasteh = document.getElementById("dastehSBTV");
                    document.getElementById("mablaghAKVV").innerHTML = momayezdar(mablagh);
                    document.getElementById("onvanAKVV").innerHTML = lmnDasteh.options[lmnDasteh.selectedIndex].text;
                    document.getElementById("tarikhAKVV").innerHTML = tarikhKon(sal, mah, rooz);
                }
            }
            else if (natijeh === "er:mandeh") namayeshPeygham("مبلغ وارد شده اشتباه است. این مبلغ بیشتر از مانده حساب شماست.");
            else if (natijeh === "er:ayandeh") namayeshPeygham("تاریخ وارد شده نمی تواند در آینده باشد.");
            else if (natijeh.substr(0, 10) === "er:tarikh:") namayeshPeygham("تاریخ وارد شده اشتباه است. این تاریخ قبل از افتتاح حساب شما ("+ natijeh.substr(10, 10) +") است.");
            else namayeshPeygham("ثبت با خطا مواجه شد، لطفا پس از بررسی فیلد ها مجددا تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-varizi.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);

    if (noe === 1) namayeshLoading(document.getElementById("kadrSBTK"));
    else namayeshLoading(document.getElementById("kadrSBTV"));
}

/*      تابع گرفتن مانده      */
function gereftanMandeh(hesabID, lmn)
{
    if (lmn !== undefined) lmn.innerHTML = "...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            var mandeh = Number(this.responseText);
            if (lmn === undefined) return mandeh;
            else lmn.innerHTML = momayezdar(mandeh);
        }
    };
    xhttp.open("POST", "./ajax/gereftan-mandeh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&tk="+tkn);
}

/*  آمدن و رفتن دکمه برو بالا  */
window.addEventListener("scroll", function ()
{
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) document.getElementById("btnBoroBala").style.top = "20px";
    else document.getElementById("btnBoroBala").style.top = "-45px";
});