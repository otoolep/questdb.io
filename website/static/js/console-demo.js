window.addEventListener("scroll", changeCss , false);

function changeCss () {
    const navElement = document.querySelector("body > div.fixedHeaderContainer");
    this.scrollY > 1 ? navElement.style.backgroundColor = '#1a588c' : navElement.style.backgroundColor = '#2371b5';
}


window.addEventListener('load', function() {

    document.getElementById('consolebutton').addEventListener('click', myFunction);

    function myFunction() {
        if(document.getElementById('consolecontainer').style.display=='none') {
            document.getElementById('consolecontainer').style.display='block';
            document.getElementById('consolebutton').textContent='Hide Console';
        } else {
            document.getElementById('consolecontainer').style.display='none';
            document.getElementById('consolebutton').textContent='Show Console';
        }
    }

});