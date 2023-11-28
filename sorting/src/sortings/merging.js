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
