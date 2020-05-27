window.dataLayer = window.dataLayer || []

window.addEventListener("load", function () {
  const logo = document.getElementsByClassName("logo")[0].parentElement
  const github = document.createElement("div")
  const githubTrigger = document.getElementsByClassName("github-trigger")[0]
  const githubBtn = document.getElementsByClassName("sucker")[0]
  const nav = document.getElementsByClassName("nav-site")[0]

  function gtag() {
    dataLayer.push(arguments)
  }

  github.className = "github"
  github.appendChild(githubBtn)
  logo.insertAdjacentElement("afterEnd", github)

  gtag("js", new Date())
  gtag("config", "UA-145747842-1")

  const goalGaGithub = (e) => {
    gtag("event", "https://github.com/questdb/questdb/", {
      event_category: "Github Link Click",
      event_label: window.location.pathname,
    })
  }

  githubBtn.addEventListener("click", goalGaGithub)
  githubTrigger.addEventListener("click", goalGaGithub)

  const joinSlack = nav.childNodes[6] // 7th element in menu
  const joinSlackA = joinSlack.childNodes[0]
  joinSlackA.innerHTML = 'Join <img src="/img/slack-color.svg" alt="slack">'
  joinSlackA.className = "slack"
})
