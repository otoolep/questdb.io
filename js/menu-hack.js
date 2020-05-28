window.dataLayer = window.dataLayer || []

window.addEventListener("load", function () {
  const logo = document.getElementsByClassName("logo")[0].parentElement
  const github = document.createElement("div")
  const githubTrigger = document.getElementsByClassName("github-trigger")[0]
  const githubBtn = document.getElementsByClassName("sucker")[0]
  const nav = document.getElementsByClassName("nav-site")[0]

  github.className = "github"
  github.appendChild(githubBtn)
  logo.insertAdjacentElement("afterEnd", github)

  const goalGaGithub = (e) => {
    dataLayer.push({
      event: "gtm.linkClick",
      "gtm.elementUrl": "https://github.com/questdb/questdb",
    })
  }

  githubBtn.addEventListener("click", goalGaGithub)
  githubTrigger.addEventListener("click", goalGaGithub)

  const joinSlack = nav.childNodes[6] // 7th element in menu
  const joinSlackA = joinSlack.childNodes[0]
  joinSlackA.innerHTML = 'Join <img src="/img/slack-color.svg" alt="slack">'
  joinSlackA.className = "slack"
})
