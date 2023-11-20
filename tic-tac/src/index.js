'use strict';


// Кнопки - Новая игра, Сохранить игру, Удалить игру; навигация, блок с именем второго игрока - компьютер или друг
const btnNew = document.querySelector('.main__new');
const btnSave = document.querySelector('.main__save');
const btnDelete = document.querySelector('.main__delete');
const btns = document.querySelector('.main__footer');
const comp = document.querySelector('.nav__comp');
const friends = document.querySelector('.nav__friends');
const rival = document.querySelector('.main__rival');

// Соперник-компьютер: false / true
let computerRival = friends.classList.contains('active') ? false : true;

// Здесь будут храниться экземпляры классов Игра и Данные игры
let game = null;
let data = new Data();

startNewGame();

// Запуск приложения
function startNewGame() {

  // Проверка: есть сохраненная игра или нет, и кто соперник
  if (!Object.keys(localStorage).includes('tictac') && !computerRival) {
    btnSave.classList.remove('invisible');
    game = new Game(data);
  } else if (computerRival) {
    btnSave.classList.add('invisible');
    game.main.innerHTML = '';
    game.info.classList.add('hidden');

    rival.textContent = 'Компьютер - 0:';

    game = new GameComputer(data);

  } else if(Object.keys(localStorage).includes('tictac')) {
    btnSave.classList.remove('invisible');
    game = new GameStorage(data);
  }
}

// Новая игра
btnNew.addEventListener('click', () => {

  game.main.innerHTML = '';
  game.info.classList.add('hidden');
  data.setCounter(data.getCounter() + 1);

  if (computerRival) {
    game = new GameComputer(data);
  } else {
    game = new Game(data);
  }

});


// Сохранить текущую игру
btnSave.addEventListener('click', () => {

  let currentGame = {};
  for (let cell of game.cells) {
    currentGame[cell.getAttribute('data-id')] = cell.textContent;
  }

  let counter = data.getCounter();
  let players = data.getPlayers();
  let currentPlayer = data.getCurrentPlayer();

  localStorage.tictac = JSON.stringify({
    currentGame,
    counter,
    players,
    currentPlayer
  })

});


// Игра с компьютером
comp.addEventListener('click', () => {
  comp.classList.add('active');
  friends.classList.remove('active');
  computerRival = true;

  data = new Data();
  startNewGame();
})


// Игра вдвоем
friends.addEventListener('click', () => {
  comp.classList.remove('active');
  friends.classList.add('active');
  computerRival = false;
  game.main.innerHTML = '';
  game.info.classList.add('hidden');

  data = new Data();
  startNewGame();
})


// Удалить текущую игру
btnDelete.addEventListener('click', () => {

  localStorage.removeItem('tictac');
  game.main.innerHTML = '';
  game.info.classList.add('hidden');
  data = new Data();
  game = new Game(data);

});
