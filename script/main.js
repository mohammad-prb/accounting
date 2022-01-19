/*      تنظیم صفحه بعد از لود کامل      */
function tanzimSaf()
{
    var lmnENT = document.getElementsByClassName("kadrENT");
    for (let i=0; i<lmnENT.length; i++)
        if (lmnENT[i].getElementsByClassName("gozinehENT")[0])
            taghirENT(lmnENT[i].getElementsByClassName("gozinehENT")[0]);
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

/*      عوض کردن وضعیت توگل      */
function togel(lmn, vaziat)
{
    if (vaziat === undefined)
    {
        if (lmn.dataset.vaziat === "1")
        {
            lmn.dataset.vaziat = 0;
            lmn.innerHTML = "";
        }
        else
        {
            lmn.dataset.vaziat = 1;
            lmn.innerHTML = "";
        }
    }
    else
    {
        lmn.dataset.vaziat = vaziat;

        if (vaziat === 1) lmn.innerHTML = "";
        else lmn.innerHTML = "";
    }
}

/*      عوض کردن وضعیت چک باکس      */
function checkbax(lmn, vaziat)
{
    if (vaziat === undefined)
    {
        if (lmn.dataset.vaziat === "1")
        {
            lmn.dataset.vaziat = 0;
            lmn.getElementsByClassName("icon")[0].innerHTML = "";
        }
        else
        {
            lmn.dataset.vaziat = 1;
            lmn.getElementsByClassName("icon")[0].innerHTML = "";
        }
    }
    else
    {
        lmn.dataset.vaziat = vaziat;

        if (vaziat === 1) lmn.getElementsByClassName("icon")[0].innerHTML = "";
        else lmn.getElementsByClassName("icon")[0].innerHTML = "";
    }
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

var noe = 1;  // پیشفرض: برداشت با کارت
/*      تغییر نوع واریزی      */
function taghirNoeSBT(lmn)
{
    if (noe === Number(lmn.parentElement.dataset.value)) return;

    noe = Number(lmn.parentElement.dataset.value);
    var lmnVasileh = document.getElementById("vasilehSBTK");

    if (noe === 1)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>';
    }
    else if (noe === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="3" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="4" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="5" href="javascript:void(0);">پرداخت</a>';
    }

    taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    taghirVasilehSBT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
}

var vasileh = 2;  // پیشفرض: کارتخوان
/*      تغییر وسیله پرداخت      */
function taghirVasilehSBT(lmn)
{
    if (vasileh === Number(lmn.parentElement.dataset.value)) return;

    vasileh = Number(lmn.parentElement.dataset.value);
    var lmnDasteh = document.getElementById("dastehSBTK");
    lmnDasteh.innerHTML = "";

    if (vasileh === 6)
    {
        for (let i=0; i<arrObjDasteh.length; i++)
        {
            if (Number(arrObjDasteh[i]["noe"]) === 4)
            {
                let option = document.createElement("option");
                option.value = arrObjDasteh[i]["id"];
                option.innerHTML = arrObjDasteh[i]["onvan"];
                lmnDasteh.appendChild(option);
            }
        }
    }
    else
    {
        for (let i=0; i<arrObjDasteh.length; i++)
        {
            if (Number(arrObjDasteh[i]["noe"]) <= 2)
            {
                let option = document.createElement("option");
                option.value = arrObjDasteh[i]["id"];
                option.innerHTML = arrObjDasteh[i]["onvan"];
                lmnDasteh.appendChild(option);
            }
        }
    }

    if (vasileh === 3 || vasileh === 4) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
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
            arrObjAfrad = objNatijeh["afrad"];
            arrObjDasteh = objNatijeh["dasteh"];
            vasileh = 0; // برای اینکه تابع "تغییر وسیله" در صورت تغییر این متغیر کار میکند
            taghirVasilehSBT(document.querySelector("#vasilehSBTK .gozinehENT"));

            /* دسته بندی ثبت ورودی */
            var lmnSelectDastehBandi = document.getElementById("dastehSBTV");
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
        }
    };
    xhttp.open("POST", "./ajax/gereften-etelaat-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrSBTK"));
    namayeshLoading(document.getElementById("kadrSBTV"));
}

