/*      اعمال تاریخ در آمار حساب      */
function emalTarikh()
{
    errorDarad = false;
    var hesabID = Number(document.getElementsByClassName("sltHesabha")[0].value);
    var mah = document.querySelectorAll("#tarikhFSRT>input.txtTarikh")[0].value.toString().trim();
    var sal = document.querySelectorAll("#tarikhFSRT>input.txtTarikh")[1].value.toString().trim();
    var bazeh;

    if (!check(mah, "^(|0?[1-9]|1[0-2])$")) errorInput(document.querySelectorAll("#tarikhFSRT>input.txtTarikh")[0]);
    if (!check(sal, "^(|[1-9][0-9]{3})$")) errorInput(document.querySelectorAll("#tarikhFSRT>input.txtTarikh")[1]);
    if (sal === "" && mah !== "") {
        errorInput(document.querySelectorAll("#tarikhFSRT>input.txtTarikh")[1]);
        namayeshPeygham("خطا. زمانی میتوانید ماه را وارد کنید که سال را هم وارد کنید.");
    }

    if (errorDarad) return;
    if (sal !== "" && mah !== "") bazeh = "روز";
    else if (sal !== "") bazeh = "ماه";
    else bazeh = "سال";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            bastanLoading(document.getElementById("kadrAmar"));
            if (jsonMotabarAst(this.responseText))
            {
                var objNatijeh = JSON.parse(this.responseText);
                document.getElementById("meghdarMandeh").innerHTML = momayezdar(Number(objNatijeh["mandeh"]));
                document.getElementById("meghdarMablaghKhorooji").innerHTML = momayezdar(Number(objNatijeh["meghdarKhorooji"]));
                document.getElementById("meghdarMablaghVoroodi").innerHTML = momayezdar(Number(objNatijeh["meghdarVoroodi"]));
                document.getElementById("meghdarTaraz").innerHTML = momayezdar(Number(objNatijeh["meghdarVoroodi"]) - Number(objNatijeh["meghdarKhorooji"]));
                document.getElementById("meghdarJamTedad").innerHTML = momayezdar(Number(objNatijeh["tedadKhorooji"]) + Number(objNatijeh["tedadVoroodi"]));
                document.getElementById("meghdarKhorooji").innerHTML = momayezdar(Number(objNatijeh["tedadKhorooji"]));
                document.getElementById("meghdarVoroodi").innerHTML = momayezdar(Number(objNatijeh["tedadVoroodi"]));
                document.getElementById("btnSoorathesabAMR").href = "soorathesab.php?hesabID="+ hesabID +"&tarikh=" + sal + "/" + mah;

                /*  لیست دسته بندی ها  */
                var lmnKadr = document.getElementById("listDasteha");
                lmnKadr.innerHTML = "";
                for (let i=0; i<objNatijeh["arrDasteh"].length; i++)
                {
                    let lmn = document.createElement("div");
                    lmn.setAttribute("class", "itemListAMR");
                    lmn.innerHTML = '<div class="tedadEstefadehListAMR">'+objNatijeh["arrDasteh"][i]["tedad"]+'</div>' +
                        '<div class="onvanListAMR" data-noe="'+objNatijeh["arrDasteh"][i]["noe"]+'">'+objNatijeh["arrDasteh"][i]["onvan"]+'</div>';
                    lmnKadr.appendChild(lmn);
                }

                /*  لیست افراد  */
                lmnKadr = document.getElementById("listAfrad");
                lmnKadr.innerHTML = "";
                for (let i=0; i<objNatijeh["arrAfrad"].length; i++)
                {
                    let lmn = document.createElement("div");
                    lmn.setAttribute("class", "itemListAMR");
                    lmn.innerHTML = '<div class="tedadEstefadehListAMR">'+objNatijeh["arrAfrad"][i]["tedad"]+'</div>' +
                        '<div class="onvanListAMR" data-noe="'+objNatijeh["arrAfrad"][i]["noe"]+'">'+objNatijeh["arrAfrad"][i]["nam"]+'</div>';
                    lmnKadr.appendChild(lmn);
                }

                /*  نمودار ها  */
                var arrLabels = [];
                if (sal !== "" && mah !== "") for (let i=1; i<=objNatijeh["tedadRoozMah"]; i++) arrLabels.push(i);
                else if (sal !== "" && mah === "") arrLabels = [1,2,3,4,5,6,7,8,9,10,11,12];
                else for (sal in objNatijeh["arrKhorooji"]) arrLabels.push(sal);

                var arrDataKhorooji = [];
                var arrDataVoroodi = [];
                for (let i=arrLabels[0]; i<=arrLabels[arrLabels.length-1]; i++)
                {
                    if (objNatijeh["arrKhorooji"][i] === undefined) arrDataKhorooji.push(0);
                    else arrDataKhorooji.push(objNatijeh["arrKhorooji"][i]);

                    if (objNatijeh["arrVoroodi"][i] === undefined) arrDataVoroodi.push(0);
                    else arrDataVoroodi.push(objNatijeh["arrVoroodi"][i]);
                }

                if (document.getElementById("cnvNemoodarMablagh")) document.getElementById("cnvNemoodarMablagh").remove();
                var lmn = document.createElement("canvas");
                lmn.setAttribute("id", "cnvNemoodarMablagh");
                lmn.setAttribute("class", "nemoodar");
                document.getElementsByClassName("kadrNemoodar")[0].appendChild(lmn);
                var chartMablagh = new Chart(lmn, {
                   type: 'bar',
                   data: {
                       labels: arrLabels,
                       datasets: [{
                           label: 'خروجی ' + bazeh,
                           data: arrDataKhorooji,
                           backgroundColor: 'hsla(352, 100%, 35%, 0.5)',
                           borderColor: 'hsla(352, 100%, 35%, 1)',
                           borderWidth: 1,
                           fill: 'transparent'
                       },{
                           label: 'ورودی ' + bazeh,
                           data: arrDataVoroodi,
                           backgroundColor: 'hsla(148, 64%, 45%, 0.5)',
                           borderColor: 'hsl(148, 64%, 45%)',
                           borderWidth: 1,
                           fill: 'transparent'
                       }]
                   },
                   options:{scales:{yAxes:[{ticks:{beginAtZero: true}}]}}
                });

                if (document.getElementById("cnvNemoodarMandeh")) document.getElementById("cnvNemoodarMandeh").remove();
                lmn = document.createElement("canvas");
                lmn.setAttribute("id", "cnvNemoodarMandeh");
                lmn.setAttribute("class", "nemoodar");
                document.getElementsByClassName("kadrNemoodar")[1].appendChild(lmn);
                var chartMandeh = new Chart(document.getElementById("cnvNemoodarMandeh"), {
                   type: 'line',
                   data: {
                       labels: arrLabels,
                       datasets: [{
                           label: 'مانده آخر '+bazeh,
                           data: objNatijeh["arrMandeh"],
                           backgroundColor: 'hsla(39, 100%, 40%, 0.5)',
                           borderColor: 'hsla(39, 100%, 40%, 1)',
                           pointBackgroundColor : 'hsla(39, 100%, 40%, 1)',
                           borderWidth: 1,
                           fill: 'transparent'
                       },{
                           label: 'کمترین مانده '+bazeh,
                           data: objNatijeh["arrMin"],
                           backgroundColor: 'hsla(352, 100%, 35%, 0.5)',
                           borderColor: 'hsla(352, 100%, 35%, 1)',
                           pointBackgroundColor : 'hsla(352, 100%, 35%, 1)',
                           borderWidth: 1,
                           fill: 'transparent'
                       },{
                           label: 'بیشترین مانده '+bazeh,
                           data: objNatijeh["arrMax"],
                           backgroundColor: 'hsla(148, 64%, 45%, 0.5)',
                           borderColor: 'hsl(148, 64%, 45%)',
                           pointBackgroundColor : 'hsla(148, 64%, 45%, 1)',
                           borderWidth: 1,
                           fill: 'transparent'
                       }]
                   },
                   options:{scales:{yAxes:[{ticks:{beginAtZero: true}}]}}
                });
            }
            else namayeshPeygham("دریافت اطلاعات با خطا مواجه شد! لطفا دوباره امتحان کنید.");
        }
    };
    xhttp.open("POST", "./ajax/gereftan-amar.php?sid="+Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("hesabID="+hesabID+"&sal="+sal+"&mah="+mah+"&tk="+tkn);
    namayeshLoading(document.getElementById("kadrAmar"));
}

/*      اعمال یکی از تاریخ های موجود روی صفحه      */
function emalTarikhMojood(noe)
{
    if (noe === "mah")
        document.getElementsByClassName("txtTarikh")[0].value = mahJari;
    else if (noe === "sal")
        document.getElementsByClassName("txtTarikh")[0].value = "";

    document.getElementsByClassName("txtTarikh")[1].value = salJari;
    emalTarikh();
}

/*      تغییر لیست آمار      */
function taghirLAMR(id)
{
    if (id === 'listDasteha')
    {
        document.getElementById('listDasteha').style.display = "block";
        document.getElementById('listAfrad').style.display = "none";
        document.getElementsByClassName('btnLAMR')[0].dataset.enekhabi = "1";
        document.getElementsByClassName('btnLAMR')[1].dataset.enekhabi = "0";
    }
    else if (id === 'listAfrad')
    {
        document.getElementById('listDasteha').style.display = "none";
        document.getElementById('listAfrad').style.display = "block";
        document.getElementsByClassName('btnLAMR')[0].dataset.enekhabi = "0";
        document.getElementsByClassName('btnLAMR')[1].dataset.enekhabi = "1";
    }
}