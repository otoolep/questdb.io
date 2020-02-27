
window.addEventListener('load', function() {

    function setClick(id, f) {
        document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', f);
    }

    setClick('packageIcon', showInstall);
    setClick('tutoIcon', showTuto);
    setClick('questionIcon', showQuestion);

    // document.getElementById('packageIcon').parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', showInstall);
    // document.getElementById('tutoIcon').addEventListener('click', showTuto);
    // document.getElementById('questionIcon').addEventListener('click', showQuestion);

    function showInstall() {
        document.getElementById('jsDownload').style.display='block';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='none';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(0%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(75%)";

    }

    function showTuto() {
        document.getElementById('jsDownload').style.display='none';
        document.getElementById('getStartedTuto').style.display='block';
        document.getElementById('getStartedQuestion').style.display='none';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(0%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(75%)";
    }

    function showQuestion() {
        document.getElementById('jsDownload').style.display='none';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='block';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(90%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(0%)";

    }

});