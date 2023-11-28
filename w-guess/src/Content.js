import { Game } from './Game.js';
import {
  CLASS_BTN_NEW,
  CLASS_INPUT_FROM,
  CLASS_INPUT_TO,
  CLASS_ALERT_CLOSE,
  SELECTOR_ALERT,
  SELECTOR_MAIN
} from './config/constants.js';

export class Content {

  mainContainer = document.querySelector(SELECTOR_MAIN);
  alertContainer = null;
  rangeFrom = 1;
  rangeTo = 100;

  constructor() {

    this.mainContainer.insertAdjacentHTML('afterbegin', this._markUp());
    this.alertContainer = document.querySelector(SELECTOR_ALERT);
    this.init()
  }

  /**
   * Установить слушательей на клик по кнопке Новая Игра/ Начать игру,
   * закрыть алерт
   * ввод значения для диапазона для загадки (событие change),
   */
  init() {

    this.mainContainer.addEventListener('change', (e) => {

      // Ввод значения интервала - от
      if (e.target.classList.contains(CLASS_INPUT_FROM)) {
        let value = this.checkValue(e.target.value);
        if (value && value < this.rangeTo) {
          this.rangeFrom = value;
        } else {
          e.target.value = 1;
          this.alertContainer.classList.remove('hidden');
        }
        
      }

      // Ввод значения интервала - до
      if (e.target.classList.contains(CLASS_INPUT_TO)) {
        let value = this.checkValue(e.target.value);
        if (value && value > this.rangeFrom) {
          this.rangeTo = value;
        } else {
          e.target.value = 100;
          this.alertContainer.classList.remove('hidden');
        }
      }

    })

    this.mainContainer.addEventListener('click', (e) => {

      // Начать игру/ Новая игра
      if (e.target.classList.contains(CLASS_BTN_NEW)) {
        if (!this.game) {
          e.target.textContent = 'Новая игра';
          this.game = new Game(this.rangeFrom, this.rangeTo);
        } else {
          this.game.startNewGame(this.rangeFrom, this.rangeTo);
        }
      }

      // Закрыть алерт
      if (e.target.classList.contains(CLASS_ALERT_CLOSE)) {
        this.alertContainer.classList.add('hidden');
      }

    })
  }

  /**
   * Проверить введенное значение для диапазона
   * @param {string} value 
   * @returns {number}
   */
  checkValue(value) {
    let num = parseInt(value.trim());

    if (value < 1 || value > 1000 || !num) {
      return false;
    } 
    this.alertContainer.classList.add('hidden');
    return num;
  }

  _markUp() {
    return `
      <div class="main__header">
      <div class="main__inputs">
        <div class="main__input-wrap">
          <div class="main__text">Загадать число в интервале от:</div>
          <input type="text" class="main__input inp__from" value="1">
        </div>

        <div class="main__input-wrap">
          <div class="main__text">До:</div>
          <input type="text" class="main__input inp__to" value="100">
        </div>
      </div>
      <div class="main__alert-wrap hidden">
        <div class="main__alert">
          Допустимый диапазон - от 1 до 1000
        </div>
        <div class="main__close">
        <svg class="main__close" height="1em" viewBox="0 0 384 512"><path class="main__close" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>
      </div>
    </div>

    <button type="button" class="main__new">Начать игру</button>
    `
  }

}
