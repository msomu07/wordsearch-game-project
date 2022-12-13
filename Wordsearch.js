function goToPage(nextPage) // function to go to a different page
{
	window.location.href = nextPage;
	location.replace(nextPage);
}
//----------------------------------------------------------------------
let x1Input = document.querySelector("#x1"); // starting row
x1Input.addEventListener("input", numberEntered, false);

let y1Input = document.querySelector("#y1"); // starting column
y1Input.addEventListener("input", numberEntered, false);

let x2Input = document.querySelector("#x2"); // ending row
x2Input.addEventListener("input", numberEntered, false);

let y2Input = document.querySelector("#y2"); // ending column
y2Input.addEventListener("input", numberEntered, false);

let wordAndDirection;
var table;
var valid;
var correctWordCount = 0;

function numberEntered(e) { // numberentered
        valid.value = isValid();
}

 // database of words
 // some words taken from https://7esl.com/5-letter-words/
 var allWords = ["abate", "annual", "above", "accept", "again", "agent",
 "appear", "assume", "bank", "begin", "behind", "benefit", "believe", 
 "behave", "budget", "camera", "catch", "cause", "central", "charge",
 "choice", "color", "consume", "design", "detail", "dinner", "discuss",
 "easy", "early", "edge", "effort", "finish", "focus", "friend", "front",
 "garden", "great", "ground", "growth", "happen", "half", "health", 
 "heavy", "identify", "human", "image", "include", "increase", "kind",
 "kitchen", "large", "leader", "level", "local", "machine", "maintain",
 "major", "meeting", "minute", "modern", "never", "none", "number", 
 "occur", "office", "order", "paper", "parent", "partner", "patient",
 "player", "popular", "prevent", "protect", "provide", "quality", "quite",
 "range", "raise", "rather", "reach", "ready", "realize", "require", 
 "sign", "simple", "small", "smile", "social", "source", "stock", 
 "suffer", "table", "teacher", "thought", "travel", "until", "value",
 "voice", "watch", "weight", "whole", "whose", "worker", "writer", "young", 
 "aim", "ago", "bag","bad", "bee", "bar", "bun", "car", "cap", "cop", "duo",
 "adult", "agent", "apple", "award", "beach", "birth", "drama", "dream",
 "dress", "drink", "enemy", "entry", "faith", "admit",
 "dig", "dip", "ego", "egg", "elf", "fry", "fog", "foe", "fur",
 "gag", "gap", "gas", "gel", "gig", "got", "gum", "gut", "had",
 "ham", "hue", "icy", "jam", "jar", "jet", "jog", "joy",
 "kid", "key", "kin", "lab", "lag", "lit", "low", "map", "mat",
 "mix", "new", "not", "old", "odd", "oak", "ore", 
 "owe", "pad", "pal", "peg", "paw", "pen", "pup", "rap", "rat",
 "ran", "raw", "saw", "tee", "top", "toy",
"vow", "was", "wax", "web", "wet", "wry", "zoo", "zip", "isopod", "worm",
"Adult", "Agent", "Anger", "Apple", "Award", "Basis", "Beach", "Birth", 
"Block", "Board", "Brain", "Bread", "Break", "Brown", "Buyer", "Cause", 
"Chain", "Chair", "Chest", "Chief", "Child", "China", "Claim", "Class", 
"Clock", "Coach", "Coast", "Court", "Cover", "Cream", "Crime", "Cross",
"Crowd", "Crown", "Cycle", "Dance", "Death", "Depth", "Doubt", "Draft", 
"Drama", "Dream", "Dress", "Drink", "Drive", "Earth", "Enemy", "Entry", 
"Error", "Event", "Faith", "Fault", "Field", "Fight", "Final", "Floor", 
"Focus", "Force", "Frame", "Frank", "Front", "Fruit", "Glass", "Grant", 
"Grass", "Green", "Group", "Guide", "Heart", "Horse", "Hotel", "House", 
"Image", "Index", "Input", "Issue", "Judge", "Layer", "Level", "Light", 
"Limit", "Lunch", "Metal", "Model", "Money", "Month", "Motor", "Mouth", 
"Music", "Night", "Noise", "North", "Novel", "Nurse", "Offer", "Order", 
"Other", "Owner", "Panel", "Paper", "Party", "Peace", "Peter", "Phase", 
"Phone", "Piece", "Pilot", "Pitch", "Place", "Plane", "Plant", "Plate",
 "Point", "Pound", "Power", "Press", "Price", "Pride", "Prize", "Proof", 
 "Queen", "Radio", "Range", "Ratio", "Reply", "Right", "River", "Round", 
 "Route", "Scale", "Scene", "Scope", "Score", "Sense", "Shape", "Share", 
 "Sheep", "Sheet", "Shift", "Shirt", "Shock", "Sight", "Simon", "Skill", 
 "Sleep", "Smile", "Sound", "Space", "Speed", "Spite", "Sport", "Squad", 
 "Staff", "Stage", "Start", "State", "Steam", "Steel", "Stock", "Stone",
 "Store", "Study", "Stuff", "Style", "Sugar", "Table", "Taste", "Theme",
 "Thing", "Title", "Total", "Touch", "Tower", "Track", "Trade", "Train", 
 "Trend", "Trial", "Trust", "Truth", "Uncle", "Union", "Unity", "Value", 
 "Video", "Visit", "Voice", "Waste", "Watch", "Water", "While", "White", 
 "Whole", "Woman", "World", "Youth", "Admit"]; 

