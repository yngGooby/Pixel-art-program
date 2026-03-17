/*
let gridArea = 16; //determines how many divs will be per side
*/
let currentMode = "draw"; //is what determins what mode we're in

let colorChoice = document.getElementById("colorWheel");
let currentColor = "black"; // base color also the var

colorChoice.addEventListener("click",()=>{ //is what changes the color on the color wheel
    currentColor = colorChoice.value;
})
colorChoice.addEventListener("change",()=>{ //this makes it so you dont click the color twice to swap colors
    currentColor = colorChoice.value;
})

let eraseColor = document.getElementById("eraser");
function erase(){
    currentColor = "white";
}
eraseColor.addEventListener("click", ()=> {
    erase();
})

let colorDropper = document.getElementById("colorSelector"); //this allows us to choose a color from anywhere on the canvas
colorDropper.addEventListener("click", ()=>{
    currentMode = "dropper";
})


let clearCells = document.getElementById("clearButton"); //this clears everything from the canvas
function clearCanvas(){
    let getCells = document.querySelectorAll(".cell");
    for(i = 0; i < getCells.length; i++){
        getCells[i].style.backgroundColor = "white";
    }
}
clearCells.addEventListener("click", ()=>{
    clearCanvas()
})

let isDrawing = false;
let cellLocation = document.getElementById("mouseLocation");

const container = document.getElementById("container"); //calls the container div in html
function createCells(num){ //function makes the grid based off gridArea
    for(i = 0; i < num*num; i++){
        let cellSize = 960 / num;

        const canvasCell = document.createElement("div"); //creates the cell
        canvasCell.className = "cell"; //class is now "cell" so we can adjust in css
        container.appendChild(canvasCell);//makes the cells appear in the browser
        
        canvasCell.style.width = `${cellSize}px`;
        canvasCell.style.height = `${cellSize}px`; // determines the width and height of the cells

        let cellColumn = (i % num) + 1; //this is used to determin mouse location
        let cellRow = Math.floor(i/num) + 1;

        canvasCell.addEventListener("mousedown", (e) => { //this colors when you click the canvas
            if(e.button === 0 && currentMode === "draw"){ //this is so we can draw on the canvas and checks if its in draw mode and we use the lmb
                canvasCell.style.backgroundColor = currentColor;
                isDrawing = true;
            }
            else if(currentMode === "dropper" && e.button === 0){//checks if we're using the dropper function and using the lmb
                currentColor = canvasCell.style.backgroundColor;
                currentMode = "draw";
            }
        })
        canvasCell.addEventListener("mouseenter", () => {
            cellLocation.textContent = cellColumn + "x" + cellRow;  //this gets our mouse cordanates around the canvas

            if(isDrawing === true){
                canvasCell.style.backgroundColor = currentColor; //this is how you draw a color when dragging the mouse while holding lmb
            }
            
        })
        canvasCell.addEventListener("dragstart", (e) => e.preventDefault()); //this is so when drawing you dont drag the entire canvas with you

    }
    document.addEventListener("mouseup", ()=> { //this stops from drawing 
        isDrawing = false;
    })
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`; //how it evenly creates cells for the fixed grid w x l
}


let changeGridSize = document.getElementById("gridSlider"); //grabs the range slider from the html
let gridSizeDisplay = document.getElementById("rangeNumberValue"); //is the display value for the range slider
let changeGridNum = document.getElementById("gridNumber"); // is the number input for the canvas size

changeGridNum.addEventListener("input",()=>{ //makes sure when using manual number input it doesnt go above the 100 cap
    if(changeGridNum.value >= 100){
        changeGridNum.value = 100;
    }
    gridSizeDisplay.textContent = changeGridNum.value; //is the display number for the range slider
    container.innerHTML = ""; //refreshes the canvas when you change the canvas size
    createCells(changeGridNum.value); //takes the input from from manual num input
})  

changeGridSize.addEventListener("input",()=>{ //is the same as the manual number input but with the range slider instead
    gridSizeDisplay.textContent = changeGridSize.value;
    container.innerHTML = "";
    createCells(changeGridSize.value);
})  
gridSizeDisplay.textContent = changeGridSize.value;

createCells(changeGridSize.value)