/*      ثبت واریزی      */
function sabtVarizi(noe)
{
    var strQ = "khoroojiAst=" + noe;

    if (noe === 1)
    {
        var noeID = document.getElementById("noeSBTK").dataset.value.toString();
        var vasilehID = document.getElementById("vasilehSBTK").dataset.value.toString();
        var dastehID = document.getElementById("dastehSBTK").value.toString();
        var fard = document.getElementById("varizBeSBTK").value.toString();
        var rooz = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[0].value.toString();
        var mah = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[1].value.toString();
        var sal = document.querySelectorAll("#tarikhSBTK>input.txtTarikh")[2].value.toString();
        var mablagh = document.getElementById("mablaghSBTK").value.toString();
        var tozih = document.getElementById("tozihSBTK").value.toString();

        if (!check(noeID, "^[1-2]$") || !check(vasilehID, "^[1-5]$")) {
            namayeshPeygham("لطفا فیلد هارا برسی کرده، و مجددا تلاش کنید.");
            return;
        }
        strQ += "&noeID=" + noeID + "&vasilehID=" + vasilehID;
    }
    else if (noe === 0)
    {
        var dastehID = document.getElementById("dastehSBTV").value.toString();
        var fard = document.getElementById("varizKonandehSBTV").value.toString();
        var rooz = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[0].value.toString();
        var mah = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[1].value.toString();
        var sal = document.querySelectorAll("#tarikhSBTV>input.txtTarikh")[2].value.toString();
        var mablagh = document.getElementById("mablaghSBTV").value.toString();
        var tozih = document.getElementById("tozihSBTV").value.toString();
    }
    else return;

    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    strQ += "&hesabID=" + hesabID;

    if (!check(dastehID, "^[1-9]+[0-9]*$") || !check(fard, "^[1-9]+[0-9]*$")) {
        namayeshPeygham("لطفا فیلد هارا برسی کرده، و مجددا تلاش کنید.");
        return;
    }
    strQ += "&dastehID=" + dastehID + "&fard=" + fard;

    if (!check(rooz, "^(0?[1-9]|[1-2][0-9]|3[0-1])$")) {
        namayeshPeygham("روز اشتباه است.");
        return;
    }
    strQ += "&rooz=" + rooz;

    if (!check(mah, "^(0?[1-9]|1[0-2])$")) {
        namayeshPeygham("ماه اشتباه است.");
        return;
    }
    strQ += "&mah=" + mah;

    if (!check(sal, "^[1-9][0-9]{3}$")) {
        namayeshPeygham("سال اشتباه است.");
        return;
    }
    strQ += "&sal=" + sal;

    if (!check(mablagh, "^[1-9][0-9]*$")) {
        namayeshPeygham("مبلغ اشتباه است.");
        return;
    }
    strQ += "&mablagh=" + mablagh;
    strQ += "&tozih=" + tozih;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrSBTK"));
            var natijeh = this.responseText;
            if (natijeh === "ok")
            {
                flash("واریز با موفقیت ثبت شد.");
                if (noe === 1)
                {
                    document.getElementById("mablaghSBTK").value = "";
                    document.getElementById("tozihSBTK").value = "";
                    document.getElementById("mablaghSBTK").parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = "";
                }
                else
                {
                    document.getElementById("mablaghSBTV").value = "";
                    document.getElementById("tozihSBTV").value = "";
                    document.getElementById("mablaghSBTV").parentElement.getElementsByClassName("mablaghSBT")[0].innerHTML = "";
                }
            }
            else namayeshPeygham("ثبت با خطا مواجه شد، لطفا پس از بررسی فیلد ها مجددا تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-varizi.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrSBTK"));
}

/*      تابع تغییر دسته بندی، در فیلتر صورتحساب      */
function taghirDastehFSRT(...noe)
{
    var lmnSelect = document.getElementById("dastehSBTK");
    lmnSelect.innerHTML = "<option value='hameh'>-</option>";

    for (let i=0; i<arrObjDasteh.length; i++)
    {
        if (Number(arrObjDasteh[i]["noe"]) === 0 || noe.indexOf(Number(arrObjDasteh[i]["noe"])) >= 0)
        {
            let option = document.createElement("option");
            option.value = arrObjDasteh[i]["id"];
            option.innerHTML = arrObjDasteh[i]["onvan"];
            lmnSelect.appendChild(option);
        }
    }
}

var khorojiAst = "hameh";  // پیشفرض: همه
/*      تغییر خروجی و ورودی، در فیلتر صورتحساب      */
function taghirKVFSRT(lmn)
{
    var noe = lmn.parentElement.dataset.value;
    if (noe === khorojiAst) return;
    khorojiAst = noe;

    var lmnNoe = document.getElementById("noeSBTK").parentElement;
    var lmnVasileh = document.getElementById("vasilehSBTK").parentElement;
    var lmnVarizKonandeh = document.getElementById("varizKonandehSBTV").parentElement;
    var lmnVarizBe = document.getElementById("varizBeSBTK").parentElement;

    if (noe === "hameh")
    {
        lmnNoe.style.display = "none";
        lmnVasileh.style.display = "none";
        lmnVarizKonandeh.style.display = "none";
        lmnVarizBe.style.display = "none";
        taghirDastehFSRT(1);
    }
    else if (Number(noe) === 1)
    {
        lmnNoe.style.display = "block";
        taghirENT(lmnNoe.getElementsByClassName("gozinehENT")[0]);
        taghirNoeFSRT(lmnNoe.getElementsByClassName("gozinehENT")[0]);
        lmnVarizKonandeh.style.display = "none";
        taghirDastehFSRT(1,2);
    }
    else if (Number(noe) === 0)
    {
        lmnNoe.style.display = "none";
        lmnVasileh.style.display = "none";
        lmnVarizKonandeh.style.display = "block";
        lmnVarizBe.style.display = "none";
        taghirDastehFSRT(1,3);
    }
}