var wordList = createWordList(allWords);
var wordListCopy = [];

function createWordList(database) { // creates a list of 5 random words
	var arr = []; // temporary storage
	var same = false;
	for (let i = 0; i < 5; i++) {
		arr[i] = database[Math.floor(Math.random() * database.length)].toLowerCase();
		for (let j = 0; j < 5; j++) {
			if (i != j && arr[i] == arr[j])
				same = true;
		}
		if (same)
			arr[i] = database[Math.floor(Math.random() * database.length)];
	}
		return arr;
}

function run() { // main running method
	// creating a 2d array called table to be the wordsearch table
	table = new Array(10); // create an empty array of length n
	for (let i = 0; i < 10; i++) {
		table[i] = new Array(20); // make each element an array
		for (let j = 0; j < 20; j++) // setting each element to 0
			table[i][j] =  ".";
	}
	
	//inserting a word
	var directions = ["vertical", "horizontal", "diagonal"]; // array of directions
	printWordBank(wordList); // displays word bank on the screen
	wordAndDirection = new Array(wordList.length); // pairs a random word with
	// a random direction 
	for (let i = 0; i < wordList.length; i++) {
		wordAndDirection[i] = new Array(2);
		var word = wordList[i];
		wordListCopy[i] = wordList[i];
		var dir = directions[Math.floor(Math.random()*3)];
		wordAndDirection[i][0] = word;
		wordAndDirection[i][1] = dir;
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

function pickNewWord(word) { // picks another word if a word doesnt fit
	let i;
	for(i = 0; i < wordList.length; i++)
	{
		if(word == wordList[i])
		{
			wordList[i] == allWords[Math.floor(Math.random * (allWords.length - 1))];
			break;
		}
	}
	return wordList[i];
}

function insertWord(word, dir, table) { // puts the word in the table
	var insertTheWord = true; // boolean to check if another word is already
	// in a certain area -- if insertTheWord is false, the function shouldn't
	// put a new word in that area
	if (dir == "horizontal") { // increments the row coords
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
	if (dir == "vertical" && insertTheWord) { // increments column coords
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
	if (dir == "diagonal" && insertTheWord) { // increments row and column
		var x = Math.floor(Math.random()*(20 - word.length));
		var y = Math.floor(Math.random()*(10 - word.length));
		for (let i = 0; i < word.length; i++) {
			if (table[y + i][x + i] != ".") {
				insertTheWord = false;
				word = pickNewWord(word);
			}
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
function printWordBank(wordList) // prints the word back
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

function checkWord() // checks the user's input
{
	valid = isValid(); //checks if all are true or not
	
	if(!valid)
	{
		errorModal();
	} else {
		let isCorrect = checkDirection(x1, x2, y1, y2);
		//document.getElementById("result").innerHTML += isCorrect; 
		if(isCorrect) {
			highlight(x1, y1, x2, y2);
		}
		else
			incorrectModal();
			
		var allZero = true;	
		
		for (let i = 0; i < 5; i++) {
			if (wordListCopy[i] != 0)
				allZero = false;
		}
		if (allZero)
			winModal();
	}
}

function isValid()
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
	
	if(xStart && xEnd && yStart && yEnd && startBeforeEnd)
		return true;
	return false;
}

// all modal code is based on https://www.w3schools.com/howto/howto_css_modals.asp
function errorModal()
{
	// Get the modal
		var modal = document.getElementById("myModal");

		// Get the button that opens the modal

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// open the modal 
		modal.style.display = "block";

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
		
		document.getElementById("message").innerHTML = "ERROR -- PLEASE CHECK THAT" //errormessage
		+ "<br>" + "✧  ALL VALUES HAVE BEEN ENTERED CORRECTLY" + "<br>" +
		"✧  ALL VALUES ARE WITHIN THE GIVEN RANGE" + "<br>" +
		"✧  START VALUE COMES *BEFORE* END VALUE";
}

function incorrectModal()
{
	// Get the modal
		var modal = document.getElementById("myModal");

		// Get the button that opens the modal

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// open the modal 
		modal.style.display = "block";

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
		
		document.getElementById("message").innerHTML = "YOUR GUESS IS" +
		" INCORRECT" + "<br>" + "PLEASE CHECK VALUES AND RE-ENTER";
}

function winModal()
{
	// Get the modal
		var modal = document.getElementById("myModal2");

		// Get the button that opens the modal

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// open the modal 
		modal.style.display = "block";

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
		
		document.getElementById("win-message").innerHTML = "YOU WIN!!!";
}

function checkDirection(x1, x2, y1, y2) // finds the direction of the word
{
	let isCorrect = false;
	
	for (let i = 0; i < wordAndDirection.length; i++) //checks if the word matches a word in wordList
	{
		if(wordAndDirection[i][1] == "horizontal")
			isCorrect = checkHorizontal(wordAndDirection[i][0], x1, x2, y1, y2); //check these next
		else if(wordAndDirection[i][1] == "vertical")
			isCorrect = checkVertical(wordAndDirection[i][0], x1, x2, y1, y2);
		else if(wordAndDirection[i][1] == "diagonal")
			isCorrect = checkDiagonal(wordAndDirection[i][0], x1, x2, y1, y2);
			
		if(isCorrect)
		{
			strikeThrough(i);
			break;
		}
	}
	
	return isCorrect;
}

function checkHorizontal(word, x1, x2, y1, y2) // checks horizontal words
{
	let thisWord = "";
	
	for (let i = y1 - 1; i < y2; i++) //checks y coords, x coords are constant
	{
		if(i >= 20)
			return false;
			
		thisWord += table[x1 - 1][i];
	
		if(thisWord == word)
			return true;
	}
	
	if(thisWord != word)
		return false;
	
	return true;
}

function checkVertical(word, x1, x2, y1, y2) // checks vertical words
{
	let thisWord = "";
	
	for (let i = x1 - 1; i < x2; i++) //checks x coords, y coords are constant
	{
		if(i >= 10)
			return false;
			
		thisWord += table[i][y1 - 1];
		
		if(thisWord == word)
			return true;
	}
	
	if(thisWord != word)
		return false;
	
	return true;
}

function checkDiagonal(word, x1, x2, y1, y2) // checks diagonal words
{
	let thisWord = "";
	
	for(let i = 0; i < word.length; i++)
	{
		if(((x1 + i - 1) >= 10) || ((y1 + i - 1) >= 20))
			return false;
			
		thisWord += table[x1 + i - 1][y1 + i - 1];
		
		if(thisWord == word && x2 == (x1 + i) && y2 == (y1 + i))
			return true;
	}		
	return false;
}

function highlight(x1, y1, x2, y2) { // changes the color of a correct word on the table
	let word = "";
    //style.color and style.fontWeight idea from w3schools https://www.w3schools.com/js/js_htmldom_css.asp
    if (y1 == y2) {
        for (let i = x1-1; i < x2; i++) {
			word += table[i][y1 - 1];
            document.getElementById("cell" + i + (y1-1)).style.color = "rgb(236, 226, 208)";    
            document.getElementById("cell" + i + (y1-1)).style.fontWeight = "bold";
        }        
    }    
    
    else if (x1 == x2) {
        for (let i = y1-1; i < y2; i++) {
			word += table[x1 - 1][i];
            document.getElementById("cell" + (x1-1) + i).style.color = "rgb(236, 226, 208)";    
            document.getElementById("cell" + (x1-1) + i).style.fontWeight = "bold";
        }
    }    
    
    else {
		let length = Math.abs(x1 - x2) + 1;
        for (let i = 0; i < length; i++) {
			word += table[x1 + i - 1][y1 + i - 1];
            document.getElementById("cell" + (x1 + i - 1) + (y1 + i - 1)).style.color = "rgb(236, 226, 208)";        
            document.getElementById("cell" + (x1 + i - 1) + (y1 + i - 1)).style.fontWeight = "bold";
		}
    } 
 
	for (let i = 0; i < wordList.length; i++)
	{
		if(word == wordList[i]) {
			wordListCopy[i] = "0";
			strikeThrough(i);
		}
	}
}

function strikeThrough(wordIndex) // crosses out correct words in the word bank
{
		document.getElementById("word" + (wordIndex + 1)).style.textDecoration = "line-through";
}
