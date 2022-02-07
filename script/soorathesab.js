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

/*      تابع تغییر فرد، در فیلتر صورتحساب      */
function taghirFardFSRT(...noe)
{
    var lmnSelect = document.getElementById("varizBeSBTK");
    lmnSelect.innerHTML = "<option value='hameh'>-</option>";

    for (let i=0; i<arrObjAfrad.length; i++)
    {
        if (Number(arrObjAfrad[i]["noe"]) === 0 || noe.indexOf(Number(arrObjAfrad[i]["noe"])) >= 0)
        {
            let option = document.createElement("option");
            option.value = arrObjAfrad[i]["id"];
            option.innerHTML = arrObjAfrad[i]["nam"];
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
    var lmnVarizBe = document.getElementById("varizBeSBTK").parentElement;
    lmnVarizBe.style.display = "block";

    if (noe === "hameh")
    {
        lmnNoe.style.display = "none";
        lmnVasileh.style.display = "none";
        taghirDastehFSRT(1);
        taghirFardFSRT(1);
    }
    else if (Number(noe) === 1)
    {
        lmnNoe.style.display = "block";
        taghirENT(lmnNoe.getElementsByClassName("gozinehENT")[0]);
        taghirNoeFSRT(lmnNoe.getElementsByClassName("gozinehENT")[0]);
        taghirDastehFSRT(1,2);
        taghirFardFSRT(1,2);
    }
    else if (Number(noe) === 0)
    {
        lmnNoe.style.display = "none";
        lmnVasileh.style.display = "none";
        taghirDastehFSRT(1,3);
        taghirFardFSRT(1,3);
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
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>';

        lmnVasileh.parentElement.style.display = "block";
    }
    else if (Number(noeFSRT) === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="hameh" href="javascript:void(0);">همه</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="3" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="4" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehFSRT(this);" data-value="5" href="javascript:void(0);">پرداخت</a>';

        lmnVasileh.parentElement.style.display = "block";
    }
    else
    {
        lmnVasileh.parentElement.style.display = "none";
        taghirDastehFSRT(1,2);
    }
    taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    taghirVasilehFSRT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
}

var vasilehFSRT = "hameh";  // پیشفرض: همه
/*      تغییر وسیله پرداخت      */
function taghirVasilehFSRT(lmn)
{
    if (vasilehFSRT === lmn.parentElement.dataset.value) return;
    vasilehFSRT = lmn.parentElement.dataset.value;

    if (Number(vasilehFSRT) === 5) taghirDastehFSRT(4);
    else taghirDastehFSRT(1,2);

    if (Number(vasilehFSRT) !== 5) document.getElementById("varizBeSBTK").parentElement.style.display = "block";
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

            /* واریز به ها */
            var lmnSelect = document.getElementById("varizBeSBTK");
            lmnSelect.innerHTML = "<option value='hameh'>-</option>";
            for (let i=0; i<arrAfrad.length; i++)
            {
                if (Number(arrAfrad[i]["noe"]) <= 2)
                {
                    var option = document.createElement("option");
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
    var noeVariz = document.getElementById("khoroojiAstSBTK").dataset.value.trim().toString();
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
        }
    }

    if (vasileh !== "5")
    {
        var fard = document.getElementById("varizBeSBTK").value.trim().toString();
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
    laghvSelect();

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
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">نوع:</span></div>\n' +
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
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز از:</span></div>\n' +
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
    else for (let i=0; i<arrLmn.length; i++) entekhabSTB(arrLmn[i]);
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

var noeVSRT = 0;
/*      تغییر نوع در ویرایش صورتحساب      */
function taghirNoeVSRT(lmn)
{
    if (noeVSRT === Number(lmn.parentElement.dataset.value)) return;

    noeVSRT = Number(lmn.parentElement.dataset.value);
    var lmnVasileh = document.getElementById("vasilehVSRT");

    if (noeVSRT === 1)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="1" href="javascript:void(0);">کارتخوان</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);" data-value="2" href="javascript:void(0);">عابر بانک</a>';
    }
    else if (noeVSRT === 2)
    {
        lmnVasileh.innerHTML = '<span class="kadrPoshtENT"></span>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehVSRT(this);" data-value="3" href="javascript:void(0);">کارت</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehVSRT(this);" data-value="4" href="javascript:void(0);">حساب</a>\n' +
            '<a class="gozinehENT" onclick="taghirENT(this);taghirVasilehVSRT(this);" data-value="5" href="javascript:void(0);">پرداخت</a>';
    }

    taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
    taghirVasilehVSRT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
}

var vasilehVSRT = 0;
/*      تغییر وسیله در ویرایش صورتحساب      */
function taghirVasilehVSRT(lmn)
{
    if (vasilehVSRT === Number(lmn.parentElement.dataset.value)) return;

    vasilehVSRT = Number(lmn.parentElement.dataset.value);
    var lmnDasteh = document.getElementById("dastehVSRT");
    lmnDasteh.innerHTML = "";

    if (vasilehVSRT === 5)
    {
        for (let i=0; i<arrObjDasteh.length; i++)
        {
            if (Number(arrObjDasteh[i]["noe"]) === 4 || Number(arrObjDasteh[i]["noe"]) === 0)
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

    if (vasilehVSRT === 3 || vasilehVSRT === 4) document.getElementById("varizBeVSRT").parentElement.style.display = "block";
    else document.getElementById("varizBeVSRT").parentElement.style.display = "none";
}

/*      باز کردن کادر ویرایش صورتحساب      */
function virayeshSRT(lmn)
{
    if (document.getElementById("CountainerKadrViraieshSRT")) return;
    var lmnKadr = lmn.parentElement.parentElement.parentElement.parentElement;
    var id = Number(lmnKadr.dataset.id);
    var khoroojiAst = Number(lmnKadr.dataset.khoroojiAst);
    var noeID = Number(lmnKadr.dataset.noe);
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
            '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">نوع:</span></div>\n' +
            '                        <div class="kadrENT" id="noeVSRT">\n' +
            '                            <span class="kadrPoshtENT"></span>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeVSRT(this);" data-value="1" href="javascript:void(0);">برداشت با کارت</a>\n' +
            '                            <a class="gozinehENT" onclick="taghirENT(this);taghirNoeVSRT(this);" data-value="2" href="javascript:void(0);">اینترنتی</a>\n' +
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
            '        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">واریز از:</span></div>\n' +
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
        // در زمان خروجی بودن، توسط تابع تغییر وسیله، دسته بندی پر میشود.
        if (khoroojiAst === 0 && (Number(arrObjDasteh[i]["noe"]) <= 1 || Number(arrObjDasteh[i]["noe"]) === 3))
            strHTML += '<option value="'+ arrObjDasteh[i]["id"] +'" '+ (Number(arrObjDasteh[i]["id"])===dastehId?"selected":"") +'>'+ arrObjDasteh[i]["onvan"] +'</option>';
    }

    strHTML += '</select>\n' +
        '                    </div>\n' +
        '                    <div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">تاریخ:</span></div>\n' +
        '                        <div class="kadrTarikhSBT" id="tarikhVSRT">\n' +
        '                            <input type="text" class="txtTarikh" name="rooz" value="'+ tarikh.substr(8,2) +'" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="روز" autocomplete="off"/>\n' +
        '                            <input type="text" class="txtTarikh" name="mah" value="'+ tarikh.substr(5,2) +'" onfocus="this.select();" oninput="if(this.value.length>1) this.nextElementSibling.focus();" maxlength="2" placeholder="ماه" autocomplete="off"/>\n' +
        '                            <input type="text" class="txtTarikh" name="sal" value="'+ tarikh.substr(0,4) +'" onfocus="this.select();" oninput="if(this.value.length>3) document.getElementById(\'mablaghVSRT\').focus();" maxlength="4" placeholder="سال" autocomplete="off"/>\n' +
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

    if (khoroojiAst === 1)
    {
        var gozinehVasileh, gozinehNoe = document.querySelectorAll("#noeVSRT .gozinehENT")[noeID-1];
        noeVSRT = 0;
        taghirENT(gozinehNoe);
        taghirNoeVSRT(gozinehNoe);

        if (vasilehId < 3) gozinehVasileh = document.querySelectorAll("#vasilehVSRT .gozinehENT")[vasilehId-1];
        else gozinehVasileh = document.querySelectorAll("#vasilehVSRT .gozinehENT")[vasilehId-3];
        vasilehVSRT = 0;
        taghirENT(gozinehVasileh);
        taghirVasilehVSRT(gozinehVasileh);

        document.querySelector("#dastehVSRT option[value='"+ dastehId +"']").setAttribute("selected", "");
    }
}

/*      ثبت ویرایش صورتحساب      */
function sabtVirayeshSRT(id)
{
    var khoroojiAst = Number(document.getElementById("noeVarizVSRT").dataset.khoroojiAst);
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var strQ = "id=" + id + "&khoroojiAst=" + khoroojiAst + "&hesabID=" + hesabID;

    if (khoroojiAst === 1)
    {
        var noeID = document.getElementById("noeVSRT").dataset.value.toString();
        var vasilehID = document.getElementById("vasilehVSRT").dataset.value.toString();
        var fard = document.getElementById("varizBeVSRT").value.toString();

        if (!check(noeID, "^[1-2]$") || !check(vasilehID, "^[1-5]$")) {
            namayeshPeygham("لطفا فیلد هارا برسی کرده، و مجددا تلاش کنید.");
            return;
        }
        strQ += "&noeID=" + noeID + "&vasilehID=" + vasilehID;
    }
    else var fard = document.getElementById("varizKonandehVSRT").value.toString();

    var dastehID = document.getElementById("dastehVSRT").value.toString();
    var rooz = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[0].value.toString();
    var mah = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[1].value.toString();
    var sal = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[2].value.toString();
    var mablagh = document.getElementById("mablaghVSRT").value.toString();
    var tozih = document.getElementById("tozihVSRT").value.toString().replace(/(<([^>]+)>)/ig, '');

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
            bastanLoading(document.getElementById("kadrVSRT"));
            var natijeh = this.responseText;
            if (natijeh === "ok")
            {
                flash("ویرایش با موفقیت انجام شد.");
                var strHTML = "";
                var lmn = document.querySelector(".kadrDorSTB[data-id='"+id+"']");
                var mablaghGhabli = hazfMomayez(lmn.getElementsByClassName("mablaghSTB")[0].innerHTML);
                var lmnTaraz = document.getElementById("tarazSRT");

                if (khoroojiAst === 1)
                {
                    var lmnKhorooji = document.getElementById("meghdarKhoroojiSRT");
                    lmnKhorooji.innerHTML = momayezdar(hazfMomayez(lmnKhorooji.innerHTML) - mablaghGhabli + Number(mablagh));
                    lmnTaraz.innerHTML = momayezdar(hazfMomayez(lmnTaraz.innerHTML) + mablaghGhabli - Number(mablagh));

                    let vasileh = document.querySelector("#vasilehVSRT>a.gozinehENT[data-value='"+vasilehID+"']").innerHTML;
                    switch (vasileh)
                    {
                        case 'کارت': vasileh = "کارت به کارت"; break;
                        case 'حساب': vasileh = "حساب به حساب"; break;
                    }

                    strHTML += '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">نوع:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB">'+ document.querySelector("#noeVSRT>a.gozinehENT[data-value='"+noeID+"']").innerHTML +'</div>\n' +
                        '</div>' +
                        '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">وسیله:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB">'+ vasileh +'</div>\n' +
                        '</div>';

                    if (Number(vasilehID) === 3 || Number(vasilehID) === 4)
                    {
                        var lmnVarizBe = document.getElementById("varizBeVSRT");
                        strHTML += '<div class="etelaatSTB">\n' +
                            '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز به:</span></div>\n' +
                            '                    <div class="meghdarEtelaatSTB fardSTB">'+ lmnVarizBe.options[lmnVarizBe.selectedIndex].text +'</div>\n' +
                            '                </div>';
                    }
                }
                else
                {
                    var lmnVoroodi = document.getElementById("meghdarVoroodiSRT");
                    lmnVoroodi.innerHTML = momayezdar(hazfMomayez(lmnVoroodi.innerHTML) - mablaghGhabli + Number(mablagh));
                    lmnTaraz.innerHTML = momayezdar(hazfMomayez(lmnTaraz.innerHTML) - mablaghGhabli + Number(mablagh));

                    var lmnVarizKonandeh = document.getElementById("varizKonandehVSRT");
                    strHTML += '<div class="etelaatSTB">\n' +
                        '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز از:</span></div>\n' +
                        '                    <div class="meghdarEtelaatSTB fardSTB">'+ lmnVarizKonandeh.options[lmnVarizKonandeh.selectedIndex].text +'</div>\n' +
                        '                </div>';
                }

                var lmnDasteh = document.getElementById("dastehVSRT");
                strHTML += '<div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">دسته:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB dastehSTB">'+ lmnDasteh.options[lmnDasteh.selectedIndex].text +'</div>\n' +
                    '                </div>\n' +
                    '                <div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">تاریخ:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB tarikhSTB">'+ tarikhKon(sal, mah, rooz) +'</div>\n' +
                    '                </div>\n' +
                    '                <div class="etelaatSTB">\n' +
                    '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">مبلغ:</span></div>\n' +
                    '                    <div class="meghdarEtelaatSTB mablaghSTB">'+ momayezdar(mablagh) +'</div>\n' +
                    '                </div>';

                lmn.getElementsByClassName("kadrEtelaatSTB")[0].innerHTML = strHTML;
                lmn.getElementsByClassName("tozihSTB")[0].innerHTML = tozih;
                document.getElementById("CountainerKadrViraieshSRT").remove();
            }
            else if (natijeh === "er:mandeh") namayeshPeygham("مبلغ وارد شده اشتباه است. این مبلغ بیشتر از مانده حساب شماست.");
            else namayeshPeygham("ویرایش با خطا مواجه شد، لطفا پس از بررسی فیلد ها مجددا تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/virayesh-soorathesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrVSRT"));
}