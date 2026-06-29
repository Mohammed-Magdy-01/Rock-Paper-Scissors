// show Rules
document.querySelector(".rules").addEventListener("click", (e) => {
  document.querySelector(".overlay").style.display = "block";
});

// Hide Rules
document
  .querySelector(".overlay .rule div:first-child img")
  .addEventListener("click", (e) => {
    document.querySelector(".overlay").style.display = "none";
  });

// show details
document.querySelector(".head .right button").addEventListener("click", (e) => {
  document.querySelector(".overdetail").style.display = "block";
});

// Hide details
document
  .querySelector(".detailPop div:first-child img")
  .addEventListener("click", (e) => {
    document.querySelector(".overdetail").style.display = "none";
  });

// game details
let gamesPlayed = document.querySelector(
  ".detailPop div:last-child p:nth-child(1) span",
);
let gamesWon = document.querySelector(
  ".detailPop div:last-child p:nth-child(2) span",
);

let gamesDraw = document.querySelector(
  ".detailPop div:last-child p:nth-child(3) span",
);

let gamesLost = document.querySelector(
  ".detailPop div:last-child p:nth-child(4) span",
);

// =========================
let color1 = "";
let userImg = document.querySelector(".choose div:first-child div img");

document.querySelectorAll(".middle .imgs div").forEach((c) => {
  c.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");

    color1 = e.currentTarget.dataset.color;

    setTimeout(() => {
      document.querySelector(".middle .imgs").style.display = "none";
      document.querySelector(".choose").style.display = "flex";
    }, 400);

    const img = e.currentTarget.querySelector("img");

    // تعديل 
    // userImg.src = e.currentTarget.childNodes[1].src;
    // userImg.alt = e.currentTarget.childNodes[1].alt;

    userImg.src = img.src;
    userImg.alt = img.alt;

    document.querySelector(".choose div:first-child div").style.borderColor =
      color1;
    spans();
  });
});

// change img
let pcImgs = [
  {
    id: 0,
    color: "hsl(230, 89%, 62%)",
    src: "images/icon-paper.svg",
    alt: "paper",
  },
  {
    id: 1,
    color: "hsl(39, 89%, 49%)",
    src: "images/icon-scissors.svg",
    alt: "scissors",
  },
  {
    id: 2,
    color: " hsl(349, 71%, 52%)",
    src: "images/icon-rock.svg",
    alt: "rock",
  },
];

let image = document.querySelector(".choose div:last-child div img");
let imgDiv = document.querySelector(".choose div:last-child div");
let score = document.querySelector(".head .right span");

score.innerHTML = localStorage.getItem("score") || 0;
// span
function spans() {
  // remove win class
  document
    .querySelector(".choose .pc div:nth-child(2)")
    .classList.remove("win");
  document
    .querySelector(".choose .player div:nth-child(2)")
    .classList.remove("win");

  let randomindex = Math.floor(Math.random() * pcImgs.length);

  let rounds = 10;
  let currentRound = 0;
  let num = 0;

  let interval = setInterval(() => {
    image.src = pcImgs[num].src;
    imgDiv.style.borderColor = pcImgs[num].color;

    num = (num + 1) % pcImgs.length;
    currentRound++;

    if (currentRound > rounds && num == randomindex) {
      clearInterval(interval);

      image.src = pcImgs[randomindex].src;
      imgDiv.style.borderColor = pcImgs[randomindex].color;
      image.alt = pcImgs[randomindex].alt;

      // "paper","scissors","rock";

      // result
      let user = userImg.alt;
      let pc = image.alt;
      let boxText = document.querySelector(".choose .result");
      let text = document.querySelector(".choose .result h2");

      if (user === pc) {
        text.innerHTML = "IT IS DRAW";
        boxText.classList.add("show");
        gamesDraw.innerHTML = Number(gamesDraw.innerHTML) + 1;
        localStorage.setItem("gamesDraw", gamesDraw.innerHTML);
      }

      // user Wins
      else if (
        (user === "rock" && pc === "scissors") ||
        (user === "rock" && pc === "lizard") ||
        (user === "paper" && pc === "rock") ||
        (user === "paper" && pc === "spock") ||
        (user === "scissors" && pc === "paper") ||
        (user === "scissors" && pc === "lizard") ||
        (user === "lizard" && pc === "spock") ||
        (user === "lizard" && pc === "paper") ||
        (user === "spock" && pc === "scissors") ||
        (user === "spock" && pc === "rock")
      ) {
        score.innerHTML = Number(score.innerHTML) + 1;
        localStorage.setItem("score", score.innerHTML);
        text.innerHTML = "YOU WIN";
        boxText.classList.add("show");

        gamesWon.innerHTML = Number(gamesWon.innerHTML) + 1;
        localStorage.setItem("gamesWon", gamesWon.innerHTML);
        // add win class
        document
          .querySelector(".choose .player div:nth-child(2)")
          .classList.add("win");
      }

      // user loses
      else {
        if (score.innerHTML != 0) {
          score.innerHTML = Number(score.innerHTML - 1);
        }
        localStorage.setItem("score", score.innerHTML);

        text.innerHTML = "YOU LOSE";
        boxText.classList.add("show");
        gamesLost.innerHTML = Number(gamesLost.innerHTML) + 1;
        localStorage.setItem("gamesLost", gamesLost.innerHTML);
        // add win class
        document
          .querySelector(".choose .pc div:nth-child(2)")
          .classList.add("win");
      }
    }
  }, 200);
  gamesPlayed.innerHTML = Number(gamesPlayed.innerHTML) + 1;
  localStorage.setItem("gamesPlayed", gamesPlayed.innerHTML);
}

