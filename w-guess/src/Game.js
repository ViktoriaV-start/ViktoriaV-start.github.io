import {
  CLASS_BTN_CHECK,
  MESSAGES, SELECTOR_ANSWER,
  SELECTOR_GAME,
  SELECTOR_INPUT_ANSWER,
  SELECTOR_MESSAGE,
  SELECTOR_STARS,
  SELECTOR_TASK,
} from "./config/constants.js";

export class Game {
  riddle = null;
  gameContainer = document.querySelector(SELECTOR_GAME);
  messagesContainer = null;
  answerContainer = null;
  guessContainer = null;
  inputContainer = null;
  taskContainer = null;

  min = 1;
  max = 100;
  count = 1;
  helpType = null;

  constructor(min, max) {

    this.min = min;
    this.max = max;
    this._setRiddle();

    this.gameContainer.innerHTML = '';
    this.gameContainer.insertAdjacentHTML('afterbegin', this._markUp());
    this.messagesContainer = document.querySelector(SELECTOR_MESSAGE);
    this.answerContainer = document.querySelector(SELECTOR_ANSWER);
    this.guessContainer = document.querySelector(SELECTOR_STARS);
    this.inputContainer = document.querySelector(SELECTOR_INPUT_ANSWER);
    this.taskContainer = document.querySelector(SELECTOR_TASK);

    this._init();

  }

  /** 
   * Новая игра - установить начальные значения для значений и текста
   */
  startNewGame(min, max) {
    this.messagesContainer.classList.remove('colored');
    this.count = 1;
    this.min = min;
    this.max = max;
    this._setRiddle();
    this.answerContainer.classList.remove('invisible');
    this.guessContainer.textContent = this._countDigits();
    this.messagesContainer.textContent = MESSAGES.start;
    this.inputContainer.value = '';
    this.taskContainer.textContent = `Угадайте число от ${this.min} до ${this.max}`;
  }

  /**
   * Установить слушателей событий:
   * 1) проверить ответ пользователя и установить анимацию для сообщения;
   * 2) конец анимации для сообщения - удалить класс анимации
   */
  _init() {
    //проверить ответ пользователя и установить анимацию для сообщения
    this.gameContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains(CLASS_BTN_CHECK)) {
        this.messagesContainer.classList.add('scale-up-center');
        this._guess(this.inputContainer.value)
      }
    })

    //конец анимации для сообщения - удалить класс анимации
    this.messagesContainer.addEventListener("animationend", () => {
      this.messagesContainer.classList.remove('scale-up-center');
    }, false);

  }

  /**
   * Установить рандомное число в качестве загадки и тип числа (четное/ нечетное)
   */
  _setRiddle() {
     this.riddle = Math.round(this.min - 0.5 + Math.random()*(this.max - this.min + 1));
     this.helpType = (this.riddle & 1) ? 'odd' : 'even';
  }

  /**
   * Подсчитать количество знаков в числе и вернуть равное количество звезд для текста
   * @returns {string}
   */
  _countDigits() {
    switch (String(this.riddle).split('').length) {
      case 1:
        return '*';
      case 2:
        return '* *';
      case 3:
        return '* * *';
      default:
        return '* *';
    }
  }

  /**
   * Проверка ответа, вывод подсказки на каждый 3-ий неверный ответ, показ информации пользователю
   * @param {string} num 
   * @returns 
   */
  _guess(num) {

    let help = (this.count % 3 === 0) ? MESSAGES[this.helpType] : '';

    let answer = parseInt(num.trim());

    if (answer < this.min || answer > this.max) {
      this.messagesContainer.textContent = MESSAGES.out + this.min + ' - ' + this.max;
      return;
    } else if (answer > this.riddle) {
      this.messagesContainer.textContent = MESSAGES.greater + help;
    } else if (answer < this.riddle) {
      this.messagesContainer.textContent = MESSAGES.less + help;
    } else if (answer === this.riddle) {
      this.messagesContainer.classList.add('colored');
      this.answerContainer.classList.add('invisible');
      this.guessContainer.textContent = this.riddle;
      this.messagesContainer.textContent = MESSAGES.victory + this.count;
        return;
    } else {
      this.messagesContainer.textContent = MESSAGES.nan;
      return;
    }

    this.count++;

  }

  _markUp() {
    return `
      <div class="main__messages-wrap">

        <div class="main__riddle">
          <div>Загадано число:</div>
          <div class="main__stars">${this._countDigits()}</div>
        </div>

        <div class="main__info">
          <div class="main__message">${MESSAGES.start}</div>
        </div>

      </div>

      <div class="main__answer-wrap">
          <div class="main__text task">Угадайте число от ${this.min} до ${this.max}</div>
          <input type="text" class="main__input inp__answer">
          <button type="button" class="main__check">Проверить</button>
        </div>

    `
  }
}
