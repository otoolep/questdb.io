window.addEventListener("scroll", changeCss , false);

function changeCss () {
    const navElement = document.querySelector("body > div.fixedHeaderContainer");
    this.scrollY > 1 ? navElement.style.backgroundColor = '#1a588c' : navElement.style.backgroundColor = '#2371b5';
}

