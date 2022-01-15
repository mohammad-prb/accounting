/*      تنظیم صفحه بعد از لود کامل      */
function tanzimSaf()
{
    var lmnENT = document.getElementsByClassName("kadrENT");
    for (let i=0; i<lmnENT.length; i++) taghirENT(lmnENT[i].getElementsByClassName("gozinehENT")[0]);
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
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">عابر بانک</a>';
    }
    else if (noe === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="4" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="5" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehSBT(this);" data-value="6" href="javascript:void(0);">پرداخت</a>';
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

    let option = document.createElement("option");
    option.value = 0;
    option.innerHTML = "دیگر...";
    lmnDasteh.appendChild(option);

    if (vasileh === 4 || vasileh === 5) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
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
            var arrAfrad = objNatijeh["afrad"];
            vasileh = 0; // برای اینکه تابع "تغییر وسیله" در صورت تغییر این متغیر کار میکند
            arrObjDasteh = objNatijeh["dasteh"];
            taghirVasilehSBT(document.querySelector("#vasilehSBTK .gozinehENT"));

            /* دسته بندی ثبت ورودی */
            var lmnSelectDastehBandi = document.getElementById("dastehSBTV");
            lmnSelectDastehBandi.innerHTML = "";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (Number(arrObjDasteh[i]["noe"]) === 1 || Number(arrObjDasteh[i]["noe"]) === 3)
                {
                    var option = document.createElement("option");
                    option.value = arrObjDasteh[i]["id"];
                    option.innerHTML = arrObjDasteh[i]["onvan"];
                    lmnSelectDastehBandi.appendChild(option);
                }
            }
            option = document.createElement("option");
            option.value = "1";
            option.innerHTML = "دیگر...";
            lmnSelectDastehBandi.appendChild(option);

            /* واریز به ها */
            var lmnSelectSBTK = document.getElementById("varizBeSBTK");
            lmnSelectSBTK.innerHTML = "";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (arrAfrad[i]["noe"] <= 2)
                {
                    option = document.createElement("option");
                    option.value = arrAfrad[i]["id"];
                    option.innerHTML = arrAfrad[i]["nam"];
                    lmnSelectSBTK.appendChild(option);
                }
            }

            /* واریز کننده ها */
            var lmnSelectSBTV = document.getElementById("varizKonandehSBTV");
            lmnSelectSBTV.innerHTML = "";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (Number(arrAfrad[i]["noe"]) === 1 || Number(arrAfrad[i]["noe"]) === 3)
                {
                    option = document.createElement("option");
                    option.value = arrAfrad[i]["id"];
                    option.innerHTML = arrAfrad[i]["nam"];
                    lmnSelectSBTV.appendChild(option);
                }
            }

            option = document.createElement("option");
            option.value = "1";
            option.innerHTML = "نامشخص";
            lmnSelectSBTK.appendChild(option);

            option = document.createElement("option");
            option.value = "1";
            option.innerHTML = "نامشخص";
            lmnSelectSBTV.appendChild(option);

            option = document.createElement("option");
            option.value = "2";
            option.innerHTML = "دیگران...";
            lmnSelectSBTK.appendChild(option);

            option = document.createElement("option");
            option.value = "2";
            option.innerHTML = "دیگران...";
            lmnSelectSBTV.appendChild(option);
        }
    };
    xhttp.open("POST", "ajax/gereften-etelaat-hesab.php?sid="+Math.random(), true);
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

        if (!check(noeID, "^[1-2]$") || !check(vasilehID, "^[1-6]$")) {
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
    xhttp.open("POST", "ajax/sabt-varizi.php?sid="+Math.random(), true);
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
        if (noe.indexOf(Number(arrObjDasteh[i]["noe"])) >= 0)
        {
            let option = document.createElement("option");
            option.value = arrObjDasteh[i]["id"];
            option.innerHTML = arrObjDasteh[i]["onvan"];
            lmnSelect.appendChild(option);
        }
    }

    let option = document.createElement("option");
    option.value = "1";
    option.innerHTML = "دیگر...";
    lmnSelect.appendChild(option);
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

    if (noe === "hameh")
    {
        lmnNoe.style.display = "none";
        lmnVasileh.style.display = "none";
        lmnVarizKonandeh.style.display = "none";
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
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">عابر بانک</a>';

        lmnVasileh.parentElement.style.display = "block";
        taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
        taghirVasilehFSRT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    }
    else if (Number(noeFSRT) === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="4" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="5" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="6" href="javascript:void(0);">پرداخت</a>';

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

    if (Number(vasilehFSRT) === 6) taghirDastehFSRT(4);
    else taghirDastehFSRT(1,2);

    if (Number(vasilehFSRT) === 4 || Number(vasilehFSRT) === 5) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
    else document.getElementById("varizBeSBTK").parentElement.style.display = "none";
}