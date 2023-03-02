const Board = (() => {
  const cells = document.getElementsByClassName("cell");
  let boardArray = new Array(9).fill(null);
  let playerOneActive = true;
  let playerTwoActive = false;
  let playerOnePoints = 0;
  let playerTwoPoints = 0;
  let submitBtnNode = document.getElementsByClassName("btn-submit")[0];

  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let playerOneNameDisplayNode = document.getElementsByClassName(
      "player-name-display player-one"
    )[0];
    playerOneNameDisplayNode.textContent = playerOneName.value;
    let playerTwoNameDisplayNode = document.getElementsByClassName(
      "player-name-display player-two"
    )[0];
    playerTwoNameDisplayNode.textContent = playerTwoName.value;
    let inputNamesModalNode =
      document.getElementsByClassName("modal-input-names")[0];
    inputNamesModalNode.style.display = "none";
  });

  // // const submitButton = () => {
  // submitBtnNode.addEventListener("click", function () {
  //   let playerOneNameDisplayNode = document.getElementsByClassName(
  //     "player-name-display player-one"
  //   )[0];
  //   playerOneNameDisplayNode.textContent = playerOneName.value;
  //   let playerTwoNameDisplayNode = document.getElementsByClassName(
  //     "player-name-display player-two"
  //   )[0];
  //   playerTwoNameDisplayNode.textContent = playerTwoName.value;
  //   let inputNamesModalNode =
  //     document.getElementsByClassName("modal-input-names")[0];
  //   inputNamesModalNode.style.display = "none";
  // });
  // //};

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener(
      "click",
      function () {
        if (!cells[i].hasChildNodes()) {
          if (playerOneActive) {
            placeIcon(playerOne, i);
            playerOneActive = false;
            playerTwoActive = true;
          } else {
            placeIcon(playerTwo, i);
            playerOneActive = true;
            playerTwoActive = false;
          }
          checkIfFinished(boardArray);
        }
      },
      false
    );
  }

  const placeIcon = (player, i) => {
    let icon = player.getPlayerIcon();
    let iconNode = document.createElement("span");
    iconNode.setAttribute("class", "icon");
    iconNode.textContent = icon;
    cells[i].appendChild(iconNode);
    boardArray[i] = icon;
  };

  const checkIfFinished = (boardArray) => {
    if (
      (boardArray[0] === "X" &&
        boardArray[1] === "X" &&
        boardArray[2] === "X") ||
      (boardArray[3] === "X" &&
        boardArray[4] === "X" &&
        boardArray[5] === "X") ||
      (boardArray[6] === "X" &&
        boardArray[7] === "X" &&
        boardArray[8] === "X") ||
      (boardArray[0] === "X" &&
        boardArray[4] === "X" &&
        boardArray[8] === "X") ||
      (boardArray[2] === "X" &&
        boardArray[4] === "X" &&
        boardArray[6] === "X") ||
      (boardArray[0] === "X" &&
        boardArray[3] === "X" &&
        boardArray[6] === "X") ||
      (boardArray[1] === "X" &&
        boardArray[4] === "X" &&
        boardArray[7] === "X") ||
      (boardArray[2] === "X" && boardArray[5] === "X" && boardArray[8] === "X")
    ) {
      result("Player 1 wins!");
    } else if (
      (boardArray[0] === "O" &&
        boardArray[1] === "O" &&
        boardArray[2] === "O") ||
      (boardArray[3] === "O" &&
        boardArray[4] === "O" &&
        boardArray[5] === "O") ||
      (boardArray[6] === "O" &&
        boardArray[7] === "O" &&
        boardArray[8] === "O") ||
      (boardArray[0] === "O" &&
        boardArray[4] === "O" &&
        boardArray[8] === "O") ||
      (boardArray[2] === "O" &&
        boardArray[4] === "O" &&
        boardArray[6] === "O") ||
      (boardArray[0] === "O" &&
        boardArray[3] === "O" &&
        boardArray[6] === "O") ||
      (boardArray[1] === "O" &&
        boardArray[4] === "O" &&
        boardArray[7] === "O") ||
      (boardArray[2] === "O" && boardArray[5] === "O" && boardArray[8] === "O")
    ) {
      result("Player 2 wins!");
    } else if (checkIfDraw(boardArray)) {
      result("Its a draw!");
    }
  };

  const result = (result) => {
    let div = document.createElement("div");
    div.id = "modal-result";
    div.classList.add("result");
    div.textContent = result;
    modalContentNode = document.getElementsByClassName(
      "modal-content-result"
    )[0];
    modalContentNode.prepend(div);

    let resultModal = document.getElementsByClassName("modal-result")[0];
    resultModal.style.display = "block";

    points(result);
    currentWinner(playerOnePoints, playerTwoPoints);
    nextRound();
  };

  const points = (result) => {
    if (result === "Player 1 wins!") {
      playerOnePoints++;
      let playerOnePointsNode =
        document.getElementsByClassName("points player-one")[0];
      playerOnePointsNode.textContent = playerOnePoints + " ";
    } else if (result === "Player 2 wins!") {
      playerTwoPoints++;
      let playerTwoPointsNode =
        document.getElementsByClassName("points player-two")[0];
      playerTwoPointsNode.textContent = playerTwoPoints + " ";
    } else if (result === "Its a draw!") {
    }
  };

  const currentWinner = (playerOnePoints, playerTwoPoints) => {
    playerOneInfoNode = document.getElementsByClassName(
      "player-info player-one"
    )[0];
    playerTwoInfoNode = document.getElementsByClassName(
      "player-info player-two"
    )[0];
    if (playerOnePoints > playerTwoPoints) {
      playerOneInfoNode.style.background = "#12eb90";
      playerTwoInfoNode.style.background = "#ff635c";
    } else if (playerOnePoints < playerTwoPoints) {
      playerOneInfoNode.style.background = "#ff635c";
      playerTwoInfoNode.style.background = "#12eb90";
    } else {
      playerOneInfoNode.style.background = "#ffffff";
      playerTwoInfoNode.style.background = "#ffffff";
    }
  };

  const nextRound = () => {
    let nextRoundButtonNode =
      document.getElementsByClassName("btn-next-round")[0];
    nextRoundButtonNode.addEventListener("click", function () {
      let modalResultNode = document.getElementById("modal-result");
      modalResultNode.remove();
      let modalNode = document.getElementsByClassName("modal-result")[0];
      modalNode.style.display = "none";

      boardArray = new Array(9).fill(null);
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].hasChildNodes()) {
          cells[i].removeChild(cells[i].firstChild);
        }
      }
      playerOneActive = true;
      playerTwoActive = false;
    });
  };

  const checkIfDraw = (boardArray) => {
    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === null) {
        return false;
      }
    }
    return true;
  };
})();

const Player = (playerIcon) => {
  const getPlayerIcon = () => {
    return playerIcon;
  };
  return { getPlayerIcon };
};

const createPlayers = (() => {
  let playerOneIcon = "X";
  let playerTwoIcon = "O";
  playerOne = Player(playerOneIcon);
  playerTwo = Player(playerTwoIcon);
  return { playerOne, playerTwo };
})();
