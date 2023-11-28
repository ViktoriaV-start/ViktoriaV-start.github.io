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
