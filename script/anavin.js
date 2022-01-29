/*      گرفتن دسته بندی ها      */
function gereftanDasteh()
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
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
                        '    <div class="tedadMahJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadMah"]) +'</div>\n' +
                        '    <div class="tedadSalJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadSal"]) +'</div>\n' +
                        '    <div class="tedadKolJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadKol"]) +'</div>\n' +
                        '    <div class="emkanatJDST">\n' +
                        (Number(arrObjNatijeh[i]["noe"]) > 0 ? '<a href="javascript:void(0);" class="btnJDST btnHazfJDST" onclick="namayeshPeygham(\'آیا برای حذف اطمینان دارید؟\', 1, \'hazfDST('+i+');\')" title="حذف"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="virayeshDST(this);" title="ویرایش"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="jabejaeiDST(this, 0);" title="جابجایی"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="jabejaeiDST(this, 1);" title="جابجایی"></a>\n' : "") +
                        '    </div>\n' +
                        '</div>';
                    lmnKadr.appendChild(lmnDasteh);
                }
                taghirNoeDST();
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

    shomarehBandiDST();
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

}

/*      افزودن دسته      */
function sabtDasteh()
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var onvan = document.getElementById("dastehDST").value.trim();
    var noe = document.getElementById("noeDST").dataset.value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            
        }
    };
    xhttp.open("POST", "./ajax/sabt-dasteh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&onvan="+onvan+"&noe="+noe+"&tk="+tkn);
}

/*      شماره بندی دسته ها      */
function shomarehBandiDST()
{
    var arrLmn = document.getElementsByClassName("shomJDST");
    for (let i=1; i<arrLmn.length; i++) arrLmn[i].innerHTML = i;
}