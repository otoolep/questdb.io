window.addEventListener('load', function () {
    const logo = document.getElementsByClassName('logo')[0].parentElement;
    const github = document.createElement('div');


    // find existing github button and clone it here
    const githubBtn = document.getElementsByClassName('sucker')[0];
    github.className = 'github';
    github.appendChild(githubBtn);
    logo.insertAdjacentElement('afterEnd', github);

    const nav = document.getElementsByClassName('nav-site')[0];
    const joinSlack = nav.childNodes[6]; // 7th element in menu
    const joinSlackA = joinSlack.childNodes[0];
    joinSlackA.innerHTML = 'Join <img src="/img/slack-color.svg" alt="slack">'
    joinSlackA.className = 'slack';

    console.log(nav.childNodes[6]);
});