var noeFSRT = "hameh";  // پیشفرض: همه
/*      تغییر نوع واریزی      */
function taghirNoeFSRT(lmn)
{
    if (noeFSRT === lmn.parentElement.dataset.value) return;
    noeFSRT = lmn.parentElement.dataset.value;
    var lmnVasileh = document.getElementById("vasilehSBTK");

    if (Number(noeFSRT) === 1)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="hameh" href="javascript:void(0);">همه</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="2 href="javascript:void(0);">عابر بانک</a>';

        lmnVasileh.parentElement.style.display = "block";
        taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
        taghirVasilehFSRT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    }
    else if (Number(noeFSRT) === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="3" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="4" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="5" href="javascript:void(0);">پرداخت</a>';

        lmnVasileh.parentElement.style.display = "block";
        taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
        taghirVasilehFSRT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    }
    else lmnVasileh.parentElement.style.display = "none";
}

var vasilehFSRT = "hameh";  // پیشفرض: همه
/*      تغییر وسیله پرداخت      */
function taghirVasilehFSRT(lmn)
{
    if (vasilehFSRT === lmn.parentElement.dataset.value) return;
    vasilehFSRT = lmn.parentElement.dataset.value;

    if (Number(vasilehFSRT) === 5) taghirDastehFSRT(4);
    else taghirDastehFSRT(1,2);

    if (Number(vasilehFSRT) === 3 || Number(vasilehFSRT) === 4) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
    else document.getElementById("varizBeSBTK").parentElement.style.display = "none";
}

/*      تغییر دادن حساب در صورتحساب      */
function tavizHesabSRT(lmn)
{
    var hesabID = Number(lmn.value);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrFilterSoorathesab"));

            var objNatijeh = JSON.parse(this.responseText);
            var arrAfrad = objNatijeh["afrad"];
            khorojiAst = 0; // برای اینکه تابع "تغییر KV" در صورت تغییر این متغیر کار میکند
            arrObjDasteh = objNatijeh["dasteh"];
            taghirENT(document.querySelector("#khoroojiAstSBTK .gozinehENT"));
            taghirKVFSRT(document.querySelector("#khoroojiAstSBTK .gozinehENT"));

            /* واریز کننده ها */
            var option, lmnSelect = document.getElementById("varizKonandehSBTV");
            lmnSelect.innerHTML = "<option value='hameh'>-</option>";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (Number(arrAfrad[i]["noe"]) <= 1 || Number(arrAfrad[i]["noe"]) === 3)
                {
                    option = document.createElement("option");
                    option.value = arrAfrad[i]["id"];
                    option.innerHTML = arrAfrad[i]["nam"];
                    lmnSelect.appendChild(option);
                }
            }

            /* واریز به ها */
            lmnSelect = document.getElementById("varizBeSBTK");
            lmnSelect.innerHTML = "<option value='hameh'>-</option>";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (Number(arrAfrad[i]["noe"]) <= 2)
                {
                    option = document.createElement("option");
                    option.value = arrAfrad[i]["id"];
                    option.innerHTML = arrAfrad[i]["nam"];
                    lmnSelect.appendChild(option);
                }
            }

            emalFilterSRT();
        }
    };
    xhttp.open("POST", "./ajax/gereften-etelaat-hesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrFilterSoorathesab"));
}

