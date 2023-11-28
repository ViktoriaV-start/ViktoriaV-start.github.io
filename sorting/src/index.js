'use strict';

const diagram = document.querySelector(".diagram");
const nav = document.querySelector('.nav');
const sortBtn = document.querySelector('.sort-btn');
const sortStop = document.querySelector('.sort-stop');
const newArrBtn = document.querySelector('.controls__array')
const speedRange = document.getElementById('speed');
const sizeRange = document.getElementById("size");
let sortType = 'bubble';

// Цвета
const p = "#f8c4c4";
const p1 = "#ff8ba0";
const p2 = '#B03C72';
const sorted = "#e41f7b";

// Колонки
let barsHeight = [];
let bars = [];
let n = 25;
let newWidth = 2;

// Скорость, задержка для 1-ой анимации 1-го элемента, общая задержка
let speed = 50; 
let delay = 10000 / (Math.floor(n / 10) * speed);
let c = 0;

let timeoutId = null;

generateNewArray();
init();

/**
 * Установка основных слушателей событий и запуск действий для них
 */
function init() {

  // Слушатель события для выбора типа сортировки
  nav.addEventListener('click', changeSortType);

  sortStop.addEventListener('click', () => {
    nav.addEventListener('click', changeSortType)
    document.getElementById("size").disabled = false;
    document.getElementById("speed").disabled = false;
    sortBtn.classList.remove('invisible');
    sortStop.classList.add('invisible');
    newArrBtn.disabled = false;
    c = 0;
    generateNewArray();

  });

  // Слушатель события для старта сортировки
  sortBtn.addEventListener("click", () => {
    nav.removeEventListener('click', changeSortType)
    sortBtn.classList.add('invisible');
    sortStop.classList.remove('invisible');
    newArrBtn.disabled = true;
    document.getElementById("size").disabled = true;
    document.getElementById("speed").disabled = true;

    switch (sortType) {
      case "bubble":
        bubbleSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "merge":
        mergeSort();
        break;
      case "quick":
        quickSort();
        break;
      default:
        bubbleSort();
  }

    timeoutId = setTimeout(function () {
      nav.addEventListener('click', changeSortType)
      document.getElementById("size").disabled = false;
      document.getElementById("speed").disabled = false;
      sortBtn.classList.remove('invisible');
      sortStop.classList.add('invisible');
      newArrBtn.disabled = false;
      c = 0;
    }, c);
  })

  // Слушатель события для генерации нового массива
  newArrBtn.addEventListener('click', generateNewArray);

  // Слушатель события в range - изменение скорости
  speedRange.addEventListener('input', () => {
    speed = speedRange.value;
    delay = 10000 / (Math.floor(n / 10) * speed);
  });

  // Слушатель события в range - изменение размера массива
  sizeRange.addEventListener('input', () => {
    n = sizeRange.value;
    newWidth = 70 / n;
    generateNewArray();
  });

}

/**
 * Действие при клике на тип сортировки
 * @param {Event} e 
 */
function changeSortType(e) {
    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    sortType = e.target.getAttribute('data-name');
    generateNewArray();
}

/**
 * Генерация рандомного числа
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Генерация массива для сортировки и отображение на странице
 */
function generateNewArray() {
  clearTimeout(timeoutId);
  document.getElementById("size").disabled = false;
  document.getElementById("speed").disabled = false;
  c = 0;
  diagram.innerHTML = "";

  for (let i = 0; i < n; i++) {

    barsHeight[i] = randomNumber(100, 450);

    bars[i] = document.createElement("div");
    bars[i].classList.add("bar");
    diagram.appendChild(bars[i]);
    bars[i].style.height = barsHeight[i] + "px";
    bars[i].style.width = newWidth + "%";
  }
  // стабилизатор диаграммы
  let empty = document.createElement("div");
  empty.classList.add("empty");
  diagram.appendChild(empty);

};

/**
 * Визуализация - установить высоту и цвет элементу-колонке
 * @param {HTMLElement} bar 
 * @param {number} height 
 * @param {string} color 
 */
const animate = (bar, height, color) => {
  return new Promise((resolve) => {
    let timerId = setTimeout(() => {
      bar.style.height = height + "px";
      bar.style.backgroundColor = color;
      resolve(timerId);
    }, (c += delay));
  })

};
