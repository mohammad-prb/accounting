/*      تابع اعمال فیلتر صورتحساب      */
function emalFilterBRN()
{
    errorDarad = false;
    var noeVariz = document.getElementById("khoroojiAstSBTK").dataset.value.trim().toString();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var noe = document.getElementById("noeSBTK").dataset.value.trim().toString();
    var onvan = document.getElementById("onvanSBTK").value.trim().toString();
    var rooz = document.querySelectorAll("#tarikhSBTK>input")[0].value.trim().toString();
    var mah = document.querySelectorAll("#tarikhSBTK>input")[1].value.trim().toString();
    var sal = document.querySelectorAll("#tarikhSBTK>input")[2].value.trim().toString();
    var mablagh = document.getElementById("mablaghSBTK").value.trim().toString();

    if (!check(rooz, "^(|0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[0]);
    if (!check(mah, "^(|0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[1]);
    if (!check(sal, "^(|[1-9][0-9]{3})$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[2]);
    if (!check(mablagh, "^(|[1-9][0-9]*)$")) errorInput(document.getElementById("mablaghSBTK"));

    if (errorDarad) return;
    var strQ = "noeVariz=" + noeVariz + "&hesabID=" + hesabID + "&noe=" + noe + "&onvan=" + onvan + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrBarnameh"));
            var arrObjEtelaat = JSON.parse(this.responseText);
            var lmnKadr = document.getElementById("kadrBarnameh");
            lmnKadr.innerHTML = "";

            /*  آمار و اطلاعات فیلتر  */
            document.getElementById("tedadNataiejBRN").innerHTML = momayezdar(arrObjEtelaat.length);
            var tedadKhorooji = 0;
            var tedadVoroodi = 0;

            /*  آیتم های صورت حساب  */
            for (let i=0; i<arrObjEtelaat.length; i++)
            {
                if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1) tedadKhorooji++;
                else tedadVoroodi++;

                var strHTML = '<div class="kadrVasetBRN">\n' +
                    '                        <div class="kadrOnvan"><span class="icon"></span><span class="matnTitr">'+ arrObjEtelaat[i]["onvan"] +'</span></div>\n' +
                    '                        <div class="kadrEmkanat">\n' +
                    '                            <a href="javascript:void(0);" class="emkanatBRN btnHazfBRN"></a>\n' +
                    '                            <a href="javascript:void(0);" onclick="virayeshBRN(this);" class="emkanatBRN btnVirayeshBRN"></a>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrNoe"><span class="icon"></span><span class="matnTitr">نوع:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["noe"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrTedadMandeh"><span class="icon"></span><span class="matnTitr">مانده:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["tedadMandeh"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrTarikh"><span class="icon"></span><span class="matnTitr">تاریخ بعدی:</span><span class="meghdarBRN">'+ arrObjEtelaat[i]["tarikhBadi"] +'</span></div>\n' +
                    '                    <div class="kadrEtelaatBRN kadrMablaghGhest"><span class="icon"></span><span class="matnTitr">مبلغ:</span><span class="meghdarBRN">'+ momayezdar(arrObjEtelaat[i]["mablagh"]) +'</span></div>\n' +
                    '                    <div class="kadrBtnBRN">\n' +
                    '                        <a href="javascript:void(0);" class="btnBRN" onclick=""><span class="icon"></span><span class="matnTitr">اطلاعات</span></a>\n' +
                    '                        <a href="javascript:void(0);" class="btnBRN" onclick=""><span class="icon"></span><span class="matnTitr">پرداخت</span></a>\n' +
                    '                    </div>';

                var lmn = document.createElement("div");
                lmn.setAttribute("class", "kadrBRN");
                lmn.dataset.id = arrObjEtelaat[i]["id"];
                lmn.dataset.khoroojiAst = arrObjEtelaat[i]["khoroojiAst"];
                lmn.innerHTML = strHTML;
                lmnKadr.appendChild(lmn);
            }

            document.getElementById("tedadKhoroojiBRN").innerHTML = momayezdar(tedadKhorooji);
            document.getElementById("tedadVoroodiBRN").innerHTML = momayezdar(tedadVoroodi);
            shomarehBandiItemhayeBRN();
        }
    };
    xhttp.open("POST", "./ajax/gereftan-barnameh.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrBarnameh"));
}

/*      شماره بندی آیتم های صورتحساب      */
function shomarehBandiItemhayeBRN()
{
    var arrlmn = document.getElementsByClassName("btnHazfBRN");
    for (let i=0; i<arrlmn.length; i++) arrlmn[i].setAttribute("onclick", "namayeshPeygham('آیا برای حذف اطمینان دارید؟', 1, 'hazfBarnameh("+i+")');");
}

/*      حذف یک صورتحساب      */
function hazfBarnameh(shom)
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