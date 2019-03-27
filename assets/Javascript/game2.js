
// these are all the posible cars that can appear on the screen.
var words = ["honda", "chevy", "lamborghini", "ferrari", "lotus", "mclaren", "porsche"]

//This will create a random selection from the array of cars.
var randomWord = "";

// This will make the letters in the word its own array. It will then split it into multiple letters.
var lettersOfWord = []

// this will tell the system how many blanks to store.
var blanks = 0;

// all the blank spaces for the car company to guess.
var blanksAndCorrect = [];

// find the incorrect letters and push then into the wrong guess array
var wrongGuess = [];

//Counter to track variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;


// This is the functions you need to run the games. This will select the word that needs to be guessed.
// This function will setup all the conditions to run start guessing. This function will not be called
// again until the word is guessed correctly on you run out of attempts.
function Game() {
    //Math.random returns a number between 0 and .999. 
    //Math.floor rounds the number down.
    //The word variable is the array of cars. The length of this array is turned into an interger.
    //Once this interer is determined its selected as an index number for the word variable.
    // This is passed in to a new variable. 
    randomWord = words[Math.floor(Math.random() * words.length)];

    //The split method breaks the variable up into an array of individual letters.
    // The "" determine if it will be split into letters, words or phrases. 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //This loop creates an array with as many blanks as neccesary for the word.
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //This changes the letters in the current word id to all the blanks you will need for that word.
    document.getElementById("currentword").innerHTML = blanksAndCorrect;

}



// This resets the game score counter and calls the game command to start over
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}


//the checkletters function is called below when the game function is called. It brings the variable
// from the function and drops it in here on the letters holder. This checkletters function then
// runs a check to see if the letter is in the word. everytime a new letter is entered, the letterInWord variable resets
// to false. 
function checkLetters(letter) {
    var letterInWord = false;
    //this part checks to see if the letter is in the word. if it is, it goes down and set the letterInWord
    // variable to true. Remember this is a boolean.
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord true, it runs through here to see in what space that letter belongs. It then changes out
    // the underscore with the actual letter and puts the letter in the position it belongs. The correct answer
    // is inside the blanksAndCorrect variable.
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //If the letter is not in the word, the system pushes that letter into the wrongGuess variable. Then it decreases the 
    // guesses remaining by 1.
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}



//check to see if player won...
function complete() {
    // console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //Convert the lettersOfWord variable and blaksAndCorrect variable to a string. This allows the system to make an 
    // accurate comparison.
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        // If you win, the loop calls the reset function to go reset the script. 
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = wins;
        document.getElementById("image").src = "./assets/images/" + randomWord + ".jpg"

        //If you get the letter wrong, the system checks to see how many guesses you have remaining.
        // if the answer is 0, it adds 1 point to your score and resets the script.
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/wrongcar.jpg"
        document.getElementById("losstracker").innerHTML = losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = guessesRemaining;
}



//call start game function
Game()



//The keycode event captures the key that was pushed regardless of it being capital or lowercase.
// Once the key is depressed the variable is captured in the function.
// the fromCharCode command turns the keycode into a character. 
// The whole thing is a string that is converted to lower case.
// The letter is captures and stored as a variable.
document.onkeyup = function (event) {
    document.getElementById("image").src = "./assets/images/checkered flag.jpg"
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //once the letter is checked and captured as a variable, it is ran through another function to
    // check to see if it mathces the input.
    checkLetters(guesses);
    //the system then checks to see if you won or loss.
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}
 
var wins = 0;
var losses = 0;
var guessesRemaining = 9;
