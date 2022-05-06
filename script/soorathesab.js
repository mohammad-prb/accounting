/*      تنظیم صفحه بعد از لود کامل      */
function tanzimSafSRT()
{
    new entekhab({lmnKadr:"kadrKhvESBT", id:"khoroojiAstSBTK", onclick:"taghirKVFSRT(this);", arrObjMaghadir:[
            {value:"hameh", matn:"همه"},
            {value:1, matn:"خروجی"},
            {value:0, matn:"ورودی"}
        ]});
    sheiVasileh = new entekhab({lmnKadr:"kadrVashilehESBT", id:"vasilehSBTK", arrObjMaghadir:[
            {value:"hameh", matn:"همه"},
            {value:1, matn:"کارت"},
            {value:3, matn:"انتقال"},
            {value:4, matn:"پرداخت"},
            {value:5, matn:"چک"}
        ]});
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

    var lmnVasileh = document.getElementById("vasilehSBTK").parentElement;
    var lmnVarizBe = document.getElementById("varizBeSBTK").parentElement;
    lmnVarizBe.style.display = "block";

    if (noe === "hameh")
    {
        lmnVasileh.style.display = "none";
        taghirDastehFSRT(1);
        taghirFardFSRT(1);
    }
    else if (Number(noe) === 1)
    {
        lmnVasileh.style.display = "block";
        sheiVasileh.taghirENT(lmnVasileh.getElementsByClassName("gozinehENT")[0]);
        taghirDastehFSRT(1,2);
        taghirFardFSRT(1,2);
    }
    else if (Number(noe) === 0)
    {
        lmnVasileh.style.display = "none";
        taghirDastehFSRT(1,3);
        taghirFardFSRT(1,3);
    }
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

var tedadSoorathesabHarSaf = 100, shomSaf, tarikhSRT, tedadSaf;
/*      انداختن صورتحساب ها      */
function andakhtanSoorathesab()
{
    var shoroo = (shomSaf-1) * tedadSoorathesabHarSaf;
    var lmnKadr = document.getElementById("kadrSoorathesab");
    if (shomSaf === 1) lmnKadr.innerHTML = "";
    if (document.getElementById("btnEdamehSRT")) document.getElementById("btnEdamehSRT").remove();

    for (let i=shoroo; i<arrObjEtelaat.length && i<shoroo+tedadSoorathesabHarSaf; i++)
    {
        /*  افتادن تاریخ هنگام عوض شدن  */
        if (arrObjEtelaat[i]["tarikh"] !== tarikhSRT)
        {
            tarikhSRT = arrObjEtelaat[i]["tarikh"];
            var lmnTarikh = document.createElement("div");
            lmnTarikh.setAttribute("class", "kadrSatrTarikh");
            lmnTarikh.innerHTML = "<a href='javascript:void(0);' onclick='tanzimTarikhSoorathesab(this);' class='satrTarikh'>"+ tarikhSRT +"</a>";
            lmnKadr.appendChild(lmnTarikh);
        }

        var strHTML = '<div class="kadrSTB '+ (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1 ? "khorooji" : "voroodi") +'">\n' +
            '               <div class="headerSTB">\n' +
            '                    <div class="kadrEtelaatSTB">';

        if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1)
        {
            strHTML += '<div class="etelaatSTB">\n' +
                '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">وسیله:</span></div>\n' +
                '    <div class="meghdarEtelaatSTB">'+ arrObjEtelaat[i]["vasileh"] + '</div>\n' +
                '</div>';

            if (Number(arrObjEtelaat[i]["vasilehID"]) === 3)
            {
                strHTML += '<div class="etelaatSTB">\n' +
                    '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز به:</span></div>\n' +
                    '    <div class="meghdarEtelaatSTB fardSTB">'+ arrObjEtelaat[i]["nam"] +'</div>\n' +
                    '</div>';
            }
        }
        else if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 0)
        {
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
            '            <div class="mandehSTB" title="مانده حساب">' + momayezdar(arrObjEtelaat[i]["mandeh"]) + '</div>\n' +
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
        lmn.dataset.vasilehId = arrObjEtelaat[i]["vasilehID"];
        lmn.dataset.fardId = arrObjEtelaat[i]["fardID"];
        lmn.dataset.dastehId = arrObjEtelaat[i]["dastehID"];
        lmn.innerHTML = strHTML;
        lmnKadr.appendChild(lmn);
    }

    shomSaf++;
    if (tedadSaf - shomSaf > 0)
    {
        var lmnEdameh = document.createElement("a");
        lmnEdameh.setAttribute("id", "btnEdamehSRT");
        lmnEdameh.href = "javascript:void(0);";
        lmnEdameh.setAttribute("onclick", "andakhtanSoorathesab();");
        lmnEdameh.innerHTML = '<span class="icon riz"></span><span class="matnTitr riz">نمایش ادامه صورتحساب</span>';
        document.getElementById("kadrSoorathesab").appendChild(lmnEdameh);
    }
}

