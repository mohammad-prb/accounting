/*      گرفتن دسته بندی ها      */
function gereftanDasteh()
{
    var arrIconNamayesh = ["",""];
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    document.getElementById("kadrTaeedJabejaei").style.bottom = "-81px";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrJadvalDST"));
            if (jsonMotabarAst(this.responseText))
            {
                var arrObjNatijeh = JSON.parse(this.responseText);
                var arrTedad = [0,0,0,0];
                var lmnKadr = document.getElementById("jadvalDST");
                lmnKadr.innerHTML = "";
                for (let i=0; i<arrObjNatijeh.length; i++)
                {
                    arrTedad[Number(arrObjNatijeh[i]["noe"])-1]++;
                    let lmnDasteh = document.createElement("div");
                    lmnDasteh.setAttribute("class", "itemJDST");
                    lmnDasteh.dataset.id = arrObjNatijeh[i]["dastehID"];
                    lmnDasteh.dataset.tartib = arrObjNatijeh[i]["tartib"];
                    lmnDasteh.dataset.namayesh = arrObjNatijeh[i]["namayesh"];
                    lmnDasteh.innerHTML = '<div class="shomJDST"></div>\n' +
                        '<div class="etelaatJDST" data-noe="'+ arrObjNatijeh[i]["noe"] +'">\n' +
                        '    <div class="iconJDST"></div>\n' +
                        '    <div class="onvanJDST" title="">'+ arrObjNatijeh[i]["onvan"] +'</div>\n' +
                        '    <div class="tedadMahJDST makhfiDarMobile">'+ momayezdar(arrObjNatijeh[i]["tedadMah"]) +'</div>\n' +
                        '    <div class="tedadSalJDST makhfiDarMobile">'+ momayezdar(arrObjNatijeh[i]["tedadSal"]) +'</div>\n' +
                        '    <div class="tedadKolJDST makhfiDarMobile">'+ momayezdar(arrObjNatijeh[i]["tedadKol"]) +'</div>\n' +
                        '    <div class="emkanatJDST">\n' +
                        (Number(arrObjNatijeh[i]["noe"]) > 0 ? '<a href="javascript:void(0);" class="btnJDST btnHazfJDST" title="حذف"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="virayeshDST(this);" title="ویرایش"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, false);" title="جابجایی"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, true);" title="جابجایی"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="taghirVaziatNamayeshDST(this);" title="تغییر وضعیت نمایش">'+ arrIconNamayesh[Number(arrObjNatijeh[i]["namayesh"])] +'</a>\n' : "") +
                        '    </div>\n' +
                        '</div>';
                    lmnKadr.appendChild(lmnDasteh);
                }

                var arrLmnTedad = document.querySelectorAll(".tedadDST>span.matnTitr");
                for (let i=0; i<arrLmnTedad.length; i++) arrLmnTedad[i].innerHTML = arrTedad[i];

                taghirNoeDST();
                shomarehBandiDST();
            }
            else namayeshPeygham("دریافت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/gereftan-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrJadvalDST"));
}

/*      تغییر نوع دسته های نمایشی      */
function taghirNoeDST(lmn)
{
    if (lmn !== undefined)
    {
        if (Number(lmn.dataset.vaziat) === 1)
        {
            lmn.dataset.vaziat = "0";
            lmn.childNodes[0].innerHTML = "";
        }
        else
        {
            lmn.dataset.vaziat = "1";
            lmn.childNodes[0].innerHTML = "";
        }
    }

    var arrLmnEtelaat = document.getElementsByClassName("etelaatJDST");
    var arrLmnNoeha = document.getElementsByClassName("rahnama");
    var arrNoeha = [1,
        Number(arrLmnNoeha[0].dataset.vaziat),
        Number(arrLmnNoeha[1].dataset.vaziat),
        Number(arrLmnNoeha[2].dataset.vaziat),
        Number(arrLmnNoeha[3].dataset.vaziat)];

    for (let i=1; i<arrLmnEtelaat.length; i++)
    {
        if (arrNoeha[Number(arrLmnEtelaat[i].dataset.noe)] === 1)
            arrLmnEtelaat[i].parentElement.style.display = "block";
        else
            arrLmnEtelaat[i].parentElement.style.display = "none";
    }
}

