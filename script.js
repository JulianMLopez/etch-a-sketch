const canvas = document.getElementById('canvas');
const inputNumber = document.getElementById('number');
const color = document.getElementById('input-color');
const rgb = document.getElementById('rgb');
const grayscale = document.getElementById('gray-scale');
const eraser = document.getElementById('eraser');

let paintColor = color.value;
let isRGB = false;
let isGrayscale = false;
let isEraser = false;

inputNumber.addEventListener('change', (e)=>{
    cleanCanvas();
    createGrid(e.target.value);
});

color.addEventListener('change', (e) => {
    isEraser = false;
    isGrayscale = false;
    isRGB = false;
    paintColor = e.target.value;
});

rgb.addEventListener('click', (e) => {
    isEraser = false;
    isGrayscale = false;
    isRGB = true;
});

grayscale.addEventListener('click', (e) => {
    isEraser = false;
    isRGB = false;
    isGrayscale = true;
});

eraser.addEventListener('click', (e) => {
    isRGB = false;
    isGrayscale = false;
    isEraser = true;
});

function createGrid(size){
    const grid = document.createDocumentFragment();
    canvas.style.display = 'grid';
    canvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(let i = 0; i < size * size; i++){
        createDiv(grid);
    }

    canvas.appendChild(grid);
}

function createDiv(grid){
    let div = document.createElement('div');

    div.addEventListener('mouseover', (e) => {
        if(isRGB){
            div.style.backgroundColor = paintRGB();
        } else if(isGrayscale){
            div.style.backgroundColor = paintGrayscale(div.style.backgroundColor);
        } else if(isEraser){
            div.style.backgroundColor = paintEraser();
        } else{
            div.style.backgroundColor = paintColor;
        }
    });
    grid.appendChild(div);
}

function cleanCanvas(){
    canvas.innerHTML = '';
}

function paintRGB(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgba(0, 0, 0, ${opacity + 0.1})`;
}

function paintGrayscale(color){
    if(!color.includes('rgba')) return 'rgba 0, 0, 0, 0.1'
    let opacity = Number(color.slice(-4,-1));
    return `rgba(0, 0, 0, ${opactiy + 0.1})`;
}

function paintEraser(){
    return 'transparent';
}

createGrid(inputNumber.value);