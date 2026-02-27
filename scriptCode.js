/*
let gridArea = 16; //determines how many divs will be per side
*/
const container = document.getElementById("container"); //calls the container div in html
function createCells(num){ //function makes the grid based off gridArea
    for(i = 0; i < num*num; i++){
        const divCell = document.createElement("div"); //creates the cell
        divCell.className = "cell"; //class is now "cell" so we can adjust in css
        container.appendChild(divCell);//makes the cells appear in the browser
    }
}
createCells(32)
