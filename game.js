// var readline = require("readline-sync");
// var toolbox = require("./toolbox");

var game = {
  power4: [],
  columnTotal: 7,
  lineTotal: 6,
  player1Char: "x",
  player2Char: "o",

  gameInitialization: function () {
    this.power4 = toolbox.initializeEmptyArray(
      this.lineTotal,
      this.columnTotal
    );
  },

  displayPower4: function () {
    // for (let i = 0; i < this.power4.length; i++) {
    //   let txt = "";
    //   for (let j = 0; j < this.power4[i].length; j++) {
    //     txt += "| ";
    //     if (this.power4[i][j] === 0) {
    //       txt += "_";
    //     } else if (this.power4[i][j] === 1) {
    //       txt += this.player1Char;
    //     } else if (this.power4[i][j] === 2) {
    //       txt += this.player2Char;
    //     }
    //     txt += " |";
    //   }
    //   console.log(txt);
    // }
    // console.log(game);

    const game = document.querySelector("#game");
    game.innerHTML = "";
    var content = "<table class='table table-borderless'>";
    for (let i = 0; i < this.power4.length; i++) {
      content += " <tr>";
      for (let j = 0; j < this.power4[i].length; j++) {
        content +=
          "<td class='border border-black text-center' style='width:125px;height:125px' >";
        if (this.power4[i][j] === 0) {
          content += "";
        } else if (this.power4[i][j] === 1) {
          content +=
            "<img src='./img/J1.png' class='bg-danger rounded-circle' />";
        } else if (this.power4[i][j] === 2) {
          content +=
            "<img src='./img/J2.png' class='bg-info rounded-circle' />";
        }
        content += "</td>";
      }
      content += " </tr>";
    }
    content += " <tr>";
    content +=
      " <td class='text-center' > <button type='button' class='btn btn-light btn-lg ' onClick='play(0)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(1)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(2)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(3)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(4)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(5)' > ⬆️ </button></td>";

    content +=
      " <td class='text-center'> <button type='button' class='btn btn-light btn-lg' onClick='play(6)' > ⬆️ </button></td>";
    content += " </tr>";

    content += "</table>";

    game.innerHTML = content;
  },

  returnLineEmptySquare: function (column) {
    for (let i = this.lineTotal - 1; i >= 0; i--) {
      if (this.checkEmptySquare(i, column)) return i;
    }
    return -1;
  },

  checkEmptySquare: function (line, column) {
    return this.power4[line][column] === 0;
  },

  chooseColumn: function () {
    return parseInt(readline.question("Choisir une colonne :"));
  },

  checkEndOfGame: function (player) {
    if (
      this.checkEndInLine(player) ||
      this.checkEndInColumn(player) ||
      this.checkEndInDiagonal(player)
    ) {
      return true;
    }
    return false;
  },

  checkEndInLine: function (player) {
    for (let i = this.lineTotal - 1; i >= 0; i--) {
      for (let j = 0; j < this.columnTotal - 3; j++) {
        if (
          this.power4[i][j] === player &&
          this.power4[i][j + 1] === player &&
          this.power4[i][j + 2] === player &&
          this.power4[i][j + 3] === player
        )
          return true;
      }
    }
  },

  checkEndInColumn: function (player) {
    for (let i = 0; i < this.columnTotal; i++) {
      for (let j = this.lineTotal - 4; j >= 0; j--) {
        if (
          this.power4[j][i] === player &&
          this.power4[j + 1][i] === player &&
          this.power4[j + 2][i] === player &&
          this.power4[j + 3][i] === player
        )
          return true;
      }
    }
  },

  checkEndInDiagonal: function (player) {
    for (let i = this.lineTotal - 1; i >= 3; i--) {
      for (let j = 0; j < this.columnTotal; j++) {
        if (
          this.power4[i][j] === player &&
          this.power4[i - 1][j + 1] === player &&
          this.power4[i - 2][j + 2] === player &&
          this.power4[i - 3][j + 3] === player
        )
          return true;
        if (
          this.power4[i][j] === player &&
          this.power4[i - 1][j - 1] === player &&
          this.power4[i - 2][j - 2] === player &&
          this.power4[i - 3][j - 3] === player
        )
          return true;
      }
    }
    return false;
  },
};

// module.exports = game;
