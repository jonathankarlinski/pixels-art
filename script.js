const pixelBoard = document.querySelector('#pixel-board');
const colorPalette = document.querySelector('#color-palette');
const buttonRandom = document.querySelector('#random-color');

const getRandomColor = () => {
  const colorValues = new Uint8Array(3);
  crypto.getRandomValues(colorValues);
  const colors = `#${Array.from(colorValues)
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`;
  return colors;
};

const pixels = (size) => {
  for (let index = 0; index < size; index += 1) {
    const pixelsLine = document.createElement('div');
    pixelBoard.appendChild(pixelsLine).classList.add('line');
    for (let index2 = 0; index2 < size; index2 += 1) {
      const boxPixel = document.createElement('div');
      pixelsLine.appendChild(boxPixel).classList.add('pixel');
      boxPixel.classList.add('pixelBox');
    }
  }
};

colorPalette.addEventListener('click', (event) => {
  const selectColor = document.querySelector('.selected');
  const evenT = event.target;
  selectColor.classList.remove('selected');
  evenT.classList.add('selected');
});

const clickColor = () => {
  pixelBoard.addEventListener('click', (event) => {
    const selectColor = document.querySelector('.selected');
    const currentColor = window.getComputedStyle(selectColor).getPropertyValue('background-color');
    const evenT = event.target;
    evenT.style.backgroundColor = currentColor;
    if (!buttonRandom.classList.contains('selected')) {
      buttonRandom.classList.remove('selected');
    } else {
      evenT.style.backgroundColor = 'white';
    }
  });
};

const clickClean = () => {
  const clearButton = document.getElementById('clear-board');
  const pixel = document.querySelectorAll('.pixel');
  clearButton.addEventListener('click', () => {
    pixel.forEach((pixelElement) => {
      const updatedPixelElement = pixelElement;
      updatedPixelElement.style.backgroundColor = 'white';
    });
  });
};

const paletteSize = () => {
  const button = document.querySelector('#generate-board');
  button.addEventListener('click', () => {
    const boardSize = document.querySelector('#board-size').value;
    const size = parseInt(boardSize, 10);
    pixelBoard.innerHTML = '';
    if (boardSize === '') {
      alert('Board inválido!');
      pixels(5);
    } else if (size < 5) {
      pixels(5);
    } else if (size > 50) {
      alert('O limite máximo de colunas e linhas são 50!');
      pixels(5);
    } else {
      pixels(boardSize);
    }
    clickClean();
  });
};

function alterarCores() {
  const titleElement = document.getElementById('title');
  const frase = titleElement.innerText;
  const palavras = frase.split(' ');
  let resultado = '';

  palavras.forEach((palavra, i) => {
    const letras = palavra.split('');
    letras.forEach((letra) => {
      const cor = getRandomColor();
      resultado += `<span class="colorful-letter" style="color: ${cor};">${letra}</span>`;
    });
    if (i < palavras.length - 1) {
      resultado += ' ';
    }
  });

  titleElement.innerHTML = resultado;
}

const randomColors = () => {
  const color = document.querySelectorAll('.color');
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = getRandomColor();
  }
  buttonRandom.style.backgroundColor = getRandomColor();
};

window.onload = () => {
  document.querySelector('.color').classList.add('selected');
  randomColors();
  pixels(5);
  paletteSize();
  clickColor();
  clickClean();
  alterarCores();
  buttonRandom.addEventListener('click', randomColors);
  buttonRandom.addEventListener('click', alterarCores);
};