/*      تغییر وضعیت نمایش دسته ها      */
function taghirVaziatNamayeshDST(lmn)
{
    var arrIconNamayesh = ["",""];
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var lmnKadr = lmn.parentElement.parentElement.parentElement;
    var id = Number(lmnKadr.dataset.id);
    var vaziatJadid, vaziat = Number(lmnKadr.dataset.namayesh);

    if (vaziat === 1) vaziatJadid = 0;
    else vaziatJadid = 1;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (this.responseText === "ok")
            {
                bastanLoading(document.getElementById("kadrJadvalDST"));
                flash("تغییر وضعیت موفقیت آمیز بود.");
                lmnKadr.dataset.namayesh = vaziatJadid;
                lmn.innerHTML = arrIconNamayesh[vaziatJadid];
            }
            else namayeshPeygham("تغییر وضعیت با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/taghir-vaziat-namayesh-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&id="+id+"&vaziat="+vaziatJadid+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrJadvalDST"));
}

/*      حذف دسته      */
function hazfDST(shom)
{
    bastanPeygham();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var lmn = document.getElementsByClassName("itemJDST")[shom+1]; // بخاطر رد شدن از هدر جدول بعلاوه 1 میشود
    var id = Number(lmn.dataset.id);
    var noe = Number(lmn.getElementsByClassName("etelaatJDST")[0].dataset.noe);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrJadvalDST"));
            if (this.responseText === "ok")
            {
                flash("دسته با موفقیت حذف شد.");
                lmn.remove();
                shomarehBandiDST();
                var lmnTedad = document.querySelectorAll(".tedadDST>span.matnTitr")[noe-1];
                lmnTedad.innerHTML = Number(lmnTedad.innerHTML) - 1;
            }
            else namayeshPeygham("حذف با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/hazf-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrJadvalDST"));
}

/*      ویرایش دسته ها      */
function virayeshDST(lmn)
{
    var onvan = lmn.parentElement.parentElement.getElementsByClassName("onvanJDST")[0].innerHTML.trim();
    var noe = Number(lmn.parentElement.parentElement.dataset.noe);
    var id = Number(lmn.parentElement.parentElement.parentElement.dataset.id);
    var lmnKadr = document.createElement("div");
    lmnKadr.setAttribute("id", "CountainerKadrViraieshDST");
    lmnKadr.innerHTML = '<div id="kadrNamayeshVDST">\n' +
        '            <a id="kadrPoshtVDST" href="javascript:void(0);" onclick="this.parentElement.parentElement.remove();"></a>\n' +
        '            <div id="kadrVDST">\n' +
        '                <div>\n' +
        '                    <div id="titrVDST"><span class="icon"></span><span class="matnTitr">ویرایش دسته</span></div>\n' +
        '                    <div class="etelaatVDST">\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نام دسته:</span></div>\n' +
        '                            <input type="text" class="txtDasteh" id="dastehVDST" name="dasteh" value="'+ onvan +'" autocomplete="off">\n' +
        '                        </div>\n' +
        '                        <div class="etelaatSBT">\n' +
        '                            <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>\n' +
        '                            <div class="kadrENT" id="noeVDST">\n' +
        '                                <span class="kadrPoshtENT"></span>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">خروجی و ورودی</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">خروجی</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="3" href="javascript:void(0);">ورودی</a>\n' +
        '                                <a class="gozinehENT" onclick="taghirENT(this);" data-value="4" href="javascript:void(0);">پرداخت</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <span id="kadrDokmehVDST">\n' +
        '                        <a class="dokmehTL dokmehTaeed" onclick="sabtVirayeshDST('+ id +');" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">تایید</span></a>\n' +
        '                        <a class="dokmehTL dokmehLaghv" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();" href="javascript:void (0);"><span class="icon"></span><span class="matnTitr">انصراف</span></a>\n' +
        '                    </span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';
    document.body.appendChild(lmnKadr);
    taghirENT(lmnKadr.getElementsByClassName("gozinehENT")[noe-1]);
    document.getElementById("dastehVDST").select();
    lmnKadr.onkeydown = function(e){if (e.keyCode === 13) sabtVirayeshDST(id);};
}

