function mobileAst(px = 767)
{
    if (document.getElementsByTagName("body")[0].offsetWidth < px)
        return true;
    else
        return false;
}

/*      بر عکس کردن رشته    */
function reverse(str)
{
    return str.split("").reverse().join("");
}

/*      گرفتن کوکی      */
function getCookie(name)
{
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

/*      ست کردن کوکی      */
function setCookie(namC, meghdarC, taChandRooz, masir)
{
    var datEx = new Date();
    datEx.setDate(datEx.getDate()+taChandRooz);
    document.cookie = namC + "=" + encodeURIComponent(meghdarC) + ((taChandRooz!=undefined)?(";expires=" + datEx.toUTCString()):"") + ";path=" + ((masir!=undefined)?masir:"/");
}

/*      حذف کردن کوکی      */
function delCookie(namC, masir)
{
    var datSefr = new Date();
    datSefr.setTime(0);
    setCookie(namC, "", -1, masir);
}


//      بررسی زبانها
function farsiAst(strVoroodi)
{
    var arrHarFarsi = ["آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "ژ", "س",
        "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", " ",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (i = 0; i < strVoroodi.length; i++)
    {
        var mojoodAst = false;
        for (j = 0; j < arrHarFarsi.length; j++)
        {
            if (strVoroodi.charAt(i) == arrHarFarsi[j])
                mojoodAst = true;

        }
        if (mojoodAst != true) return false;
    }
    return true;
}


function englisiAst(strVoroodi)
{
    var arrHarEnglisi = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (i = 0; i < strVoroodi.length; i++)
    {
        var mojoodAst = false;
        for (j = 0; j < arrHarEnglisi.length; j++)
        {
            if ((strVoroodi.charAt(i)).toLowerCase() == arrHarEnglisi[j])
                mojoodAst = true;

        }
        if (mojoodAst != true) return false;
    }
    return true;
}

//      بررسی نام کاربری
function isValidUsername(strVoroodi)
{
    var arrHarEnglisiVaAdad = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    for (i = 0; i < strVoroodi.length; i++)
    {
        var mojoodAst = false;
        for (j = 0; j < arrHarEnglisiVaAdad.length; j++)
        {
            if ((strVoroodi.charAt(i)).toLowerCase() == arrHarEnglisiVaAdad[j])
                mojoodAst = true;

        }
        if (mojoodAst != true) return false;
    }
    return true;
}


//  معتبر بودن جی سان
function jsonMotabarAst(json)
{
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}


/*      چک کردن تایم بودن یک رشته      */
function timeAst(time)
{
    time = time.toString();
    if (time.indexOf(":") < 0) return false;

    var h = time.split(":")[0];
    var m = time.split(":")[1];

    if (h.length > 2 || m.length > 2 || !adadiAst(h) || !adadiAst(m)) return false;

    return true;
}

/*      تبدیل اعداد ساعت و دقیقه به رشته معتبر ساعت (گزاشتن دو نقطه و صفر قبل اعداد)      */
function timeKon(h, m)
{
    var manfiAst = false;
    h = Number(h);
    m = Number(m);

    if (h < 0) manfiAst = true;

    if (Math.abs(h) < 10) h = "0" + Math.abs(h);
    if (m < 10) m = "0" + m;

    return (manfiAst ? "-" : "") + h + ":" + m;
}


/*      جمع و تفریق دو تایم      */
function hesabTime(time1, time2, amal = "+")    /* در تفریق اولی از دومی کم میشود (دومی باید بزرگتر باشد) */
{
    if (!timeAst(time1) || !timeAst(time2)) return "";

    var h1 = Number(time1.split(":")[0]);
    var m1 = Number(time1.split(":")[1]);
    var h2 = Number(time2.split(":")[0]);
    var m2 = Number(time2.split(":")[1]);
    var hNatijeh, mNatijeh;

    if (amal === "+")
    {
        hNatijeh = h1 + h2;
        mNatijeh = m1 + m2;

        while (mNatijeh >= 60)
        {
            hNatijeh++;
            mNatijeh -= 60;
        }
    }
    else if (amal === "-")
    {
        hNatijeh = h2 - h1;
        mNatijeh = m2 - m1;

        while (mNatijeh < 0)
        {
            hNatijeh--;
            mNatijeh += 60;
        }
    }

    return timeKon(hNatijeh, mNatijeh);
}

/*      محاسبه اینکه یک تایم چند دقیقه است      */
function daghigheh(time)
{
    if (!timeAst(time)) return false;

    var h = Number(time.split(":")[0]);
    var m = Number(time.split(":")[1]);

    return h * 60 + m;
}

/*      محاسبه اینکه یک دقیقه چه تایمی است      */
function daghighehToTime(daghigheh)
{
    if (!adadiAst(daghigheh)) return false;
    var h = Math.floor(daghigheh/60);
    var m = daghigheh % 60;
    return timeKon(h, m);
}

/*      محاسبه اختلاف بین دو ساعت منهای مقدار کسری      */
function ekhtelafTime(shoroo, payan, kasri)
{
    return hesabTime(kasri, hesabTime(shoroo, payan, "-"), "-")
}

/*      چک کردن تاریخ بودن      */
function tarikhAst(str)
{
    if (typeof str !== "string" || str.length !== 10) return false;
    if (str.substr(4, 1) !== "/" || str.substr(7, 1) !== "/") return false;
    if (isNaN(Number(str.substr(0, 4))) || isNaN(Number(str.substr(5, 2))) || isNaN(Number(str.substr(8, 2)))) return false;
    if (str.indexOf(".") >= 0 || str.indexOf("e") >= 0) return false;
    return true;
}

/*      تبدیل روز و ماه و سال به رشته تاریخ   */
function tarikhKon(sal, mah, rooz)
{
    if (rooz < 10 && rooz.toString().length === 1) rooz = "0" + rooz;
    if (mah < 10 && mah.toString().length === 1) mah = "0" + mah;
    return sal + "/" + mah + "/" + rooz;
}

/*      چک کردن فقط عدد بودن      */
function adadiAst(str)
{
    str = str.toString();

    if (str.indexOf(".") > 0 || str.indexOf("e") > 0) return false;

    str = Number(str);
    if (isNaN(str)) return false;

    return true;
}

/*      ممیز دار کردن عدد    */
function momayezdar(num)
{
    var numJadid = "", shomarandeh3 = 1, barAksNum, numBiManfi, i;
    if (num >= 0)
    {
        num = num.toString().trim();
        barAksNum = reverse(num);

        for (i = 0; i < num.length; i++)
        {
            numJadid += barAksNum.substr(i, 1);
            if (shomarandeh3 === 3 && (i !== num.length - 1))
            {
                numJadid += ",";
                shomarandeh3 = 1;
            }
            else
            {
                shomarandeh3++;
            }
        }

        return reverse(numJadid);
    }
    else if (num < 0)
    {
        num = num.toString().trim();
        numBiManfi = num.substr(1, num.length);
        barAksNum = reverse(numBiManfi);

        for (i = 0; i < numBiManfi.length; i++)
        {
            numJadid += barAksNum.substr(i, 1);
            if (shomarandeh3 === 3 && (i !== numBiManfi.length-1))
            {
                numJadid += ",";
                shomarandeh3 = 1;
            }
            else
            {
                shomarandeh3++;
            }
        }

        return "-" + reverse(numJadid);
    }
}

/*      حذف ممیز عدد    */
function hazfMomayez(adad)
{
    adad = adad.trim();
    while (adad.indexOf(",") >= 0) adad = adad.replace(",", "");
    return Number(adad);
}

/*  دریافت رمز  */
function getPassword(tedadRagham = 8)
{
    if (tedadRagham < 4) return false;

    var neoHa = "";
    var arrHoroof = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "-!@~#$%&*_+=/?"];
    var pass = "";

    for (var i=0; i < tedadRagham; i++)
    {
        var adadRanbdom = Math.floor(Math.random() * 4);
        pass += arrHoroof[adadRanbdom].substr(Math.floor(Math.random() * arrHoroof[adadRanbdom].length), 1);
        neoHa += adadRanbdom;
    }

    if (neoHa.indexOf("0") < 0 || neoHa.indexOf("1") < 0 || neoHa.indexOf("2") < 0 || neoHa.indexOf("3") < 0)
        return getPassword(tedadRagham);
    else
        return pass;
}

/*      تابع چک کردن یک عبارت با رگولار اکسپرشن      */
function check(str, pattern, flag = "")
{
    var regex = new RegExp(pattern, flag);
    if (str.match(regex) === null) return false;
    else return true;
}