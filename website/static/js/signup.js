window.addEventListener('load', function () {
    const divSignUpFlipInner = document.getElementById('jsSignUpFlipInner');
    const aSignUp = document.getElementById('jsSignUp');
    const formSignUp = document.getElementById('jsSignupForm');
    const inputEmail = document.getElementById('jsInputEmail');

    if (aSignUp) {
        aSignUp.onclick = signupClick;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function removeShake() {
        divSignUpFlipInner.classList.remove('signup-shake');
    }

    function signupClick() {
        if (validateEmail(inputEmail.value)) {
            divSignUpFlipInner.classList.add('flip-box-inner-rotate');
            formSignUp.submit();
        } else {
            divSignUpFlipInner.classList.add('signup-shake');
            inputEmail.classList.add('input-error');
            inputEmail.focus();
            setTimeout(removeShake, 1000);
        }
        return false;
    }
});