/*      ثبت ویرایش دسته      */
function sabtVirayeshDST(id)
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var onvan = document.getElementById("dastehVDST").value.trim().replace(/(<([^>]+)>)/ig, '');
    var noe = document.getElementById("noeVDST").dataset.value;
    var noeGhabli = Number(document.querySelectorAll(".itemJDST[data-id='"+id+"']>.etelaatJDST")[0].dataset.noe);

    if (onvan.length < 1) {
        namayeshPeygham("لطفا نام دسته را پر کنید.");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("CountainerKadrViraieshDST"));
            if (this.responseText === "ok")
            {
                flash("ویرایش موفقیت آمیز بود.");
                document.getElementById("CountainerKadrViraieshDST").remove();
                var lmn = document.querySelector(".itemJDST[data-id='"+id+"']");
                lmn.getElementsByClassName("etelaatJDST")[0].dataset.noe = noe;
                lmn.getElementsByClassName("onvanJDST")[0].innerHTML = onvan;

                var lmnTedadGhabli = document.querySelectorAll(".tedadDST>span.matnTitr")[noeGhabli-1];
                var lmnTedad = document.querySelectorAll(".tedadDST>span.matnTitr")[noe-1];
                lmnTedadGhabli.innerHTML = Number(lmnTedadGhabli.innerHTML) - 1;
                lmnTedad.innerHTML = Number(lmnTedad.innerHTML) + 1;
            }
            else if (this.responseText === "er:noe") namayeshPeygham("تغییر نوع غیر مجاز میباشد! برای این تغییر، باید دسته بندی تمام واریز هایی که قبلا از این دسته استفاده کرده اند تغییر دهید.");
            else if (this.responseText === "er:khorooji") namayeshPeygham("تغییر نوع غیر مجاز میباشد! برای این تغییر، باید دسته بندی تمام واریز های ورودی که قبلا از این دسته استفاده کرده اند تغییر دهید.");
            else if (this.responseText === "er:voroodi") namayeshPeygham("تغییر نوع غیر مجاز میباشد! برای این تغییر، باید دسته بندی تمام واریز های خروجی که قبلا از این دسته استفاده کرده اند تغییر دهید.");
            else namayeshPeygham("ویرایش با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/virayesh-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&id="+id+"&onvan="+onvan+"&noe="+noe+"&tk="+tkn);
    namayeshLoading(document.getElementById("CountainerKadrViraieshDST"));
}

/*      جابجایی دسته ها      */
function jabejaeiDST(lmn, balaAst)
{
    if (balaAst)
    {
        if (lmn.previousElementSibling)
        {
            var lmnJadid = document.createElement("div");
            lmn.parentElement.insertBefore(lmnJadid, lmn.previousElementSibling);
            lmn.parentElement.replaceChild(lmn, lmnJadid);
            shomarehBandiDST();
            document.getElementById("kadrTaeedJabejaei").style.bottom = "20px";
        }
    }
    else if (lmn.nextElementSibling && Number(lmn.nextElementSibling.getElementsByClassName("etelaatJDST")[0].dataset.noe) > 0)
        jabejaeiDST(lmn.nextElementSibling, true);
}