document
  .querySelector(".choose .result button")
  .addEventListener("click", (e) => {
    document.querySelector(".middle .imgs").style.display = "flex";
    document.querySelector(".choose").style.display = "none";

    document
      .querySelector(".middle .imgs div.active")
      .classList.remove("active");

    document.querySelector(".choose .result").classList.remove("show");
  });

// choose game

// Rock, Paper, Scissors, Lizard, Spock
document
  .querySelector(".choose-game div:last-child")
  .addEventListener("click", (e) => {
    if (pcImgs.length == 5) {
      return 0;
    }
    // change logo
    document.querySelector(".head .left > img").src = "images/logo-bonus.svg";

    document.querySelector(".head .left").classList.remove("triangle");
    document.querySelector(".head .left").classList.add("pentagon");

    localStorage.setItem("logoImg", "images/logo-bonus.svg");

    // change rule
    document.querySelector(".overlay .rule>img").src =
      "images/image-rules-bonus.svg";

    // change main game background
    document.querySelector(".middle .imgs").style.backgroundImage =
      `url(images/bg-pentagon.svg)`;
    localStorage.setItem("gameBackground", "images/bg-pentagon.svg");

    // Show Spock
    document.querySelector(".middle .imgs .spock").style.display = "block";

    // Show lizard
    document.querySelector(".middle .imgs .lizard").style.display = "block";

    //move elements

    document.querySelector(".middle .imgs").classList.remove("triangle");
    document.querySelector(".middle .imgs").classList.add("pentagon");

    // Add to list
    pcImgs.push(
      {
        id: 3,

        color: "hsl(189, 59%, 53%) ",
        src: "images/icon-spock.svg",
        alt: "spock",
      },
      {
        id: 4,
        color: "hsl(261, 73%, 60%)",
        src: "images/icon-lizard.svg",
        alt: "lizard",
      },
    );
  });

// Rock, Paper, Scissors

document
  .querySelector(".choose-game div:first-child")
  .addEventListener("click", (e) => {
    // change logo
    document.querySelector(".head .left > img").src = "images/logo.svg";
    document.querySelector(".head .left").classList.remove("pentagon");
    document.querySelector(".head .left").classList.add("triangle");

    localStorage.setItem("logoImg", "images/logo.svg");

    document.querySelectorAll(".head .left span").forEach((s) => {
      s.style.fontSize = "40px";
    });

    // change rule
    document.querySelector(".overlay .rule>img").src =
      "images/image-rules.svg";

    // change main game background
    document.querySelector(".middle .imgs").style.backgroundImage =
      `url(images/bg-triangle.svg)`;
    localStorage.setItem("gameBackground", "images/bg-triangle.svg");

    // remove Spock
    document.querySelector(".middle .imgs .spock").style.display = "none";
    // remove lizard
    document.querySelector(".middle .imgs .lizard").style.display = "none";

    // remove from list
    pcImgs.splice(3, 2);

    //move elements
    document.querySelector(".middle .imgs").classList.remove("pentagon");
    document.querySelector(".middle .imgs").classList.add("triangle");
  });

//

function checkGameStatus() {
  const savedBg = localStorage.getItem("gameBackground");
  if (savedBg && savedBg.includes("pentagon")) {
    document.querySelector(".choose-game div:last-child").click();
  } else {
    document.querySelector(".choose-game div:first-child").click();
  }

  gamesPlayed.innerHTML = localStorage.getItem("gamesPlayed") || 0;
  gamesWon.innerHTML = localStorage.getItem("gamesWon") || 0;
  gamesDraw.innerHTML = localStorage.getItem("gamesDraw") || 0;
  gamesLost.innerHTML = localStorage.getItem("gamesLost") || 0;
}

checkGameStatus();