/*      تابع اعمال فیلتر صورتحساب      */
function emalFilterSRT()
{
    var fard, noeVariz = document.getElementById("khoroojiAstSBTK").dataset.value.trim().toString();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var strQ = "noeVariz=" + noeVariz + "&hesabID=" + hesabID;

    if (Number(noeVariz) === 1)
    {
        var noe = document.getElementById("noeSBTK").dataset.value.trim().toString();
        strQ += "&noe=" + noe;

        if (noe !== "hameh")
        {
            var vasileh = document.getElementById("vasilehSBTK").dataset.value.trim().toString();
            strQ += "&vasileh=" + vasileh;
            if (Number(vasileh) === 3 || Number(vasileh) === 4)
            {
                fard = document.getElementById("varizBeSBTK").value.trim().toString();
                strQ += "&fard=" + fard;
            }
        }
    }
    else if (Number(noeVariz) === 0)
    {
        fard = document.getElementById("varizKonandehSBTV").value.trim().toString();
        strQ += "&fard=" + fard;
    }

    var dastehID = document.getElementById("dastehSBTK").value.trim().toString();
    var rooz = document.querySelectorAll("#tarikhSBTK>input")[0].value.trim().toString();
    var mah = document.querySelectorAll("#tarikhSBTK>input")[1].value.trim().toString();
    var sal = document.querySelectorAll("#tarikhSBTK>input")[2].value.trim().toString();
    var mablagh = document.getElementById("mablaghSBTK").value.trim().toString();
    var tozih = document.getElementById("tozihSBTK").value.trim().toString();

    if (!check(rooz, "^(|0?[1-9]|[1-2][0-9]|3[0-1])$")) {
        namayeshPeygham("روز اشتباه است.");
    }

    if (!check(mah, "^(|0?[1-9]|1[0-2])$")) {
        namayeshPeygham("ماه اشتباه است.");
    }

    if (!check(sal, "^(|[1-9][0-9]{3})$")) {
        namayeshPeygham("سال اشتباه است.");
    }

    if (!check(mablagh, "^(|[1-9][0-9]*)$")) {
        namayeshPeygham("مبلغ اشتباه است.");
    }

    strQ += "&dastehID=" + dastehID + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh + "&tozih=" + tozih;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrSoorathesab"));
            var arrObjEtelaat = JSON.parse(this.responseText);
            var tarikh = "";
            var lmnKadr = document.getElementById("kadrSoorathesab");
            lmnKadr.innerHTML = "";

            /*  آمار و اطلاعات فیلتر  */
            document.getElementById("tedadNataiejSRT").innerHTML = momayezdar(arrObjEtelaat.length);
            var tedadKhorooji = 0;
            var tedadVoroodi = 0;
            var meghdarKhorooji = 0;
            var meghdarVoroodi = 0;

            /*  آیتم های صورت حساب  */
            for (let i=0; i<arrObjEtelaat.length; i++)
            {
                /*  افتادن تاریخ هنگام عوض شدن  */
                if (arrObjEtelaat[i]["tarikh"] !== tarikh)
                {
                    tarikh = arrObjEtelaat[i]["tarikh"];
                    var lmnTarikh = document.createElement("div");
                    lmnTarikh.setAttribute("class", "kadrSatrTarikh");
                    lmnTarikh.innerHTML = "<a href='javascript:void(0);' onclick='tanzimTarikhSoorathesab(this);' class='satrTarikh'>"+ tarikh +"</a>";
                    lmnKadr.appendChild(lmnTarikh);
                }

                var strHTML = '<div class="kadrSTB '+ (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1 ? "khorooji" : "voroodi") +'">\n' +
                    '               <div class="headerSTB">\n' +
                    '                    <div class="kadrEtelaatSTB">';

                if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1)
                {
                    tedadKhorooji++;
                    meghdarKhorooji += Number(arrObjEtelaat[i]["mablagh"]);
                    strHTML += '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">نوع:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB">'+ (Number(arrObjEtelaat[i]["noeID"]) === 1 ? "برداشت با کارت" : "اینترنتی") +'</div>\n' +
                        '</div>\n' +
                        '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">وسیله:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB">'+ arrObjEtelaat[i]["vasileh"] + '</div>\n' +
                        '</div>';

                    if (Number(arrObjEtelaat[i]["vasilehID"]) === 3 || Number(arrObjEtelaat[i]["vasilehID"]) === 4)
                    {
                        strHTML += '<div class="etelaatSTB">\n' +
                            '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز به:</span></div>\n' +
                            '    <div class="meghdarEtelaatSTB fardSTB">'+ arrObjEtelaat[i]["nam"] +'</div>\n' +
                            '</div>';
                    }
                }
                else if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 0)
                {
                    tedadVoroodi++;
                    meghdarVoroodi += Number(arrObjEtelaat[i]["mablagh"]);
                    strHTML += '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز کننده:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB fardSTB">'+ arrObjEtelaat[i]["nam"] +'</div>\n' +
                        '</div>';
                }

                strHTML += '<div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">دسته:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB dastehSTB">'+ arrObjEtelaat[i]["onvan"] +'</div>\n' +
                    '                </div>\n' +
                    '                <div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">تاریخ:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB tarikhSTB">'+ arrObjEtelaat[i]["tarikh"] +'</div>\n' +
                    '                </div>\n' +
                    '                <div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">مبلغ:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB mablaghSTB">'+ momayezdar(arrObjEtelaat[i]["mablagh"]) +'</div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="kadrEmkanatSTB">\n' +
                    '                <a href="javascript:void(0);" class="emkanatSTB btnHazfSTB"></a>\n' + // در تابع "شماره بندی" onclick مقدار دهی میشود
                    '                <a href="javascript:void(0);" onclick="virayeshSRT(this);" class="emkanatSTB btnVirayeshSTB"></a>\n' +
                    '            </div>\n' +
                    '        </div>' +
                    '        <div class="kadrTozihSTB">\n' +
                    '            <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">توضیحات:</span></div>\n' +
                    '            <div class="meghdarEtelaatSTB tozihSTB">'+ arrObjEtelaat[i]["tozih"] +'</div>\n' +
                    '        </div>' +
                    '    </div>\n' +
                    '    <a onclick="entekhabSTB(this);" class="emkanatSTB btnSelectSTB" data-vaziat="0"></a>';

                var lmn = document.createElement("div");
                lmn.setAttribute("class", "kadrDorSTB");
                lmn.dataset.vaziat = "0";
                lmn.dataset.id = arrObjEtelaat[i]["id"];
                lmn.dataset.khoroojiAst = arrObjEtelaat[i]["khoroojiAst"];
                lmn.dataset.noe = arrObjEtelaat[i]["noeID"];
                lmn.dataset.vasilehId = arrObjEtelaat[i]["vasilehID"];
                lmn.dataset.fardId = arrObjEtelaat[i]["fardID"];
                lmn.dataset.dastehId = arrObjEtelaat[i]["dastehID"];
                lmn.innerHTML = strHTML;
                lmnKadr.appendChild(lmn);
            }

            document.getElementById("tedadKhoroojiSRT").innerHTML = momayezdar(tedadKhorooji);
            document.getElementById("tedadVoroodiSRT").innerHTML = momayezdar(tedadVoroodi);
            document.getElementById("meghdarKhoroojiSRT").innerHTML = momayezdar(meghdarKhorooji);
            document.getElementById("meghdarVoroodiSRT").innerHTML = momayezdar(meghdarVoroodi);
            document.getElementById("tarazSRT").innerHTML = momayezdar(meghdarVoroodi - meghdarKhorooji);
            shomarehBandiItemhayeSRT();
        }
    };
    xhttp.open("POST", "./ajax/gereftan-soorathesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrSoorathesab"));
}

