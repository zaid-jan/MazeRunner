const size = 28;
let i = 0, j = 0
let endI = size - 1, endJ = size - 1; 
let maze = []
let wallBreak = 10;
let countSteps = 0;
let time = 0;

document.addEventListener("DOMContentLoaded", function() {	
	maze = createMatrix();
	let divMatrix = document.getElementById("game")
	createMaze(maze, divMatrix);
	randomStart();
	displaySteps();
	displayPowers();
	setInterval(()=>{
		displayTime();
	}, 500)	
})

document.onkeydown = (e) => {
	e = e || window.event;
	let auxI = i;
	let auxJ = j;
    if (e.keyCode == '38') {
		// up arrow		
		if(inBounds(i-1, j)){	
			if(isWallBreakMove(i - 1, j)){
				wallBreakMove(auxI - 1, auxJ);
				displayPowers();
			}
			else {
				i -= 1;	
				common(auxI, auxJ);
			}			
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '40') {
		// down arrow
		if(inBounds(i+1, j)){				
			if(isWallBreakMove(i + 1, j)){
				wallBreakMove(auxI + 1, auxJ);
				displayPowers();
			}
			else {	
				i += 1;	
				common(auxI, auxJ);
			}
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '37') {
		// left arrow  
		if(inBounds(i, j-1)){					
			if(isWallBreakMove(i, j-1)){
				wallBreakMove(auxI, auxJ - 1);
				displayPowers();
			}
			else {
				j -= 1;		
				common(auxI, auxJ);
			}
		}			
		else 
			alert("not cool fam");
    }
    else if (e.keyCode == '39') {
		//right arrow		
		if(inBounds(i, j+1)){								
			if(isWallBreakMove(i, j+1)){
				wallBreakMove(auxI, auxJ + 1);
				displayPowers();
			}
			else {
				j += 1;
				common(auxI, auxJ);
			}
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
	resetPositionBackground(i, j)
	updatePosition("red");
	auxI = size - 1;
	auxJ = size - 1;
	while(maze[auxI][auxJ] != 0 && auxI != i && auxJ != j){
		auxI = Math.floor((Math.random() * 100)) % size;
		auxJ = Math.floor((Math.random() * 100)) % size
	}
	endI = auxI;
	endJ = auxJ;
	setFinalPosition(endI, endJ, "green");
}

const setFinalPosition = (endI, endJ, color) => {
	let currPos = document.getElementById(`row${endI}`).childNodes;
	currPos[endJ].style.backgroundColor = color;
}

const updatePosition = (color) => {
	let currPos = document.getElementById(`row${i}`).childNodes;
	currPos[j].style.backgroundColor = color;
}

const resetPositionBackground = (i, j, color) => {
	let prevPos = document.getElementById(`row${i}`).childNodes;
	prevPos[j].style.backgroundColor = color;
}

const inBounds = (i, j) => {
	if( i < 0 || i >= size || j < 0 || j >= size)
		return false;
	return true;
}

const isWallBreakMove = (x, y) => {
	if(maze[x][y] === 1){
		return 1;
	}
	return 0;
}

const wallBreakMove = (auxI, auxJ) => {
	console.log("i",auxI,"j",auxJ,"wallBreak", wallBreak);
	// document.getElementById("score").innerHTML += `WallBreak ${wallBreak} at ${auxI}, ${auxJ}<br>`
	if(wallBreak > 0){		
		maze[auxI][auxJ] = 0;
		wallBreak = wallBreak - 1;
		resetPositionBackground(auxI, auxJ, "white");
		updatePosition("red");
	}
	else {
		alert("ran out of powers")
		//run dfs to end game
	}
	
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

const displayPosition = () => {
	document.getElementById("score").innerHTML += `${i},${j}<br>`
}

const isGameWon = () => {
	if(i === endI && j === endJ){
		return 1;
	}
	return 0;
}

const gameWon = () => {
	alert("gameWon")
	setTimeout(() => {
		document.location.reload(true);
	}, 2000)
}

const displaySteps = () => {
	document.getElementById("steps").innerHTML = countSteps;
	
}

const displayPowers = () => {
	document.getElementById("powers").innerHTML = wallBreak;
}

const common = (auxI, auxJ) => {
	countSteps++;	
	displaySteps();		
	displayPowers();
	resetPositionBackground(auxI, auxJ, "white");
	updatePosition("red");
	if(isGameWon()){
		gameWon();
		console.log("woohooo")
	}
}

const displayTime = () => {	
	time += 1;
	document.getElementById("time").innerHTML = time;
}
