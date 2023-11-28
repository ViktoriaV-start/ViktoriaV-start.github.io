'use strict';

const messages = {
  errorFile: 'Используйте изображение в форматах jpeg, png, gif',
  noFile: 'Загрузите файл',
  errorText: 'Используйте для текста буквы, цифры и знаки препинания',
  errorReader: 'Ошибка при чтении файла'
}

const main = document.querySelector('.main');
const disposition = document.querySelector('.disposition');
const topTextInput = document.querySelector('.inputs__top-text');
const bottomTextInput = document.querySelector('.inputs__bottom-text');
const topTextSizeInput = document.querySelector('.inputs__top-size');
const bottomTextSizeInput = document.querySelector('.inputs__bottom-size');
const imgInput = document.querySelector('.inputs__image');
const generateBtn = document.querySelector('.inputs__btn');
const alert = document.querySelector('.alert');
const exportBtn = document.querySelector('.export');
const clearBtn = document.querySelector('.clear');
const spinner = document.querySelector('.spinner');
const canvas = document.querySelector('.canvas');
