const size = 28;
let i = 0, j = 0
let endI = size - 1, endJ = size - 1; 
let maze = []

document.addEventListener("DOMContentLoaded", function() {	
	maze = createMatrix();
	let divMatrix = document.getElementById("game")
	createMaze(maze, divMatrix);
	randomStart();
})

document.onkeydown = (e) => {
	e = e || window.event;
	let auxI = i;
	let auxJ = j;
    if (e.keyCode == '38') {
		// up arrow
		if(inBounds(i-1, j)){
			i -= 1;
			updatePosition(auxI, auxJ);
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '40') {
		// down arrow
		if(inBounds(i+1, j)){
			i += 1;
			updatePosition(auxI, auxJ);
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '37') {
		// left arrow  
		if(inBounds(i, j-1)){
			j -= 1;
			updatePosition(auxI, auxJ);
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '39') {
		//right arrow
		if(inBounds(i, j+1)){
			j += 1;
			updatePosition(auxI, auxJ);
		}			
		else 
			alert("not cool fam");
    }
}

const randomStart = () => {
	let auxI = 0;
	let auxJ = 0;
	while(maze[auxI][auxJ] != 0){
		auxI = Math.floor((Math.random() * 100)) % size;
		auxJ = Math.floor((Math.random() * 100)) % size
	}
	i = auxI;
	j = auxJ;	
	updatePosition(i, j);
	auxI = size - 1;
	auxJ = size - 1;
	while(maze[auxI][auxJ] != 0 && auxI != i && auxJ != j){
		auxI = Math.floor((Math.random() * 100)) % size;
		auxJ = Math.floor((Math.random() * 100)) % size
	}
	endI = auxI;
	endJ = auxJ;
	let currPos = document.getElementById(`row${endI}`).childNodes;
	currPos[endJ].style.backgroundColor = "green";
}

const updatePosition = (auxI, auxJ) => {
	let prevPos = document.getElementById(`row${auxI}`).childNodes;
	prevPos[auxJ].style.backgroundColor = "white";
	let currPos = document.getElementById(`row${i}`).childNodes;
	currPos[j].style.backgroundColor = "yellow";
}

const inBounds = (i, j) => {
	if( i < 0 || i >= size || j < 0 || j >= size || maze[i][j] === 1)
		return false;
	return true;
}

const createMatrix = () => {
	let matrix = []
	for(let i = 0; i < size; i++){
		let tempArr = [];
		for(let j = 0; j < size; j++){
			let rand = Math.round(Math.random());
			tempArr = tempArr.concat(rand);
		}
		matrix[i] = tempArr;
		tempArr = [];
	}
	return matrix;
}

const createMaze = (maze, domPos) => {
	let i = 0;
	maze.forEach(row => {
		domPos.innerHTML += `<div class="row" id="row${i}"></div>`;
		createRow(row, domPos.lastChild);
		i += 1;
	})
	fillWalls();
}
const createRow = (row, domPos) => {
	let html = "";
	row.forEach(elem => {
		html = `<div class="cell"></div>`
		domPos.innerHTML += html;
	})	
}

const fillWalls = () => {
	let i, j
	for(i = 0; i < size; i += 1){
		let children = document.getElementById(`row${i}`).childNodes;
		for(j = 0; j < size; j += 1){
			if(maze[i][j] === 1){
				children[j].style.backgroundColor = "#000000"
			}
		}
	}
}
