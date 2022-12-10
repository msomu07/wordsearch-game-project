function goToPage(nextPage)
{
	window.location.href = nextPage;
	location.replace(nextPage);
}
//----------------------------------------------------------------------
let x1Input = document.querySelector("#x1");
x1Input.addEventListener("input", numberEntered, false);

let y1Input = document.querySelector("#y1");
y1Input.addEventListener("input", numberEntered, false);

let x2Input = document.querySelector("#x2");
x2Input.addEventListener("input", numberEntered, false);

let y2Input = document.querySelector("#y2");
y2Input.addEventListener("input", numberEntered, false);

let wordAndDirection;

function numberEntered(e) {
        //checkWord();
}

/*function printVals() {
        let x1 = 0;
        if(x1Input.value == Number(x1Input.value))
                x1 = Number(x1Input.value);
        if (x1 >= 0 && x1 <= 20)
			document.getElementById("box1").innerHTML = x1;
        
        let y1 = 0;
        if(y1Input.value == Number(y1Input.value))
                y1 = Number(y1Input.value);
        if (y1 >= 0 && y1 <= 10)
			document.getElementById("box2").innerHTML = y1;
        
        let x2 = 0;
        if(x2Input.value == Number(x2Input.value))
                x2 = Number(x2Input.value);
        if (x2 >= 0 && x2 <= 20)
			document.getElementById("box3").innerHTML = x2;
        
        let y2 = 0;
        if(y2Input.value == Number(y2Input.value))
                y2 = Number(y2Input.value);
        if (y2 >= 0 && y2 <= 10)
			document.getElementById("box4").innerHTML = y2;
}*/

 //printVals();

var table;
function run() { // main running method
	// creating a 2d array called table to be the wordsearch table
	table = new Array(10); // create an empty array of length n
	for (let i = 0; i < 10; i++) {
		table[i] = new Array(20); // make each element an array
		for (let j = 0; j < 20; j++) // setting each element to 0
			table[i][j] =  ".";
	}
	
	//inserting a word; slay is just a test
	var directions = ["vertical", "horizontal", "diagonal"];
	var wordList = ["worm", "isopod", "live", "laugh", "potential"];
	printWordBank(wordList);
	wordAndDirection = new Array(wordList.length); //lololol
	for (let i = 0; i < wordList.length; i++) {
		wordAndDirection[i] = new Array(2);
		var word = wordList[i];
		var dir = directions[Math.floor(Math.random()*3)];
		wordAndDirection[i][0] = word; //lololol
		wordAndDirection[i][1] = dir; //lololol
		table = insertWord(word, dir, table);
	}
	
	// putting random letters wherever there isnt a word
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 20; j++) {
			if (table[i][j] == ".")
				table[i][j] = String.fromCharCode(Math.floor(Math.random()*26+97));
		}
	}
	
	displayTable(table);
	
}

function displayTable(table) { // displays the 2d array as a table 
	var cell = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 20; j++) {
            localStorage.setItem("c", "" + table[i][j]); // stores each value via local storage
			document.getElementById("cell" + i + j).innerHTML = localStorage.getItem("c"); // puts on html
		}
	}
}

function turnBlue(i, j) {
	document.getElementById("cell" + i + j).style.color = "blue";	
	document.getElementById("cell" + i + j).style.fontWeight = "bold";	
	document.getElementById("cell" + (i) + (j+1)).style.color = "blue";	
}

function insertWord(word, dir, table) {
	var insertTheWord = true; // boolean to check if another word is already
	// in a certain area -- if insertTheWord is false, the function shouldn't
	// put a new word in that area
	if (dir == "horizontal") {
		var x = Math.floor(Math.random()*(20 - word.length));
		var y = Math.floor(Math.random()*10)
		for (let i = 0; i < word.length; i++) {
			if (table[y][x + i] != ".")
				insertTheWord = false;
		}
		if (insertTheWord) {
			for (let i = 0; i < word.length; i++) 
				table[y][x + i] = word[i];
		}
		else
			insertWord(word, dir, table)
		return table;
	}
	if (dir == "vertical" && insertTheWord) {
		var x = Math.floor(Math.random()*20);
		var y = Math.floor(Math.random()*(10 - word.length));
		for (let i = 0; i < word.length; i++) {
			if (table[y + i][x] != ".")
				insertTheWord = false;
		}
		if (insertTheWord) {
			for (let i = 0; i < word.length; i++) 
				table[y + i][x] = word[i];
		}
		else
			insertWord(word, dir, table)
		return table;
	}
	if (dir == "diagonal" && insertTheWord) {
		var x = Math.floor(Math.random()*(20 - word.length));
		var y = Math.floor(Math.random()*(10 - word.length));
		for (let i = 0; i < word.length; i++) {
			if (table[y + i][x + i] != ".")
				insertTheWord = false;
		}
		if (insertTheWord) {
			for (let i = 0; i < word.length; i++) 
				table[y + i][x + i] = word[i];
		}
		else
			insertWord(word, dir, table)
		return table;
	}
}

