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

/*      بستن کادر لودینگ      */
function bastanLoading(lmn)
{
    lmn.parentElement.parentElement.style.display = "none";
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

var vasileh = 2;  // پیشفرض:کارتخوان
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