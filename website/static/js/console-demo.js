
window.addEventListener('scroll', function() {

    document.getElementById()

});

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