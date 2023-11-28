'use strict';

// Начальные коэффициенты для расчета координат сдвига текста
let topStepX = 1;
let topStepY = 0;

let bottomStepX = 1;
let bottomStepY = 1;


const img = new Image();

// Контекст для canvas
let ctx = null;

/**
 * Генерация мема
 */
function generateMeme() {
  // на время генерации убрать слушателей событий change и click
  main.removeEventListener('change', handleChange);
  main.removeEventListener('click', handleClick);

  ctx = canvas.getContext('2d');

  if (img.width > img.height) {
    canvas.classList.add('horizontal');
    canvas.classList.remove('vertical');
  } else {
    canvas.classList.remove('horizontal');
    canvas.classList.add('vertical');
  }

  canvas.width = img.width;
  canvas.height = img.height;

  // Очистить canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Нарисовать картинку
  ctx.drawImage(img, 0, 0);

  // Нарисовать текст
  drawText(ctx, +topTextSizeInput.value, 'top');
  drawText(ctx, +bottomTextSizeInput.value, 'bottom');

  //---------------------------------------------------------

  // Установить слушателей событий change и click с задержкой
  let timerChange = setTimeout(main.addEventListener('change', handleChange), 500);
  clearTimeout(timerChange);

  let timerClick = setTimeout(main.addEventListener('click', handleClick), 500);
  clearTimeout(timerClick);

}

/**
 * Валидация данных из инпутов, если валидация не пройдена - показ ошибки
 * @param {object} file 
 * @param {string} topText 
 * @param {string} bottomText 
 * @returns {boolean}
 */
function validate(file, topText, bottomText) {
  alert.textContent = '';
  alert.classList.remove('error');
  alert.classList.add('invisible');

  if (!file) {
    alert.textContent = messages.noFile;
    alert.classList.add('error');
    alert.classList.remove('invisible');
    spinner.classList.add('invisible');
    return false;
  }
  if (file.type != 'image/gif' && file.type != 'image/jpeg' && file.type != 'image/png') {
    alert.textContent = messages.errorFile;
    alert.classList.add('error');
    alert.classList.remove('invisible');
    spinner.classList.add('invisible');
    return false;
  }

  let regexp = /^[\w а-яА-ЯЁёё\$?!.,;:-]+$/;

  if(!regexp.test(topText) || !regexp.test(bottomText)) {
    alert.textContent = messages.errorText;
    alert.classList.add('error');
    alert.classList.remove('invisible');
    spinner.classList.add('invisible');
    return false;
  }

  return true;
}

/**
 * Вернуть размер шрифта в зависимости от установленного canvas.width и значения из инпута для размера текста
 * @param {number} width 
 * @param {number} size 
 * @returns {number}
 */
function getFontSize(width, size) {

  let fontSize = width * 0.11;
  if (size >= 0 && size < 10) {
    fontSize = width * 0.05;
  } else if (size >= 10 && size < 20) {
    fontSize = width * 0.06;
  } else if (size >= 20 && size < 30) {
    fontSize = width * 0.08;
  } else if (size >= 30 && size < 40) {
    fontSize = width * 0.09;
  }else if (size >= 40 && size < 50) {
    fontSize = width * 0.11;
  }else if (size >= 50 && size < 60) {
    fontSize = width * 0.14;
  }else if (size >= 60 && size < 70) {
    fontSize = width * 0.15;
  } else if (size >= 70 && size < 80) {
    fontSize = width * 0.16
  } else if (size >= 80 && size < 90) {
    fontSize = width * 0.17;
  } else if (size >= 90 && size <= 100) {
    fontSize = width * 0.18;
  }

  return fontSize;
}

/**
 * Запуск отрисовки текста: нижний текст отрисовывается в одну строку,
 * для верхнего текста вызывается ф-ция wrapText для отрисовки в несколько строк при необходимости
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} value 
 * @param {string} line 
 */
function drawText(ctx, value, line) {

  ctx.fillStyle = document.querySelector('input[type="radio"]:checked')?.value ?? 'white';
  ctx.strokeStyle = 'black';
  ctx.textAlign = 'center'; //Possible values: start (default), end, left, right, center

  let size = getFontSize(canvas.width, value);
  ctx.font = `700 ${size}px Montserrat`;
  ctx.textBaseline = 'top';

  switch(line) {
    case ('top'):
      let coordinatesTop = getCoordinates(size, 'top');
      let topX = coordinatesTop.x;
      let topY = coordinatesTop.y;
      wrapText(ctx, topTextInput.value, topX, topY, canvas.width, size)
      break;
    case ('bottom'): 
      let coordinatesBottom = getCoordinates(size, 'bottom');
      let bottomX = coordinatesBottom.x;
      let bottomY = coordinatesBottom.y;
      ctx.fillText(bottomTextInput.value, bottomX, bottomY, canvas.width);
      break;
  }
}

