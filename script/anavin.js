/*      تغییر حساب در صفحه عناوین      */
function gereftanDasteh()
{
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            console.log(this.responseText);
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
                    lmnDasteh.innerHTML = '<div class="shomJDST">'+ (i+1) +'</div>\n' +
                        '<div class="etelaatJDST" data-noe="'+ arrObjNatijeh[i]["noe"] +'">\n' +
                        '    <div class="iconJDST"></div>\n' +
                        '    <div class="onvanJDST" title="">'+ arrObjNatijeh[i]["onvan"] +'</div>\n' +
                        '    <div class="tedadMahJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadMah"]) +'</div>\n' +
                        '    <div class="tedadSalJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadSal"]) +'</div>\n' +
                        '    <div class="tedadKolJDST" title="">'+ momayezdar(arrObjNatijeh[i]["tedadKol"]) +'</div>\n' +
                        '    <div class="emkanatJDST">\n' +
                        (Number(arrObjNatijeh[i]["noe"]) > 0 ? '<a href="javascript:void(0);" class="btnJDST btnHazfJDST" onclick="" title="حذف"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnVirayeshJDST" onclick="" title="ویرایش"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnBalaJDST" onclick="" title="جابجایی"></a>\n' +
                            '<a href="javascript:void(0);" class="btnJDST btnPaeenJDST" onclick="" title="جابجایی"></a>\n' : "") +
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

    var radif = 1;
    for (let i=1; i<arrLmnEtelaat.length; i++)
    {
        if (arrNoeha[Number(arrLmnEtelaat[i].dataset.noe)] === 1)
        {
            arrLmnEtelaat[i].parentElement.style.display = "block";
            arrLmnEtelaat[i].previousElementSibling.innerHTML = radif++;
        }
        else
        {
            arrLmnEtelaat[i].parentElement.style.display = "none";
        }
    }
}

/*      افزودن دسته      */
function sabtDasteh()
{

}