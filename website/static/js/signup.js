window.addEventListener('load', function () {
    const divSignUpFlipInner = document.getElementById('jsSignUpFlipInner');
    const aSignUp = document.getElementById('jsSignUp');

    if (aSignUp) {
        aSignUp.onclick = signupClick;
    }

    function signupClick() {
        divSignUpFlipInner.classList.add('flip-box-inner-rotate');
        console.log('clicked');
        return false;
    }
});