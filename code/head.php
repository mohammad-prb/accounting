<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="shortcut icon" href="pic/logo.png"/>
<script src="script/local-storage.js"></script>
<script>
    if (Number(localStorage.getItem("darkmode")) === 1) document.write('<link rel="stylesheet" href="style/dark-mode.css"/><meta name="theme-color" content="#1a1a1a">');
    if (Number(localStorage.getItem("menu")) === 0) document.write('<link rel="stylesheet" href="style/menu-basteh.css"/>');
</script>