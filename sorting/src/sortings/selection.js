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
