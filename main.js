// var readline = require("readline-sync");
// var toolbox = require("./toolbox");
// var game = require("./game");

// intro();
// game.player1Char = chooseChar(1);
// game.player2Char = chooseChar(2);
const turn = document.querySelector("#turn");
const alert = document.querySelector("#alert");
const player1Section = document.querySelector("#player1");
const player2Section = document.querySelector("#player2");

let currentPlayer = 1; //whoStart(1, 2)
let gameIsInProgress = true;
let isIAOn = false;

let player1Points = 0;
let player2Points = 0;

displayInitialization();

function startIA() {
  isIAOn = !isIAOn;
}

function play(column) {
  playSquare(column);
  if (isIAOn) {
    columnIA = IA.columnChoice();
    setTimeout(() => {
      playSquare(columnIA);
    }, 300);
  }
}

function playSquare(column) {
  if (gameIsInProgress) {
    let emptyLine = game.returnLineEmptySquare(column);
    if (emptyLine !== -1) {
      game.power4[emptyLine][column] = currentPlayer;
      game.displayPower4();
      if (game.checkEndOfGame(currentPlayer)) {
        endOfGame();
      }

      if (currentPlayer === 1 && gameIsInProgress) {
        currentPlayer = 2;
        turn.innerHTML = "Tour du joueur 2";
      } else if (currentPlayer === 2 && gameIsInProgress) {
        currentPlayer = 1;
        turn.innerHTML = "Tour du joueur 1";
      }
    }
  }
}

function displayInitialization() {
  let contentP1 =
    "<img src='./img/J1.png' class='bg-danger rounded-circle' /> <br/> <br/>";
  contentP1 += `<strong> ${player1Points} </strong>`;
  player1Section.innerHTML = contentP1;
  let contentP2 =
    "<img src='./img/J2.png' class='bg-info rounded-circle' />  <br/> <br/>";
  contentP2 += `<strong> ${player2Points} </strong>`;
  player2Section.innerHTML = contentP2;

  alert.classList.add("d-none");
  turn.innerHTML = `Le joueur ${currentPlayer} commence`;

  game.gameInitialization();
  game.displayPower4();
  gameIsInProgress = true;
}

function endOfGame() {
  gameIsInProgress = false;
  alert.innerHTML = ` 🎉 <strong>  Le joueur ${currentPlayer} a gagné !! Félicitations !!  </strong> 🎉  <br/>`;
  alert.innerHTML +=
    "<button type='button' class='btn btn-secondary'onClick= displayInitialization() > Commencer une nouvelle manche </button>";
  alert.classList.remove("d-none");
  turn.innerHTML = "Manche terminée";
  currentPlayer === 1 ? player1Points++ : player2Points++;
  currentPlayer = 1;
}

function whoStart(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// while (true) {
//   if (playSquare(1)) {
//     console.log("Le joueur 1 a gagné.");
//     break;
//   }
//   if (playSquare(2)) {
//     console.log("Le joueur 2 a gagné.");
//     break;
//   }
// }

// function intro() {
//   let txt = "*".repeat(37) + "\n";
//   txt += "*".repeat(5) + " Bienvenue sur Puissance 4 " + "*".repeat(5) + "\n";
//   txt += "*".repeat(37) + "\n";
//   console.log(txt);
// }

// function chooseChar(player) {
//   let txt = "";
//   do {
//     txt = readline.question(`Le joueur ${player} choisi son caractere : `);
//   } while (txt.match(/^([a-zA-Z]){1}$/) === null);
//   return txt;
// }

// function playSquare(player) {
//   let emptyLine = -1;
//   let column = -1;
//   while (emptyLine === -1 || column <= 0 || column > 7) {
//     column = game.chooseColumn();
//     emptyLine = game.returnLineEmptySquare(column);
//   }

//   game.power4[emptyLine][column - 1] = player;
//   game.displayPower4();
//   return game.checkEndOfGame(player);
// }