/*      حذف یک صورتحساب      */
function hazfSoorathesab(shom)
{
    bastanPeygham();
    var lmn = document.getElementsByClassName("kadrDorSTB")[shom];
    if (Number(lmn.dataset.vaziat) === 1) return;

    namayeshLoading(lmn);
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var id = Number(lmn.dataset.id);
    var khoroojiAst = Number(lmn.dataset.khoroojiAst);
    var mablagh = hazfMomayez(lmn.getElementsByClassName("mablaghSTB")[0].innerHTML);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (this.responseText === "ok")
            {
                flash("حذف با موفقیت انجام شد.");
                var taraz = document.getElementById("tarazSRT");
                var tedadNataiej = document.getElementById("tedadNataiejSRT");
                tedadNataiej.innerHTML = momayezdar(hazfMomayez(tedadNataiej.innerHTML)-1);

                if (khoroojiAst === 1)
                {
                    var tedadKhorooji = document.getElementById("tedadKhoroojiSRT");
                    var meghdarKhorooji = document.getElementById("meghdarKhoroojiSRT");
                    tedadKhorooji.innerHTML = momayezdar(hazfMomayez(tedadKhorooji.innerHTML) - 1);
                    meghdarKhorooji.innerHTML = momayezdar(hazfMomayez(meghdarKhorooji.innerHTML) - mablagh);
                    taraz.innerHTML = momayezdar(hazfMomayez(taraz.innerHTML) + mablagh);
                }
                else if (khoroojiAst === 0)
                {
                    var tedadVoroodi = document.getElementById("tedadVoroodiSRT");
                    var meghdarVoroodi = document.getElementById("meghdarVoroodiSRT");
                    tedadVoroodi.innerHTML = momayezdar(hazfMomayez(tedadVoroodi.innerHTML) - 1);
                    meghdarVoroodi.innerHTML = momayezdar(hazfMomayez(meghdarVoroodi.innerHTML) - mablagh);
                    taraz.innerHTML = momayezdar(hazfMomayez(taraz.innerHTML) - mablagh);
                }

                if (lmn.nextElementSibling.className !== "kadrDorSTB" && lmn.previousElementSibling.className !== "kadrDorSTB")
                    lmn.previousElementSibling.remove();
                lmn.remove();
                shomarehBandiItemhayeSRT();
            }
            else namayeshPeygham("حذف با خطا مواجه شد، لطفا دوباره تلاش کنید!");
        }
    };
    xhttp.open("POST", "./ajax/hazf-soorathesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&hesabID="+hesabID+"&tk="+tkn);
}

