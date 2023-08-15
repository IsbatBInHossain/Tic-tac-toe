const boxes = document.querySelectorAll('.box');
const circle = document.getElementById('O');
const cross = document.getElementById('X');
const container = document.querySelector('.container');
let signed = [];
let circleArray = [];
let crossArray = [];
const resetButton = document.querySelector('.btn');
const winArrays = [
  ['0', '1', '2'],
  ['0', '3', '6'],
  ['0', '4', '8'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['2', '4', '6'],
  ['3', '4', '5'],
  ['6', '7', '8'],
];

let turn = true;

const resetGame = () => {
  signed.forEach(div => {
    const svg = div.querySelectorAll('.marks');
    svg.forEach(i => {
      i.style.display = 'none';
    });
    signed = [];
    circleArray = [];
    crossArray = [];
    turn = true;
  });
};

const win = player => {
  if (player === 'O') {
    container.style.backgroundColor = '#19c869';
  } else if (player === 'X') {
    container.style.backgroundColor = '#e24f47';
  } else {
    container.style.backgroundColor = '#99a8bf';
  }
  setTimeout(() => {
    container.style.backgroundColor = '#283c4f';
    resetGame();
  }, 1500);
};

resetButton.addEventListener('click', () => resetGame());

boxes.forEach(box => {
  box.addEventListener('click', e => {
    if (!signed.includes(box)) {
      if (turn) {
        box.querySelector('#O').style.display = 'block';
        circleArray.push(box.id);
      } else {
        box.querySelector('#X').style.display = 'block';
        crossArray.push(box.id);
      }
      winArrays.forEach(arr => {
        if (arr.every(t => circleArray.includes(t))) {
          win('O');
        } else if (arr.every(t => crossArray.includes(t))) {
          win('X');
        }
      });
      turn = !turn;
      signed.push(box);
      if (signed.length === 9) {
        win('T');
      }
    }
  });
});