/*      تایید جابجایی      */
function sabtJabejaei()
{
    document.getElementById("kadrTaeedJabejaei").style.bottom = "-81px";
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var arrLmn = document.querySelectorAll("#jadvalDST>.itemJDST");
    var arrTartib = [];
    for (let i=0; i<arrLmn.length-1; i++) arrTartib.push(Number(arrLmn[i].dataset.id));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            if (this.responseText === "ok")
            {
                bastanLoading(document.getElementById("kadrJadvalDST"));
                flash("تغییرات با موفقیت ثبت شد.");
                for (let i=0; i<arrLmn.length-1; i++) arrLmn[i].dataset.tartib = (i+1);
            }
            else namayeshPeygham("تغییرات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/taghir-tartib-dasteha.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("arr="+JSON.stringify(arrTartib)+"&hesabID="+hesabID+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrJadvalDST"));
}

/*      افزودن دسته      */
function sabtDasteh()
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var onvan = document.getElementById("dastehDST").value.trim().replace(/(<([^>]+)>)/ig, '');
    var noe = document.getElementById("noeDST").dataset.value;
    var arrLmn = document.getElementsByClassName("itemJDST");
    var tartib = 1;

    if (onvan.length < 1) {
        namayeshPeygham("لطفا نام دسته را پر کنید.");
        return;
    }

    if (arrLmn.length > 1)
        tartib = Number(arrLmn[arrLmn.length-2].dataset.tartib) + 1;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrJadvalDST"));
            if (this.responseText.substr(0,2) === "ok")
            {
                flash("دسته با موفقیت اضافه شد.");
                document.getElementById("dastehDST").value = "";
                let lmnDasteh = document.createElement("div");
                lmnDasteh.setAttribute("class", "itemJDST");
                lmnDasteh.dataset.id = this.responseText.split(":")[1];
                lmnDasteh.dataset.tartib = tartib;
                lmnDasteh.dataset.namayesh = "1";
                lmnDasteh.innerHTML = '<div class="shomJDST"></div>\n' +
                    '<div class="etelaatJDST" data-noe="'+ noe +'">\n' +
                    '    <div class="iconJDST"></div>\n' +
                    '    <div class="onvanJDST" title="">'+ onvan +'</div>\n' +
                    '    <div class="tedadMahJDST">0</div>\n' +
                    '    <div class="tedadSalJDST">0</div>\n' +
                    '    <div class="tedadKolJDST">0</div>\n' +
                    '    <div class="emkanatJDST">\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnHazfJDST" onclick="namayeshPeygham(\'آیا برای حذف اطمینان دارید؟\', 1, \'hazfDST('+(arrLmn.length-2)+');\')" title="حذف"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="virayeshDST(this);" title="ویرایش"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, false);" title="جابجایی"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, true);" title="جابجایی"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="taghirVaziatNamayeshDST(this);" title="تغییر وضعیت نمایش"></a>' +
                    '    </div>\n' +
                    '</div>';
                arrLmn[1].parentElement.insertBefore(lmnDasteh, arrLmn[(arrLmn.length-1)]);
                shomarehBandiDST();
                var lmnTedad = document.querySelectorAll(".tedadDST>span.matnTitr")[noe-1];
                lmnTedad.innerHTML = Number(lmnTedad.innerHTML) + 1;
            }
            else namayeshPeygham("ثبت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/sabt-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&onvan="+onvan+"&noe="+noe+"&tartib="+tartib+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrJadvalDST"));
}

/*      شماره بندی دسته ها      */
function shomarehBandiDST()
{
    var arrLmn = document.getElementsByClassName("btnHazfJDST");
    for (let i=0; i<arrLmn.length; i++)
    {
        arrLmn[i].parentElement.parentElement.previousElementSibling.innerHTML = i+1;
        arrLmn[i].setAttribute("onclick", "namayeshPeygham('آیا برای حذف اطمینان دارید؟', 1, 'hazfDST("+i+");')");
    }
}