/*      شماره بندی آیتم های صورتحساب      */
function shomarehBandiItemhayeSRT()
{
    var arrlmn = document.getElementsByClassName("btnHazfSTB");
    for (let i=0; i<arrlmn.length; i++) arrlmn[i].setAttribute("onclick", "namayeshPeygham('آیا برای حذف اطمینان دارید؟', 1, 'hazfSoorathesab("+i+")');");
}

var tedadSelect = 0, tedadKhoroojiSLT = 0, tedadVoroodiSLT = 0, meghdarKhoroojiSLT = 0, meghdarVoroodiSLT = 0, tarazSLT = 0;
/*      سلکت کردن صورتحساب ها      */
function entekhabSTB(lmn)
{
    var lmnAmar = document.getElementById("kadrAmarSelect");
    var mablagh = hazfMomayez(lmn.parentElement.getElementsByClassName("mablaghSTB")[0].innerHTML);

    if (Number(lmn.dataset.vaziat) === 0)
    {
        tedadSelect++;
        lmn.innerHTML = "";
        lmn.dataset.vaziat = "1";
        lmn.parentElement.dataset.vaziat = "1";
        lmnAmar.style.bottom = "10px";
        if (lmn.parentElement.querySelector(".kadrSTB.khorooji"))
        {
            tedadKhoroojiSLT++;
            meghdarKhoroojiSLT += mablagh;
            tarazSLT -= mablagh;
        }
        else if (lmn.parentElement.querySelector(".kadrSTB.voroodi"))
        {
            tedadVoroodiSLT++;
            meghdarVoroodiSLT += mablagh;
            tarazSLT += mablagh;
        }
    }
    else
    {
        tedadSelect--;
        lmn.innerHTML = "";
        lmn.dataset.vaziat = "0";
        lmn.parentElement.dataset.vaziat = "0";
        if (tedadSelect === 0) lmnAmar.style.bottom = "-51px";
        if (lmn.parentElement.querySelector(".kadrSTB.khorooji"))
        {
            tedadKhoroojiSLT--;
            meghdarKhoroojiSLT -= mablagh;
            tarazSLT += mablagh;
        }
        else if (lmn.parentElement.querySelector(".kadrSTB.voroodi"))
        {
            tedadVoroodiSLT--;
            meghdarVoroodiSLT -= mablagh;
            tarazSLT -= mablagh;
        }
    }

    document.getElementById("tedadSelect").innerHTML = momayezdar(tedadSelect);
    document.getElementById("tedadKoroojiSelect").innerHTML = momayezdar(tedadKhoroojiSLT);
    document.getElementById("tedadVoroodiSelect").innerHTML = momayezdar(tedadVoroodiSLT);
    document.getElementById("meghdarKoroojiSelect").innerHTML = momayezdar(meghdarKhoroojiSLT);
    document.getElementById("meghdarVoroodiSelect").innerHTML = momayezdar(meghdarVoroodiSLT);
    document.getElementById("tarazSelect").innerHTML = momayezdar(tarazSLT);

    if (document.querySelectorAll("a.btnSelectSTB[data-vaziat='0']").length === 0) document.getElementById("btnSelectAll").innerHTML = "";
    else document.getElementById("btnSelectAll").innerHTML = "";
}

/*      دی سلکت کردن صورتحساب ها      */
function laghvSelect()
{
    var arrLmn = document.querySelectorAll("a.btnSelectSTB[data-vaziat='1']");
    for (let i=0; i<arrLmn.length; i++) entekhabSTB(arrLmn[i]);
}

/*      سلکت کردن همه صورتحساب ها      */
function selectAllSRT()
{
    var arrLmn = document.querySelectorAll("a.btnSelectSTB[data-vaziat='0']");
    if (arrLmn.length === 0) laghvSelect();
    else for (let i=0; arrLmn.length; i++) entekhabSTB(arrLmn[i]);
}