//----------------------------------------------------------------------
function printWordBank(wordList)
{
	document.getElementById("word1").innerHTML = wordList[0];
	document.getElementById("word2").innerHTML = wordList[1];
	document.getElementById("word3").innerHTML = wordList[2];
	document.getElementById("word4").innerHTML = wordList[3];
	document.getElementById("word5").innerHTML = wordList[4];
}

let x1 = Number(x1Input.value);
let x2 = Number(x2Input.value);
let y1 = Number(y1Input.value);
let y2 = Number(y2Input.value);

let valid = true;

function checkWord()
{
	let xStart = false;
	let xEnd = false;
	let yStart = false;
	let yEnd = false;
	let startBeforeEnd = false;
	
	if(x1Input.value == Number(x1Input.value)) //idk what this does i just copied ur code
		x1 = Number(x1Input.value);
    if (x1 >= 1 && x1 <= 10) //checks if valid
		xStart = true;
			
	if(y1Input.value == Number(y1Input.value)) //repeat for others
		y1 = Number(y1Input.value);
	if (y1 >= 1 && y1 <= 20)
		yStart = true;

	if(x2Input.value == Number(x2Input.value))
		x2 = Number(x2Input.value);
	if (x2 >= 1 && x2 <= 10)
		xEnd = true;
        
	if(y2Input.value == Number(y2Input.value))
		y2 = Number(y2Input.value);
	if (y2 >= 1 && y2 <= 20)
		yEnd = true;
		
	if(x1 <= x2 && y1 <= y2) //checks if the start value comes before end value
		startBeforeEnd = true;
		
	/*document.getElementById("result").innerHTML += "" + x1 + " " + x2 + " " + y1 + " " + y2 +
	"<br>" + "<br>";
    document.getElementById("result").innerHTML += "" + xStart + xEnd + yStart +
    yEnd + "<br>" + "<br>"; //prints for checking*/  
    
	valid = isValid(xStart, xEnd, yStart, yEnd, startBeforeEnd); //checks if all are true or not
	
	if(!valid)
	{
		// Get the modal
		var modal = document.getElementById("myModal");

		// Get the button that opens the modal

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		document.getElementById("button").onclick = function() {
		  modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
			modal.style.display = "none";
		  }
		}
		
		document.getElementById("error-message").innerHTML = "ERROR -- PLEASE CHECK THAT" //errormessage
		+ "<br>" + "✧  ALL VALUES HAVE BEEN ENTERED CORRECTLY" + "<br>" +
		"✧  ALL VALUES ARE WITHIN THE GIVEN RANGE" + "<br>" +
		"✧  START VALUE COMES *BEFORE* END VALUE";
		
	} else {
		let isCorrect = checkDirection(x1, x2, y1, y2);
		//document.getElementById("result").innerHTML += isCorrect; 
		if(isCorrect)
			highlight(x1, y1, x2, y2);
	}
}

function isValid(xStart, xEnd, yStart, yEnd, startBeforeEnd)
{
	if(xStart && xEnd && yStart && yEnd && startBeforeEnd)
		return true;
	return false;
}

function checkDirection(x1, x2, y1, y2)
{
	let isCorrect = false;
	
	for (let i = 0; i < wordAndDirection.length; i++) //checks if the word matches a word in wordList
	{
		//document.getElementById("result").innerHTML += wordAndDirection[i][0] + " " + wordAndDirection[i][1] + " ";
		if(wordAndDirection[i][1] == "horizontal")
		{
			//document.getElementById("result").innerHTML += wordAndDirection[i][0];
			isCorrect = checkHorizontal(wordAndDirection[i][0], x1, x2, y1, y2); //check these next
			//document.getElementById("result").innerHTML += isCorrect;
		}
		else if(wordAndDirection[i][1] == "vertical")
		{
			//document.getElementById("result").innerHTML += wordAndDirection[i][0];
			isCorrect = checkVertical(wordAndDirection[i][0], x1, x2, y1, y2);
			//document.getElementById("result").innerHTML += isCorrect;
		}
		else if(wordAndDirection[i][1] == "diagonal")
		{
			//document.getElementById("result").innerHTML += wordAndDirection[i][0];
			isCorrect = checkDiagonal(wordAndDirection[i][0], x1, x2, y1, y2);
			//document.getElementById("result").innerHTML += isCorrect;
		}
			
		//document.getElementById("result").innerHTML += "<br>";
		
		if(isCorrect)
		{
			strikeThrough(i);
			break;
		}
	}
	
	return isCorrect;
}

