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