/*      حذف صورتحساب های سلکت شده      */
function hazfSoorathesabSelectShodeh()
{
    bastanPeygham();
    var arrLmn = document.querySelectorAll(".kadrDorSTB[data-vaziat='1']");
    if (arrLmn.length === 0) return;

    namayeshLoading(document.getElementById("kadrSoorathesab"));
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var arrObjEtelaat = [], arrId = [];
    for (let i=0; i<arrLmn.length; i++)
    {
        arrId.push(Number(arrLmn[i].dataset.id));
        arrObjEtelaat.push({
            id : Number(arrLmn[i].dataset.id),
            khoroojiAst : Number(arrLmn[i].dataset.khoroojiAst),
            mablagh : hazfMomayez(arrLmn[i].getElementsByClassName("mablaghSTB")[0].innerHTML)
        });
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrSoorathesab"));
            var arrNatijeh = JSON.parse(this.responseText);
            var lmnTaraz = document.getElementById("tarazSRT");
            var lmnTedadNataiej = document.getElementById("tedadNataiejSRT");
            var lmnTedadKhorooji = document.getElementById("tedadKhoroojiSRT");
            var lmnMeghdarKhorooji = document.getElementById("meghdarKhoroojiSRT");
            var lmnTedadVoroodi = document.getElementById("tedadVoroodiSRT");
            var lmnMeghdarVoroodi = document.getElementById("meghdarVoroodiSRT");
            var tedadMovafaghiat = 0, tedadKhorooji = 0, tedadVoroodi = 0, mablaghKhorooji = 0, mablaghVoroodi = 0;

            for (let i=0; i<arrNatijeh.length; i++)
            {
                if (arrNatijeh[i] === "ok")
                {
                    tedadMovafaghiat++;
                    if (arrObjEtelaat[i]["khoroojiAst"] === 1)
                    {
                        tedadKhorooji++;
                        mablaghKhorooji += arrObjEtelaat[i]["mablagh"];
                    }
                    else if (arrObjEtelaat[i]["khoroojiAst"] === 0)
                    {
                        tedadVoroodi++;
                        mablaghVoroodi += arrObjEtelaat[i]["mablagh"];
                    }

                    if (arrLmn[i].nextElementSibling.className !== "kadrDorSTB" && arrLmn[i].previousElementSibling.className !== "kadrDorSTB")
                        arrLmn[i].previousElementSibling.remove();

                    entekhabSTB(arrLmn[i]);
                    arrLmn[i].remove();
                }
            }

            lmnTedadNataiej.innerHTML = momayezdar(hazfMomayez(lmnTedadNataiej.innerHTML) - tedadMovafaghiat);
            lmnTedadKhorooji.innerHTML = momayezdar(hazfMomayez(lmnTedadKhorooji.innerHTML) - tedadKhorooji);
            lmnMeghdarKhorooji.innerHTML = momayezdar(hazfMomayez(lmnMeghdarKhorooji.innerHTML) - mablaghKhorooji);
            lmnTedadVoroodi.innerHTML = momayezdar(hazfMomayez(lmnTedadVoroodi.innerHTML) - tedadVoroodi);
            lmnMeghdarVoroodi.innerHTML = momayezdar(hazfMomayez(lmnMeghdarVoroodi.innerHTML) - mablaghVoroodi);
            lmnTaraz.innerHTML = momayezdar(hazfMomayez(lmnTaraz.innerHTML) - mablaghVoroodi + mablaghKhorooji);
            shomarehBandiItemhayeSRT();

            if (tedadMovafaghiat === arrNatijeh.length) flash(tedadMovafaghiat + " مورد با موفقیت حذف شد.");
            else namayeshPeygham("حذف " + tedadMovafaghiat + " مورد موفقیت آمیز بود، و " + (arrNatijeh.length - tedadMovafaghiat) + " مورد ناموفق بود. (نا موفق ها سلکت شده باقی مانده اند)");
        }
    };
    xhttp.open("POST", "./ajax/hazf-soorathesab-select.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ai="+JSON.stringify(arrId)+"&hesabID="+hesabID+"&tk="+tkn);
}

/*      تنظیم یک تاریخ خاص در صورتحساب      */
function tanzimTarikhSoorathesab(lmn)
{
    var tarikh = lmn.innerHTML;
    document.querySelectorAll("#tarikhSBTK>input")[0].value = tarikh.substr(8,2);
    document.querySelectorAll("#tarikhSBTK>input")[1].value = tarikh.substr(5,2);
    document.querySelectorAll("#tarikhSBTK>input")[2].value = tarikh.substr(0,4);
    emalFilterSRT();
}

