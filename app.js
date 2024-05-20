let boxes = document.querySelectorAll('.box');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let resetBtn = document.querySelector('#reset-btn');

let currentPlayer = 'X';

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    box.innerText = currentPlayer;
    box.disabled = true;
    checkWinner();
  });
});

function disableBoxes() {
  for (const box of boxes) {
    box.disabled = true;
  }
}
function enableBoxes() {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
}
function showWinner(winner) {
  msg.innerText = `Player${winner} Wins!`;
  msgContainer.classList.remove('hidden');
  disableBoxes();
}
function showDraw() {
  msg.innerText = `It\`s a draw!`;
  msgContainer.classList.remove('hidden');
  disableBoxes();
}

function checkWinner() {
  let draw = true;
  for (const pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
  for (const box of boxes) {
    if (box.innerText === '') {
      draw = false; // If any box is still empty, it's not a draw yet
      break;
    }
  }

  // If all boxes are filled but there's no winner, it's a draw
  if (draw) {
    showDraw();
  }
}

function resetGame() {
  enableBoxes();
  msgContainer.classList.add('hidden');
}
resetBtn.addEventListener('click', resetGame);
