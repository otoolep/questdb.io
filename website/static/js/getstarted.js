
window.addEventListener('load', function() {

    document.getElementById('packageIcon').addEventListener('click', showInstall);
    document.getElementById('tutoIcon').addEventListener('click', showTuto);
    document.getElementById('questionIcon').addEventListener('click', showQuestion);


    function showInstall() {
        document.getElementById('getStartedInstall').style.display='block';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='none';
    }

    function showTuto() {
        document.getElementById('getStartedInstall').style.display='none';
        document.getElementById('getStartedTuto').style.display='block';
        document.getElementById('getStartedQuestion').style.display='none';
    }

    function showQuestion() {
        document.getElementById('getStartedInstall').style.display='none';
        document.getElementById('getStartedTuto').style.display='none';
        document.getElementById('getStartedQuestion').style.display='block';
    }

});