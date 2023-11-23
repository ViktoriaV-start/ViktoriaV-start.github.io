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

/**
 * ПУЗЫРЬКОВАЯ СОРТИРОВКА
 */
function bubbleSort() {
  for (let i = 0; i < n - 1; i++) {

    for (let j = 0; j < n - i - 1; j++) {


      animate(bars[j], barsHeight[j], p1).then((id) => clearTimeout(id)); // первый элемент - один цвет
      animate(bars[j + 1], barsHeight[j + 1], p2).then((id) => clearTimeout(id));  // второй элемент - другой цвет

      if (barsHeight[j] > barsHeight[j + 1]) {
        // поменять местами, если левый больше правого
        [barsHeight[j], barsHeight[j + 1]] = [barsHeight[j + 1], barsHeight[j]];

        // отметить цветом при смене положения
        animate(bars[j], barsHeight[j], p2).then((id) => clearTimeout(id));
        animate(bars[j + 1], barsHeight[j + 1], p1).then((id) => clearTimeout(id));
      }

      // вернуть общий цвет
      animate(bars[j], barsHeight[j], p).then((id) => clearTimeout(id));
      animate(bars[j + 1], barsHeight[j + 1], p).then((id) => clearTimeout(id));
    }
    // новый цвет отсортированному элементу
    animate(bars[n - 1 - i], barsHeight[n - 1 - i], sorted).then((id) => clearTimeout(id));
  }
  // новый цвет оставшемуся элементу
  animate(bars[0], barsHeight[0], sorted).then((id) => clearTimeout(id));
}

/**
 * СОРТИРОВКА ВЫБОРОМ
 */
function selectionSort() {
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    animate(bars[i], barsHeight[i], p2).then((id) => clearTimeout(id));

    // Найти индекс минимального значения
    for (let j = n - 1; j > i; j--) {
      animate(bars[j], barsHeight[j], p1).then((id) => clearTimeout(id));

      if (barsHeight[j] < barsHeight[min]) {
        animate(bars[min], barsHeight[min], p).then((id) => clearTimeout(id));
        min = j;
        animate(bars[min], barsHeight[min], p2).then((id) => clearTimeout(id));
      };

      if (j !== min) {
        animate(bars[j], barsHeight[j], p).then((id) => clearTimeout(id));
      }
    }

    animate(bars[i], barsHeight[i], p1).then((id) => clearTimeout(id));
    animate(bars[min], barsHeight[min], p2).then((id) => clearTimeout(id));

  //поменять местами в массииве значений минимальное значение со значением на i-той позиции
    [barsHeight[i], barsHeight[min]] = [barsHeight[min], barsHeight[i]];

    //выделить цветам колонки, которые меняются местами
    animate(bars[i], barsHeight[i], p2).then((id) => clearTimeout(id));
    animate(bars[min], barsHeight[min], p1).then((id) => clearTimeout(id));

    // новый цвет отсортированному элементу
    animate(bars[i], barsHeight[i], sorted).then((id) => clearTimeout(id));

    // вернуть общий цвет перемещенному элементу, если его индекс не совпадает с min
    if (min != i) animate(bars[min], barsHeight[min], p).then((id) => clearTimeout(id));
  }
  // новый цвет оставшемуся элементу
  animate(bars[n - 1], barsHeight[n - 1], sorted).then((id) => clearTimeout(id));
}

/**
 * СОРТИРОВКА ВСТАВКАМИ
 */
function insertionSort() {
  for (let i = 1; i < n; i++) {

    // значение  по текущему индексу
    let current = barsHeight[i];
    animate(bars[i], barsHeight[i], p2).then((id) => clearTimeout(id));
    let j = i - 1;
  
    for (; j >= 0 && barsHeight[j] > current; j--) {

      // присвоить на правую позицию от j значение по индексу j
      barsHeight[j + 1] = barsHeight[j];

      animate(bars[j], barsHeight[j], p1).then((id) => clearTimeout(id));
      animate(bars[j + 1], barsHeight[j + 1], p2).then((id) => clearTimeout(id));
      animate(bars[j + 1], barsHeight[j + 1], sorted).then((id) => clearTimeout(id));
      animate(bars[j], barsHeight[j], sorted).then((id) => clearTimeout(id));
      
    }

    // Вставить текущее значение
    barsHeight[j + 1] = current;

    animate(bars[i], barsHeight[i], p1).then((id) => clearTimeout(id));
    animate(bars[i], barsHeight[i], sorted).then((id) => clearTimeout(id));
    animate(bars[j + 1], barsHeight[j + 1], p2).then((id) => clearTimeout(id));
    animate(bars[j + 1], barsHeight[j + 1], sorted).then((id) => clearTimeout(id));
  }
}

