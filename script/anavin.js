/*      گرفتن دسته بندی ها      */
function gereftanDasteh()
{
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
                var lmnKadr = document.getElementById("jadvalDST");
                lmnKadr.innerHTML = "";
                for (let i=0; i<arrObjNatijeh.length; i++)
                {
                    let lmnDasteh = document.createElement("div");
                    lmnDasteh.setAttribute("class", "itemJDST");
                    lmnDasteh.dataset.id = arrObjNatijeh[i]["dastehID"];
                    lmnDasteh.dataset.tartib = arrObjNatijeh[i]["tartib"];
                    lmnDasteh.innerHTML = '<div class="shomJDST"></div>\n' +
                        '<div class="etelaatJDST" data-noe="'+ arrObjNatijeh[i]["noe"] +'">\n' +
                        '    <div class="iconJDST"></div>\n' +
                        '    <div class="onvanJDST" title="">'+ arrObjNatijeh[i]["onvan"] +'</div>\n' +
                        '    <div class="tedadMahJDST">'+ momayezdar(arrObjNatijeh[i]["tedadMah"]) +'</div>\n' +
                        '    <div class="tedadSalJDST">'+ momayezdar(arrObjNatijeh[i]["tedadSal"]) +'</div>\n' +
                        '    <div class="tedadKolJDST">'+ momayezdar(arrObjNatijeh[i]["tedadKol"]) +'</div>\n' +
                        '    <div class="emkanatJDST">\n' +
                        (Number(arrObjNatijeh[i]["noe"]) > 0 ? '<a href="javascript:void(0);" class="btnJDST btnHazfJDST" title="حذف"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="virayeshDST(this);" title="ویرایش"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, false);" title="جابجایی"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="jabejaeiDST(this.parentElement.parentElement.parentElement, true);" title="جابجایی"></a>\n' : "") +
                        '    </div>\n' +
                        '</div>';
                    lmnKadr.appendChild(lmnDasteh);
                }
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

/*      حذف دسته      */
function hazfDST(shom)
{
    bastanPeygham();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var lmn = document.getElementsByClassName("itemJDST")[shom+1]; // بخاطر رد شدن از هدر جدول بعلاوه 1 میشود
    var id = Number(lmn.dataset.id);
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

}

/*      جا به جایی دسته ها      */
function jabejaeiDST(lmn, balaAst)
{
    if (balaAst)
    {
        if (lmn.previousElementSibling)
        {
            var lmnJadid = document.createElement("div");
            lmn.parentElement.insertBefore(lmnJadid, lmn.previousSibling);
            lmn.parentElement.replaceChild(lmn, lmnJadid);
            shomarehBandiDST();
            document.getElementById("kadrTaeedJabejaei").style.bottom = "20px";
        }
    }
    else if (lmn.nextElementSibling && Number(lmn.nextElementSibling.getElementsByClassName("etelaatJDST")[0].dataset.noe) > 0)
        jabejaeiDST(lmn.nextElementSibling, true);
}

/*      تایید جا به جایی      */
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
                flash("جا به جایی ها با موفقیت ثبت شد.");
                for (let i=0; i<arrLmn.length-1; i++) arrLmn[i].dataset.tartib = (i+1);
            }
            else namayeshPeygham("جا به جایی با خطا مواجه شد! لطفا دوباره امتحان کنید.");
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
                    '        <a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="jabejaeiDST(this, false);" title="جابجایی"></a>\n' +
                    '        <a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="jabejaeiDST(this, true);" title="جابجایی"></a>\n' +
                    '    </div>\n' +
                    '</div>';
                arrLmn[1].parentElement.insertBefore(lmnDasteh, arrLmn[(arrLmn.length-1)]);
                shomarehBandiDST();
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