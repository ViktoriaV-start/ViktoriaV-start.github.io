
/**
 * Класс для отдельной игры
 */
class Game {

  main = document.querySelector('.main__field');
  info = document.querySelector('.main__victory');
  round = document.querySelector('.main__rnd');
  player = document.querySelector('.main__player');
  scoreX = document.querySelector('.main__x-score');
  score0 = document.querySelector('.main__zero-score');

  // Выигрышные комбинации
  victory = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  ];

  cells = null; 

  constructor(data) {
    this.data = data;
    this.players = data.getPlayers();
    this.init();
  }

  init() {

    // установить текущего игрока в data в зависимости от номера раунда
    this.data.setCurrentPlayer((this.data.getCounter() & 1) ? 'X' : '0');

    this.render();
    this.renderGameCounter();
    this.renderCurrentPlayer();
    this.renderScore();
    this.cells = document.querySelectorAll('.field__cell');

    this.start();

  }

  /**
   * Рендер поля
   */
  render() {
      this.main.insertAdjacentHTML('beforeend', this.markUpField());
  }

  /**
   * Разметка поля
   * @returns {string}
   */
  markUpField() {
    let field = '';
    for (let i = 1; i < 10; i++) {
      field += `<div class='field__cell' data-id="${i}"></div>`
    }
    return field;
  }

  /**
   * Поменять номер раунда на странице - берем из data
   */
  renderGameCounter() {
    this.round.textContent = this.data.getCounter();
  }

  /**
   * Поменять текущего игрока на странице - берем из data
   */
  renderCurrentPlayer() {
    this.player.textContent = this.data.getCurrentPlayer();
  }

  /**
   * Поменять очки для каждого игрока на странице - берем из data
   */
  renderScore() {
    this.scoreX.textContent = this.players.X[1];
    this.score0.textContent = this.players['0'][1];
  }

  /**
   * старт
   */
  start() {
    //счетчик ходов
    let count = 1;

    let mark = (e) => {
      e.target.textContent = this.data.getCurrentPlayer();

      count++;
      e.target.removeEventListener('click', mark);
      this.data.setCurrentPlayer(this.data.getCurrentPlayer() === 'X' ? '0' : 'X');
      this.renderCurrentPlayer();
  
      if (this.isVictory()) {
        this.info.textContent = `Победитель - ${this.players[e.target.textContent][0]}!`;
  
        this.players[e.target.textContent][1]++;
  
        this.renderScore();
        this.info.classList.remove('hidden');
  
        for (let cell of this.cells) {
          cell.removeEventListener('click', mark);
          }
      } else {
        if (count === 10) {
          this.info.textContent = 'Ничья!';
          this.info.classList.remove('hidden');
        }
      }
    }

    for (let cell of this.cells) {
      cell.addEventListener('click', mark);
    }
  }

  /**
   * Проверить победу
   */
  isVictory() {
    for (let el of this.victory) {
  
      if (
        this.cells[el[0]].textContent == this.cells[el[1]].textContent &&
        this.cells[el[1]].textContent == this.cells[el[2]].textContent &&
        this.cells[el[0]].textContent != ''
      ) {
        return true;
      }
    }
    return false;
  }

}