/**
 * При наступлении события change в инпуте - запустить генерацию мема
 * @param {Event} e 
 */
function handleChange(e) {
  if (e.target.tagName == 'INPUT') {
    if (img.src) generateMeme();
  }
}

/**
 * При наступлении события click на кнопке сдвига текста - обработать данные и запустить генерацию мема
 * @param {Event} e 
 */
function handleClick(e) {

  if (e.target.classList.contains('arrow')) {

    if (e.target.getAttribute('data-name') == 'bottom-up') {
      if (bottomStepY > 0.1) {
        bottomStepY = bottomStepY - 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'bottom-down') {
      if (bottomStepY < 1) {
        bottomStepY = bottomStepY + 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'top-up') {
      console.log()
      if (topStepY > 0.1) {
        topStepY = topStepY - 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'top-down') {
      if (topStepY < 0.9) {
        topStepY = topStepY + 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'top-right') {
      if (topStepX < 1.6) {
        topStepX = topStepX + 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'top-left') {
      if (topStepX > 0.5) {
        topStepX = topStepX - 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'bottom-right') {
      if (bottomStepX < 1.6) {
        bottomStepX = bottomStepX + 0.1;
        generateMeme();
      }
    }

    if (e.target.getAttribute('data-name') == 'bottom-left') {
      if (bottomStepX > 0.5) {
        bottomStepX = bottomStepX - 0.1;
        generateMeme();
      }
    }

  }
}

/**
 * Вернуть коогдинаты в зависимости от установленных коэффициентов (для сдвига вверх/вниз/впарво/влево)
 * @param {number} size 
 * @param {string} line 
 * @returns {object}
 */
function getCoordinates(size, line) {

  let result = {}

    switch (line) {
      case ('top'):
        result.x = ((canvas.width) / 2) * topStepX;
        result.y = (canvas.height - size) * topStepY;
      break;
      case ('bottom'):
        result.x = (canvas.width / 2) * bottomStepX;
        result.y = (canvas.height - size) * bottomStepY;
      break;
      default:
        result.x = 0;
        result.y = 0;
    }

  return result;
}

/**
 * Разбить текст на строки и орисовать
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} text 
 * @param {number} marginLeft 
 * @param {number} marginTop 
 * @param {number} maxWidth 
 * @param {number} lineHeight 
 */
function wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight)
    {
        let words = text.split(" ");
        let countWords = words.length;
        let line = "";
        for (let n = 0; n < countWords; n++) {
            let testLine = line + words[n] + " ";
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
              ctx.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        ctx.fillText(line, marginLeft, marginTop);
    }


// Старт при наступлении события DOMContentLoaded,
// Установка основных слушателей: клик на кнопку Создать,
// клик на кнопку Загрузить,
// клик на кнопку 
  window.addEventListener('DOMContentLoaded', () => {

    // Начальный текст
    topTextInput.value = 'Верхний текст';
    bottomTextInput.value = 'Нижний текст';

    // Слушатель события клика на кнопку СОЗДАТЬ
    generateBtn.addEventListener('click', () => {

      let file = imgInput.files[0];

      let topText = topTextInput.value.trim().slice(0, 250);
      let bottomText = bottomTextInput.value.trim().slice(0, 250);

      if (validate(file, topText, bottomText)) {

        spinner.classList.remove('invisible');

        const reader = new FileReader();

        try {
          reader.readAsDataURL(file);
          reader.onload = () => {

            img.src = reader.result;
            img.onload = () => {
              generateMeme();
              spinner.classList.add('invisible');
              disposition.classList.remove('hidden');
              exportBtn.classList.remove('invisible');
              clearBtn.classList.remove('invisible');
            };
          };
        } catch (err) {
          alert.textContent = messages.errorReader;
          alert.classList.add('error');
          alert.classList.remove('invisible');
          spinner.classList.add('invisible');
        }

      }
    });

    // Слушатель события клика на кнопку Загрузить
    exportBtn.addEventListener('click', e => {
      let img = canvas.toDataURL('image/png');
      let link = document.createElement("a");
      link.download = 'New-meme';
      link.href = img;
      link.click();
    })

    // Слушатель события клика на кнопку Очистить
    clearBtn.addEventListener('click', e => {
      disposition.classList.add('hidden');
      exportBtn.classList.add('invisible');
      clearBtn.classList.add('invisible');
      
      topStepX = 1;
      topStepY = 0;
      bottomStepX = 1;
      bottomStepY = 1;

      topTextInput.value = 'Верхний текст';
      bottomTextInput.value = 'Нижний текст';
      bottomTextSizeInput.value = 50;
      topTextSizeInput.value = 50;
      imgInput.value = '';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      img.src = '';

    })
  });
