var toolbox = {
  initializeEmptyArray: function (nbLines, nbColumns, character = 0) {
    let arr = [];

    for (let i = 0; i < nbLines; i++) {
      let line = [];
      for (let j = 0; j < nbColumns; j++) {
        line.push(character);
      }
      arr.push(line);
    }
    return arr;
  },
};

// module.exports = toolbox;
