/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// Bubble Sort Lặp qua các phần tử và hoán đổi cặp phần tử nếu chúng không theo đúng thứ tự. Lặp lại quá trình cho đến khi mảng được sắp xếp.

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const arrayB = [64, 34, 25, 12, 22, 11, 90];

console.log('Bubble Sort:', bubbleSort(arrayB));

// Selection Sort: Tìm phần tử nhỏ nhất trong mảng và đổi nó với phần tử đầu tiên, sau đó lặp lại cho phần còn lại của mảng.

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

const arrayS = [64, 25, 12, 22, 11];
console.log('Selection Sort:', selectionSort(arrayS));

// Lấy từng phần tử và chèn nó vào đúng vị trí trong phần đã được sắp xếp của mảng

function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const arrayI = [12, 11, 13, 5, 6];
console.log('Insertion Sort:', insertionSort(arrayI));

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const arrayQ = [10, 7, 8, 9, 1, 5];
console.log('Quick Sort:', quickSort(arrayQ));

const arraySort = [12, 11, 13, 5, 6];

console.log(
  'Array Sort:',
  arraySort.sort((a, b) => a - b)
);