var arrObjEtelaat;
/*      تابع اعمال فیلتر صورتحساب      */
function emalFilterSRT()
{
    errorDarad = false;
    shomSaf = 1;
    tarikhSRT = "";
    var noeVariz = document.getElementById("khoroojiAstSBTK").dataset.value.trim().toString();
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var strQ = "noeVariz=" + noeVariz + "&hesabID=" + hesabID;

    if (Number(noeVariz) === 1)
    {
        var vasileh = document.getElementById("vasilehSBTK").dataset.value.trim().toString();
        strQ += "&vasileh=" + vasileh;
    }

    var dastehID = document.getElementById("dastehSBTK").value.trim().toString();
    var fard = document.getElementById("varizBeSBTK").value.trim().toString();
    var rooz = document.querySelectorAll("#tarikhSBTK>input")[0].value.trim().toString();
    var mah = document.querySelectorAll("#tarikhSBTK>input")[1].value.trim().toString();
    var sal = document.querySelectorAll("#tarikhSBTK>input")[2].value.trim().toString();
    var mablagh = document.getElementById("mablaghSBTK").value.trim().toString();
    var tozih = document.getElementById("tozihSBTK").value.trim().toString();

    if (!check(rooz, "^(|0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[0]);
    if (!check(mah, "^(|0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[1]);
    if (!check(sal, "^(|[1-9][0-9]{3})$")) errorInput(document.querySelectorAll("#tarikhSBTK>input")[2]);
    if (!check(mablagh, "^(|[1-9][0-9]*)$")) errorInput(document.getElementById("mablaghSBTK"));

    if (errorDarad) return;
    strQ += "&dastehID=" + dastehID + "&fard=" + fard + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh + "&tozih=" + tozih;
    document.getElementById("btnAmaSRT").href = "amar.php?hesabID=" + hesabID + "&tarikh=" + sal + "/" + mah;
    laghvSelect();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrSoorathesab"));
            if (!jsonMotabarAst(this.responseText))
            {
                namayeshPeygham("دریافت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
                return;
            }
            arrObjEtelaat = JSON.parse(this.responseText);

            /*  آمار و اطلاعات فیلتر  */
            document.getElementById("tedadNataiejSRT").innerHTML = momayezdar(arrObjEtelaat.length);
            var tedadKhorooji = 0;
            var tedadVoroodi = 0;
            var meghdarKhorooji = 0;
            var meghdarVoroodi = 0;

            for (let i=0; i<arrObjEtelaat.length; i++)
            {
                if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 1)
                {
                    tedadKhorooji++;
                    meghdarKhorooji += Number(arrObjEtelaat[i]["mablagh"]);
                }
                else if (Number(arrObjEtelaat[i]["khoroojiAst"]) === 0)
                {
                    tedadVoroodi++;
                    meghdarVoroodi += Number(arrObjEtelaat[i]["mablagh"]);
                }
            }

            tedadSaf = Math.ceil(arrObjEtelaat.length / tedadSoorathesabHarSaf);
            andakhtanSoorathesab();

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
            bastanLoading(lmn);
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

                if (((lmn.nextElementSibling && lmn.nextElementSibling.className !== "kadrDorSTB") || !lmn.nextElementSibling) && lmn.previousElementSibling.className !== "kadrDorSTB")
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
    if (arrObjEtelaat.length > tedadSoorathesabHarSaf)
    {
        namayeshPeygham("زمانی که تعداد آیتم ها بیشتر از " + tedadSoorathesabHarSaf +" باشد، سلکت کردن همه غیر فعال است.");
        return;
    }

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

var vasilehVSRT = 0;
/*      تغییر وسیله در ویرایش صورتحساب      */
function taghirVasilehVSRT(lmn)
{
    if (vasilehVSRT === Number(lmn.parentElement.dataset.value)) return;
    vasilehVSRT = Number(lmn.parentElement.dataset.value);

    if (vasilehVSRT === 3) document.getElementById("varizBeVSRT").parentElement.style.display = "block";
    else document.getElementById("varizBeVSRT").parentElement.style.display = "none";
}

/*      باز کردن کادر ویرایش صورتحساب      */
function virayeshSRT(lmn)
{
    if (document.getElementById("CountainerKadrViraieshSRT")) return;
    var lmnKadr = lmn.parentElement.parentElement.parentElement.parentElement;
    var id = Number(lmnKadr.dataset.id);
    var khoroojiAst = Number(lmnKadr.dataset.khoroojiAst);
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
        '                <div id="noeVarizVSRT" data-khorooji-ast="'+ khoroojiAst +'" onclick="namayeshPeygham(\'تغییر نوع امکان پذیر نیست. درصورت تمایل این واریز را حذف کنید و واریز دیگری ثبت کنید.\')">'+ (khoroojiAst===1?"خروجی":"ورودی") +'</div>\n';

    if (khoroojiAst === 1)
    {
        strHTML += '<div class="etelaatVSRT" id="khoroojiVSRT">\n' +
            '                    <div class="etelaatSBT" id="vasilehENTVSRT">\n' +
            '                    </div>\n' +
            '                    <div class="etelaatSBT baAnimation" style="display:none;">\n' +
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
        if ((khoroojiAst === 0 && (Number(arrObjDasteh[i]["noe"]) <= 1 || Number(arrObjDasteh[i]["noe"]) === 3)) || (khoroojiAst === 1 && (Number(arrObjDasteh[i]["noe"]) <= 2)))
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
        '                        <input type="text" class="txtMablagh" id="mablaghVSRT" name="mablagh" value="'+ mablagh +'" maxlength="10" placeholder="به ریال" autocomplete="off"/>\n' +
        '                    </div>\n' +
        '                    <div class="etelaatSBT">\n' +
        '                        <div class="iconEtelaatSBT"><span class="icon"></span><span class="matnTitr">توضیح:</span></div>\n' +
        '                        <input type="text" class="txtTozih" id="tozihVSRT" name="tozih" value="'+ tozih +'" placeholder="اختیاری" autocomplete="off"/>\n' +
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

    lmnVirayesh.onkeydown = function(e){
        if (e.keyCode === 13) sabtVirayeshSRT(id); // enter
        else if (e.keyCode === 27) document.getElementById("CountainerKadrViraieshSRT").remove(); // escape
    };

    document.getElementById("mablaghVSRT").onkeydown = function(e){
        if (e.keyCode === 107) { // +
            event.preventDefault();
            if (this.value.length < 7) this.value += "0000";
        }
        else if (e.keyCode === 109) { // -
            event.preventDefault();
            if (this.value.length < 8) this.value += "000";
        }
    };

    if (khoroojiAst === 1)
    {
        var andis;
        switch (vasilehId)
        {
            case 1: andis = 0; break;
            case 3: andis = 1; break;
            case 4: andis = 2; break;
            case 5: andis = 3;
        }

        new entekhab({lmnKadr:"vasilehENTVSRT", saddarsadAst:true, id:"vasilehVSRT", entekhb:andis, onclick:"taghirVasilehVSRT(this);", arrObjMaghadir:[
                {value:1, matn:"کارت"},
                {value:3, matn:"انتقال"},
                {value:4, matn:"پرداخت"},
                {value:5, matn:"چک"}
            ]});

        var gozinehVasileh = document.querySelectorAll("#vasilehVSRT .gozinehENT")[andis];
        vasilehVSRT = 0;
        taghirVasilehVSRT(gozinehVasileh);
    }
}

/*      ثبت ویرایش صورتحساب      */
function sabtVirayeshSRT(id)
{
    errorDarad = false;
    var khoroojiAst = Number(document.getElementById("noeVarizVSRT").dataset.khoroojiAst);
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var strQ = "id=" + id + "&khoroojiAst=" + khoroojiAst + "&hesabID=" + hesabID;

    if (khoroojiAst === 1)
    {
        var vasilehID = document.getElementById("vasilehVSRT").dataset.value.toString();
        var fard = document.getElementById("varizBeVSRT").value.toString();

        strQ += "&vasilehID=" + vasilehID;
    }
    else var fard = document.getElementById("varizKonandehVSRT").value.toString();

    var dastehID = document.getElementById("dastehVSRT").value.toString();
    var rooz = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[0].value.toString();
    var mah = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[1].value.toString();
    var sal = document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[2].value.toString();
    var mablagh = document.getElementById("mablaghVSRT").value.toString();
    var tozih = document.getElementById("tozihVSRT").value.toString().replace(/(<([^>]+)>)/ig, '');

    if (!check(rooz, "^(0?[1-9]|[1-2][0-9]|3[0-1])$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[0]);
    if (!check(mah, "^(0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[1]);
    if (!check(sal, "^[1-9][0-9]{3}$")) errorInput(document.querySelectorAll("#tarikhVSRT>input.txtTarikh")[2]);
    if (!check(mablagh, "^[1-9][0-9]*$")) errorInput(document.getElementById("mablaghVSRT"));

    if (errorDarad) return;
    strQ += "&dastehID=" + dastehID + "&fard=" + fard + "&rooz=" + rooz + "&mah=" + mah + "&sal=" + sal + "&mablagh=" + mablagh + "&tozih=" + tozih;

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
                var mandehGhabli, lmnGhabli, strHTML = "";
                var lmn = document.querySelector(".kadrDorSTB[data-id='"+id+"']");
                var mablaghGhabli = hazfMomayez(lmn.getElementsByClassName("mablaghSTB")[0].innerHTML);
                var lmnTaraz = document.getElementById("tarazSRT");

                if (khoroojiAst === 1)
                {
                    lmn.dataset.vasilehId = vasilehID;
                    var lmnKhorooji = document.getElementById("meghdarKhoroojiSRT");
                    lmnKhorooji.innerHTML = momayezdar(hazfMomayez(lmnKhorooji.innerHTML) - mablaghGhabli + Number(mablagh));
                    lmnTaraz.innerHTML = momayezdar(hazfMomayez(lmnTaraz.innerHTML) + mablaghGhabli - Number(mablagh));

                    mandehGhabli = hazfMomayez(lmn.getElementsByClassName("mandehSTB")[0].innerHTML);
                    lmnGhabli = lmn;
                    do
                    {
                        if (lmnGhabli.getAttribute("class") === "kadrDorSTB")
                            lmnGhabli.getElementsByClassName("mandehSTB")[0].innerHTML = momayezdar(mandehGhabli + (mablaghGhabli - Number(mablagh)));
                        lmnGhabli = lmnGhabli.previousElementSibling;
                    } while (lmnGhabli);

                    let vasileh = document.querySelector("#vasilehVSRT>a.gozinehENT[data-value='"+vasilehID+"']").innerHTML;

                    strHTML += '<div class="etelaatSTB">\n' +
                        '    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">وسیله:</span></div>\n' +
                        '    <div class="meghdarEtelaatSTB">'+ vasileh +'</div>\n' +
                        '</div>';

                    if (Number(vasilehID) === 3)
                    {
                        lmn.dataset.fardId = fard;
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

                    mandehGhabli = hazfMomayez(lmn.getElementsByClassName("mandehSTB")[0].innerHTML);
                    lmnGhabli = lmn;
                    do
                    {
                        if (lmnGhabli.getAttribute("class") === "kadrDorSTB")
                            lmnGhabli.getElementsByClassName("mandehSTB")[0].innerHTML = momayezdar(mandehGhabli - (mablaghGhabli - Number(mablagh)));
                        lmnGhabli = lmnGhabli.previousElementSibling;
                    } while (lmnGhabli);

                    lmn.dataset.fardId = fard;
                    var lmnVarizKonandeh = document.getElementById("varizKonandehVSRT");
                    strHTML += '<div class="etelaatSTB">\n' +
                        '                    <div class="onvanEtelaatSTB"><span class="icon riz"></span><span class="matnTitr riz">واریز از:</span></div>\n' +
                        '                    <div class="meghdarEtelaatSTB fardSTB">'+ lmnVarizKonandeh.options[lmnVarizKonandeh.selectedIndex].text +'</div>\n' +
                        '                </div>';
                }

                lmn.dataset.dastehId = dastehID;
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
            else if (natijeh === "er:ayandeh") namayeshPeygham("تاریخ وارد شده نمی تواند در آینده باشد.");
            else if (natijeh.substr(0, 10) === "er:tarikh:") namayeshPeygham("تاریخ وارد شده اشتباه است. این تاریخ قبل از افتتاح حساب شما ("+ natijeh.substr(10, 10) +") است.");
            else namayeshPeygham("ویرایش با خطا مواجه شد، لطفا پس از بررسی فیلد ها مجددا تلاش کنید.");
        }
    };
    xhttp.open("POST", "./ajax/virayesh-soorathesab.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strQ+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrVSRT"));
}