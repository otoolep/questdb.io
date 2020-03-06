window.addEventListener('load', function () {

    const divDownload = document.getElementById('jsDownload');
    const divExpore = document.getElementById('getStartedTuto');
    const divTutoIcon = document.getElementById('tutoIcon');
    const divPackageIcon = document.getElementById('packageIcon');
    const divQuestionIcon = document.getElementById('questionIcon');
    const divCommunity = document.getElementById('getStartedQuestion');

    function setClick(id, f) {
        const e = document.getElementById(id);
        if (e) {
            e.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', f);
        }
    }

    setClick('packageIcon', showInstall);
    setClick('tutoIcon', showTuto);
    setClick('questionIcon', showQuestion);

    function showInstall() {
        divDownload.style.display = 'block';
        divExpore.style.display = 'none';
        divCommunity.style.display = 'none';
        divPackageIcon.style.webkitFilter = "grayscale(0%)";
        divTutoIcon.style.webkitFilter = "grayscale(75%)";
        divQuestionIcon.style.webkitFilter = "grayscale(75%)";

    }

    function showTuto() {
        divDownload.style.display = 'none';
        divExpore.style.display = 'block';
        divCommunity.style.display = 'none';
        divPackageIcon.style.webkitFilter = "grayscale(75%)";
        divTutoIcon.style.webkitFilter = "grayscale(0%)";
        divQuestionIcon.style.webkitFilter = "grayscale(75%)";
    }

    function showQuestion() {
        divDownload.style.display = 'none';
        divExpore.style.display = 'none';
        divCommunity.style.display = 'block';
        divPackageIcon.style.webkitFilter = "grayscale(75%)";
        divTutoIcon.style.webkitFilter = "grayscale(90%)";
        divQuestionIcon.style.webkitFilter = "grayscale(0%)";
    }
});