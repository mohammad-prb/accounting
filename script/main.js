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
        document.getElementById("kadrDokmehPeygham").innerHTML = '<a class="dokmehTL dokmehTaeed" onclick="' + tabe + '" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>' +
            '<a class="dokmehTL dokmehLaghv" onclick="bastanPeygham();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>';
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