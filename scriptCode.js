/*
let gridArea = 16; //determines how many divs will be per side
*/


const container = document.getElementById("container"); //calls the container div in html
function createCells(num){ //function makes the grid based off gridArea
    for(i = 0; i < num*num; i++){
        let cellSize = Math.floor(960 / num);

        const canvasCell = document.createElement("div"); //creates the cell
        canvasCell.className = "cell"; //class is now "cell" so we can adjust in css
        container.appendChild(canvasCell);//makes the cells appear in the browser
        
        canvasCell.style.width = `${cellSize}px`;
        canvasCell.style.height = `${cellSize}px`;

        canvasCell.addEventListener("mouseenter", () => {
            canvasCell.style.backgroundColor = "red";
        })
    }
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
}
createCells(64)