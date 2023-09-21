var IA = {
  columnChoice() {
    let arrColumn = this.getPossibleCellArray();
    let bestColumn = 0;
    let arrBestColumn = [0];
    for (let i = 1; i < arrColumn.length; i++) {
      if (arrColumn[i] > arrColumn[bestColumn]) {
        bestColumn = i;
        arrBestColumn = new Array();
        arrBestColumn.push(i);
      } else if (arrColumn[i] === arrColumn[bestColumn]) {
        arrBestColumn.push(i);
      }
    }
    return arrBestColumn[Math.floor(Math.random() * arrBestColumn.length)];
  },

  getPossibleCellArray: function () {
    let arrColumn = [];
    for (let i = 0; i < game.columnTotal; i++) {
      arrColumn.push(this.getWeightCellule(game.returnLineEmptySquare(i), i));
    }
    return arrColumn;
  },

  getWeightCellule: function (line, column) {
    if (line === -1) return 0;

    if (this.canWin(line, column, 2)) return 100;

    if (this.canWin(line, column, 1)) return 99;

    if (this.losingMove(line, column, 2)) return 0;

    let weight = 0;
    if (this.defensivePosition(line, column, 1)) weight += 20;
    if (this.defensivePosition(line, column, 2)) weight += 20;
    weight += this.getBaseWeight(line, column);

    return weight;
  },

  getBaseWeight: function (line, column) {
    let lineWeight = 0;
    let columnWeight = 0;
    switch (line) {
      case 0:
        lineWeight = 1;
        break;
      case 1:
        lineWeight = 2;
        break;
      case 2:
        lineWeight = 3;
        break;
      case 3:
        lineWeight = 4;
        break;
      case 4:
        lineWeight = 3;
        break;
      case 5:
        lineWeight = 2;
        break;
    }
    switch (column) {
      case 0:
        columnWeight = 1;
        break;
      case 1:
        columnWeight = 2;
        break;
      case 2:
        columnWeight = 3;
        break;
      case 3:
        columnWeight = 3;
        break;
      case 4:
        columnWeight = 3;
        break;
      case 5:
        columnWeight = 2;
        break;
      case 6:
        columnWeight = 1;
        break;
    }
    return lineWeight * columnWeight;
  },

  defensivePosition: function (line, column, player) {
    let count = 1;
    if (game.power4[line][column + 1] === player) {
      count++;
      if (
        game.power4[line][column + 2] === player &&
        game.power4[line][column + 3] === 0
      )
        count++;
    }
    if (game.power4[line][column - 1] === player) {
      count++;
      if (
        game.power4[line][column - 2] === player &&
        game.power4[line][column - 3] === 0
      )
        count++;
    }

    if (count > 2) return true;
  },

  canWin: function (line, column, player) {
    if (this.canWinInLine(line, column, player)) return true;
    if (this.canWinInColumn(line, column, player)) return true;
    if (this.canWinInDiagonal(line, column, player)) return true;
  },

  canWinInLine: function (line, column, player) {
    let count = 1;
    if (game.power4[line][column + 1] === player) {
      count++;
      if (game.power4[line][column + 2] === player) {
        count++;
        if (game.power4[line][column + 3] === player) {
          count++;
        }
      }
    }
    if (game.power4[line][column - 1] === player) {
      count++;
      if (game.power4[line][column - 2] === player) {
        count++;
        if (game.power4[line][column - 3] === player) {
          count++;
        }
      }
    }
    if (count > 3) return true;
  },

  canWinInColumn: function (line, column, player) {
    let count = 1;
    if (line < 3) {
      if (game.power4[line + 1][column] === player) {
        count++;
        if (game.power4[line + 2][column] === player) {
          count++;
          if (game.power4[line + 3][column] === player) {
            count++;
          }
        }
      }
    }
    if (count > 3) return true;
  },

  canWinInDiagonal: function (line, column, player) {
    let count = 1;
    if (
      line - 1 >= 0 &&
      column + 1 <= game.columnTotal &&
      game.power4[line - 1][column + 1] === player
    ) {
      count++;
      if (
        line - 2 >= 0 &&
        column + 2 <= game.columnTotal &&
        game.power4[line - 2][column + 2] === player
      ) {
        count++;
        if (
          line - 3 >= 0 &&
          column + 3 <= game.columnTotal &&
          game.power4[line - 3][column + 3] === player
        ) {
          count++;
        }
      }
    }

    if (
      line + 1 < game.lineTotal &&
      column - 1 >= 0 &&
      game.power4[line + 1][column - 1] === player
    ) {
      count++;
      if (
        line + 2 < game.lineTotal &&
        column - 2 >= 0 &&
        game.power4[line + 2][column - 2] === player
      ) {
        count++;
        if (
          line + 3 < game.lineTotal &&
          column - 3 >= 0 &&
          game.power4[line + 3][column - 3] === player
        ) {
          count++;
        }
      }
    }
    if (count > 3) return true;
    count = 1;

    if (
      line - 1 >= 0 &&
      column - 1 >= 0 &&
      game.power4[line - 1][column - 1] === player
    ) {
      count++;
      if (
        line - 2 >= 0 &&
        column - 2 >= 0 &&
        game.power4[line - 2][column - 2] === player
      ) {
        count++;
        if (
          line - 3 >= 0 &&
          column - 3 >= 0 &&
          game.power4[line - 3][column - 3] === player
        ) {
          count++;
        }
      }
    }

    if (
      line + 1 < game.lineTotal &&
      column + 1 <= game.columnTotal &&
      game.power4[line + 1][column + 1] === player
    ) {
      count++;
      if (
        line + 2 < game.lineTotal &&
        column + 2 <= game.columnTotal &&
        game.power4[line + 2][column + 2] === player
      ) {
        count++;
        if (
          line + 3 < game.lineTotal &&
          column + 3 <= game.columnTotal &&
          game.power4[line + 3][column + 3] === player
        ) {
          count++;
        }
      }
    }
    if (count > 3) return true;
  },

  losingMove: function (line, column, player) {
    if (line - 1 > 0) {
      if (this.canWin(line - 1, column, 1)) return true;
    }
  },
};
