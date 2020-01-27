
window.addEventListener('load', function() {

    document.getElementById('packageIcon').addEventListener('click', showInstall);
    document.getElementById('tutoIcon').addEventListener('click', showTuto);
    document.getElementById('questionIcon').addEventListener('click', showQuestion);

    function showInstall() {
        document.getElementById('getStartedInstall').style.display='block';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='none';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(0%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(75%)";

    }

    function showTuto() {
        document.getElementById('getStartedInstall').style.display='none';
        document.getElementById('getStartedTuto').style.display='block';
        document.getElementById('getStartedQuestion').style.display='none';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(0%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(75%)";
    }

    function showQuestion() {
        document.getElementById('getStartedInstall').style.display='none';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='block';
        document.getElementById('packageIcon').style.webkitFilter = "grayscale(75%)";
        document.getElementById('tutoIcon').style.webkitFilter = "grayscale(90%)";
        document.getElementById('questionIcon').style.webkitFilter = "grayscale(0%)";

    }

});