function checkHorizontal(word, x1, x2, y1, y2)
{
	//document.getElementById("result").innerHTML += "horiz ";
	let thisWord = "";
	
	for (let i = y1 - 1; i < y2; i++) //checks y coords, x coords are constant
	{
		if(i >= 20)
			return false;
			
		thisWord += table[x1 - 1][i];
		//document.getElementById("result").innerHTML += "" + thisWord;
	
		if(thisWord == word)
			return true;
	}
	
	if(thisWord != word)
		return false;
	
	return true;
}

function checkVertical(word, x1, x2, y1, y2)
{
	//document.getElementById("result").innerHTML += "vert ";
	let thisWord = "";
	
	for (let i = x1 - 1; i < x2; i++) //checks x coords, y coords are constant
	{
		if(i >= 10)
			return false;
			
		thisWord += table[i][y1 - 1];
		//document.getElementById("result").innerHTML += "" + thisWord;
		
		if(thisWord == word)
			return true;
	}
	
	if(thisWord != word)
		return false;
	
	return true;
}

function checkDiagonal(word, x1, x2, y1, y2)
{
	//document.getElementById("result").innerHTML += "diag ";
	let thisWord = "";
	
	for(let i = 0; i < word.length; i++)
	{
		if(((x1 + i - 1) >= 10) || ((y1 + i - 1) >= 20))
			return false;
			
		thisWord += table[x1 + i - 1][y1 + i - 1];
		//document.getElementById("result").innerHTML += thisWord;
		
		if(thisWord == word)
			return true;
	}		
		
	if(thisWord != word)
		return false;
	
	return true;
}

function highlight(x1, y1, x2, y2) {
	let word = "";
    //style.color and style.fontWeight idea from w3schools https://www.w3schools.com/js/js_htmldom_css.asp
    if (y1 == y2) {
        for (let i = x1-1; i < x2; i++) {
			word += table[i][y1 - 1];
            document.getElementById("cell" + i + (y1-1)).style.color = "rgb(213, 185, 178)";    
			document.getElementById("cell" + i + (y1-1)).style.textShadow = "2px 2px 5px rgb(162, 103, 105)";  
            document.getElementById("cell" + i + (y1-1)).style.fontWeight = "bold";
        }        
    }    
    
    else if (x1 == x2) {
        for (let i = y1-1; i < y2; i++) {
			word += table[x1 - 1][i];
            document.getElementById("cell" + (x1-1) + i).style.color = "rgb(213, 185, 178)";    
			document.getElementById("cell" + (x1-1) + i).style.textShadow = "2px 2px 5px rgb(162, 103, 105)";    
            document.getElementById("cell" + (x1-1) + i).style.fontWeight = "bold";
        }
    }    
    
    else {
		let length = Math.abs(x1 - x2) + 1;
		document.getElementById("result").innerHTML += length;
        for (let i = 0; i < length; i++) {
			word += table[x1 + i - 1][y1 + i - 1];
            document.getElementById("cell" + (x1 + i - 1) + (y1 + i - 1)).style.color = "rgb(213, 185, 178)";    
			document.getElementById("cell" + (x1 + i - 1) + (y1 + i - 1)).style.textShadow = "2px 2px 5px rgb(162, 103, 105)";     
            document.getElementById("cell" + (x1 + i - 1) + (y1 + i - 1)).style.fontWeight = "bold";
		}
    } 

	//document.getElementById("result").innerHTML += word;   
	for (let i = 0; i < wordList.length; i++)
	{
		if(word == wordList[i])
			strikeThrough(i);
	}
}

function strikeThrough(wordIndex)
{
		//document.getElementById("result").innerHTML += "lol";
		document.getElementById("word" + (wordIndex + 1)).style.textDecoration = "line-through";
}