/*
let gridArea = 16; //determines how many divs will be per side
*/
let currentMode = "draw";

let colorChoice = document.getElementById("colorWheel");
let currentColor = "black";

colorChoice.addEventListener("click",()=>{
    currentColor = colorChoice.value;
})
colorChoice.addEventListener("change",()=>{
    currentColor = colorChoice.value;
})

let eraseColor = document.getElementById("eraser");
function erase(){
    currentColor = "white";
}
eraseColor.addEventListener("click", ()=> {
    erase();
})

let colorDropper = document.getElementById("colorSelector");
colorDropper.addEventListener("click", ()=>{
    currentMode = "dropper";
})


let clearCells = document.getElementById("clearButton");
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
        canvasCell.style.height = `${cellSize}px`;

        let cellColumn = (i % num) + 1;
        let cellRow = Math.floor(i/num) + 1;

        canvasCell.addEventListener("mousedown", (e) => {
            if(e.button === 0 && currentMode === "draw"){
                canvasCell.style.backgroundColor = currentColor;
                isDrawing = true;
            }
            else if(currentMode === "dropper" && e.button === 0){
                currentColor = canvasCell.style.backgroundColor;
                currentMode = "draw";
            }
        })
        canvasCell.addEventListener("mouseenter", () => {
            cellLocation.textContent = cellColumn + "x" + cellRow; 

            if(isDrawing === true){
                canvasCell.style.backgroundColor = currentColor;
            }
            
        })
        canvasCell.addEventListener("dragstart", (e) => e.preventDefault());

    }
    document.addEventListener("mouseup", ()=> {
        isDrawing = false;
    })
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
}


let changeGridSize = document.getElementById("gridSlider");
let gridSizeDisplay = document.getElementById("rangeNumberValue");
let changeGridNum = document.getElementById("gridNumber");

changeGridNum.addEventListener("input",()=>{
    if(changeGridNum.value >= 100){
        changeGridNum.value = 100;
    }
    gridSizeDisplay.textContent = changeGridNum.value;
    container.innerHTML = "";
    createCells(changeGridNum.value)
})  

changeGridSize.addEventListener("input",()=>{
    gridSizeDisplay.textContent = changeGridSize.value;
    container.innerHTML = "";
    createCells(changeGridSize.value)
})  
gridSizeDisplay.textContent = changeGridSize.value;

createCells(changeGridSize.value)