/*      باز کردن کادر ویرایش صورتحساب      */
function virayeshSRT(lmn)
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var lmnKadr = lmn.parentElement.parentElement.parentElement.parentElement;
    var id = Number(lmnKadr.dataset.id);
    var khoroojiAst = Number(lmnKadr.dataset.khoroojiAst);
    var noe = Number(lmnKadr.dataset.noe);
    var vasilehId = Number(lmnKadr.dataset.vasilehId);
    var fardId = Number(lmnKadr.dataset.fardId);
    var dastehId = Number(lmnKadr.dataset.dastehId);
    var tarikh = lmnKadr.getElementsByClassName("tarikhSTB")[0].innerHTML.trim();
    var mablagh = hazfMomayez(lmnKadr.getElementsByClassName("mablaghSTB")[0].innerHTML);
    var tozih = lmnKadr.getElementsByClassName("tozihSTB")[0].innerHTML.trim();

    var strHTML = '<div id="kadrNamayeshVSRT">\n' +
        '        <a id="kadrPoshtVSRT" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '        <div id="kadrVSRT">\n' +
        '            <div>\n' +
        '                <div id="titrVSRT"><span class="icon"></span><span class="matnTitr">ویرایش صورتحساب</span></div>\n' +
        '                <div id="noeVarizVSRT" data-khorooji-ast="'+ khoroojiAst +'">'+ (khoroojiAst===1?"خروجی":"ورودی") +'</div>\n';

    if (khoroojiAst === 1)
    {
        strHTML += '<div class="etelaatVSRT" id="khoroojiVSRT">\n' +
            '                    <div class="etelaatSBT">\n' +
            '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>\n' +
            '                        <div class="kadrENT" id="noeVSRT">\n' +
            '                            <span class="kadrPoshtENT"></span>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeSBT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="etelaatSBT">\n' +
            '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">وسیله:</span></div>\n' +
            '                        <div class="kadrENT" id="vasilehVSRT">\n' +
            '                            <span class="kadrPoshtENT"></span>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="etelaatSBT" style="display:none;">\n' +
            '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز به:</span></div>\n' +
            '                        <select name="varizBe" id="varizBeVSRT">';

        for (let i=0; i<arrObjAfrad.length; i++)
        {
            if (Number(arrObjAfrad[i]["noe"]) <= 2)
                strHTML += '<option value="'+ arrObjAfrad[i]["id"] +'" '+ (Number(arrObjAfrad[i]["id"])===fardId?"selected":"") +'>'+ arrObjAfrad[i]["nam"] +'</option>';
        }

        strHTML += '</select></div>\n';
    }
    else
    {
        strHTML += '<div class="etelaatVSRT" id="voroodiVSRT">' +
            '    <div class="etelaatSBT">\n' +
            '        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز کننده:</span></div>\n' +
            '        <select name="varizKonandeh" id="varizKonandehVSRT">';

        for (let i=0; i<arrObjAfrad.length; i++)
        {
            if (Number(arrObjAfrad[i]["noe"]) <= 1 || Number(arrObjAfrad[i]["noe"]) === 3)
                strHTML += '<option value="'+ arrObjAfrad[i]["id"] +'" '+ (Number(arrObjAfrad[i]["id"])===fardId?"selected":"") +'>'+ arrObjAfrad[i]["nam"] +'</option>';
        }

        strHTML += '</select></div>\n';
    }

    strHTML += '<div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">دسته:</span></div>\n' +
        '                        <select name="dasteh" id="dastehVSRT">';

    for (let i=0; i<arrObjDasteh.length; i++)
    {
        if ((khoroojiAst === 1 && Number(arrObjDasteh[i]["noe"]) <= 2) || (khoroojiAst === 0 && (Number(arrObjDasteh[i]["noe"]) <= 1 || Number(arrObjDasteh[i]["noe"]) === 3)))
            strHTML += '<option value="'+ arrObjDasteh[i]["id"] +'" '+ (Number(arrObjDasteh[i]["id"])===dastehId?"selected":"") +'>'+ arrObjDasteh[i]["onvan"] +'</option>';
    }

    strHTML += '</select>\n' +
        '                    </div>\n' +
        '                    <div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>\n' +
        '                        <div class="kadrTarikhSBT" id="tarikhVSRT">\n' +
        '                            <input type="text" class="txtTarikh" name="rooz" value="'+ tarikh.substr(8,2) +'" onfocus="this.select();" maxlength="2" placeholder="روز"/>\n' +
        '                            <input type="text" class="txtTarikh" name="mah" value="'+ tarikh.substr(5,2) +'" onfocus="this.select();" maxlength="2" placeholder="ماه"/>\n' +
        '                            <input type="text" class="txtTarikh" name="sal" value="'+ tarikh.substr(0,4) +'" onfocus="this.select();" maxlength="4" placeholder="سال"/>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">مبلغ:</span></div>\n' +
        '                        <input type="text" class="txtMablagh" id="mablaghVSRT" name="mablagh" value="'+ mablagh +'" maxlength="10" placeholder="به ریال"/>\n' +
        '                    </div>\n' +
        '                    <div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیخات:</span></div>\n' +
        '                        <input type="text" class="txtTozih" id="tozihVSRT" name="tozih" value="'+ tozih +'" placeholder="اختیاری"/>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <span id="kadrDokmehVSRT">\n' +
        '                    <a class="dokmehTL dokmehTaeed" onclick="sabtVirayeshSRT('+id+');" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>\n' +
        '                    <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>\n' +
        '                </span>' +
        '</div></div></div>';

    var lmnVirayesh = document.createElement("div");
    lmnVirayesh.setAttribute("id", "CountainerKadrViraieshSRT");
    lmnVirayesh.innerHTML = strHTML;
    document.body.appendChild(lmnVirayesh);
    lmnVirayesh.onkeydown = function(e){if (e.keyCode === 13) sabtVirayeshSRT(id);};
}

/*      ثبت ویرایش صورتحساب      */
function sabtVirayeshSRT(id)
{

}