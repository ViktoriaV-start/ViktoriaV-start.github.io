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