/**
 * // СОРТИРОВКА СЛИЯНИЕМ
 * @param {number} start 
 * @param {number} end 
 * @returns 
 */
function mergeSort(start = 0, end = n - 1) {
  if (start >= end) {
    return;
  }
  let middle = Math.floor((start + end) / 2);
  mergeSort(start, middle);
  mergeSort(middle + 1, end);
  merge(start, end);
}

function merge(start, end) {
  let start1 = start;
  let end1 = Math.floor((start + end) / 2);

  let start2 = end1 + 1;
  let end2 = end;
  let arr = [];

  while (start1 <= end1 && start2 <= end2) {
    if (barsHeight[start1] <= barsHeight[start2]) {
      animate(bars[start1], barsHeight[start1], p1).then((id) => clearTimeout(id));
      arr.push(barsHeight[start1]);
      start1++;
    } else {
      arr.push(barsHeight[start2]);
      animate(bars[start2], barsHeight[start2], p2).then((id) => clearTimeout(id));
      start2++;
    }
  }
  while (start1 <= end1) {
    animate(bars[start1], barsHeight[start1], p1).then((id) => clearTimeout(id));
    arr.push(barsHeight[start1]);
    start1++;
  }
  while (start2 <= end2) {
    arr.push(barsHeight[start2]);
    animate(bars[start2], barsHeight[start2], p2).then((id) => clearTimeout(id));
    start2++;
  }

  //цвет для отсортированного массива
  for (let i = 0; i < arr.length; i++) {
    barsHeight[start + i] = arr[i];
    animate(bars[start + i], barsHeight[start + i], sorted).then((id) => clearTimeout(id));
  }
}


/**
 * БЫСТРАЯ СОРТИРОВКА
 * @param {number} start 
 * @param {number} end 
 * @returns 
 */
function quickSort(start = 0, end = n - 1) {
  if (start >= end) {
    return;
  }

  for (let m = start; m <= end; m++) {
    animate(bars[m], barsHeight[m], p2).then((id) => clearTimeout(id));
  }
  for (let m = start; m <= end; m++) {
    animate(bars[m], barsHeight[m], p).then((id) => clearTimeout(id));
  }

  // Получить индекс опорного элемента
  let index = partition(start, end);

  // Рекурсивный вызов ф-ции quickSort для левой и правой части
  quickSort(start, index - 1);
  quickSort(index + 1, end);
}

/**
 * Сортировка отдельной части и возврат срединного индекса, слева от которого
 * элементы меньше, справа - больше
 * @param {number} start 
 * @param {number} end 
 * @returns {number}
 */
function partition(start, end){
  // Опорное значение - end
  const pivotValue = barsHeight[end];
  animate(bars[end], barsHeight[end], sorted).then((id) => clearTimeout(id));

  // Опорный индекс - start, чтобы отслеживать «среднее» положение,
  //когда все элементы слева меньше, а все элементы справа больше, чем pivotValue
  let pivotIndex = start; 
  for (let i = start; i < end; i++) {
    animate(bars[i], barsHeight[i], p1).then((id) => clearTimeout(id));
    animate(bars[pivotIndex], barsHeight[pivotIndex], p2).then((id) => clearTimeout(id));
    
      if (barsHeight[i] < pivotValue) {
      // Поменять элементы местами и отметить цветом смену позиции
      [barsHeight[i], barsHeight[pivotIndex]] = [barsHeight[pivotIndex], barsHeight[i]];
      animate(bars[i], barsHeight[i], p2).then((id) => clearTimeout(id));
      animate(bars[pivotIndex], barsHeight[pivotIndex], p1).then((id) => clearTimeout(id));
      animate(bars[i], barsHeight[i], p).then((id) => clearTimeout(id));
      animate(bars[pivotIndex], barsHeight[pivotIndex], sorted).then((id) => clearTimeout(id));
      // Перейти к следующему элементу
      pivotIndex++;
      } else {
        animate(bars[i], barsHeight[i], p).then((id) => clearTimeout(id));
      }
  }

  // На место опорного индекса pivotIndex поставить элемент с опорным значением pivotValue (поменять местами),
  // то есть опорный элемент оказывается в середине
  animate(bars[pivotIndex], barsHeight[pivotIndex], p1).then((id) => clearTimeout(id));
  animate(bars[end], barsHeight[end], p2).then((id) => clearTimeout(id));
  [barsHeight[pivotIndex], barsHeight[end]] = [barsHeight[end], barsHeight[pivotIndex]];
  animate(bars[pivotIndex], barsHeight[pivotIndex], sorted).then((id) => clearTimeout(id));
  animate(bars[end], barsHeight[end], sorted).then((id) => clearTimeout(id));

  return pivotIndex;
};
