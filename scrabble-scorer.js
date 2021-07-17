// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let prompt;

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `\nPoints for '${word[i]}': ${pointValue}`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  prompt = input.question("Let's play some scrabble! Enter a word: ");
};

function simpleScore(word) {
    let simplepoints = "Simple Score: " + word.length;
    return simplepoints;
};

function vowelBonusScore(word) {

  let vowelBonusPoints = 0;
  word = word.toUpperCase();

  for (let i = 0; i < word.length; i++){
    switch (word[i]) {
      case "A":
      case "E":
      case "I":
      case "O":
      case "U":
        vowelBonusPoints += 3;
        break;
      default:
        vowelBonusPoints += 1;
    }
  }

  vowelBonusPoints = "Vowel Bonus Score: " + vowelBonusPoints;
  return vowelBonusPoints;
};

function scrabbleScore(word){
  word = word.toLowerCase();
  let letter;
  let score = 0;
  for (let i = 0; i < word.length; i++){
    letter = word[i];
    score += parseInt(newPointStructure[letter]);
  }
  
  score = "Srabble Score: " + score;
  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple",
    description: "Each letter is worth 1 point."
  },
  {
    name: "Vowel Bonus",
    description: "Vowels are 3 points, consonants are 1 point."
  },
  {
    name: "Scrabble",
    description: "Traditional scoring algorithm."
  }
];

function scorerPrompt() {
  console.log("\nWhich scoring method would you like to use?\n")
  for (let i = 0; i < scoringAlgorithms.length; i++){
    console.log(i + " - " + scoringAlgorithms[i].name + ": " + scoringAlgorithms[i].description);
  }
  let method = input.question("\nEnter 0, 1, or 2: ");
  switch (method){
    case "0":
      console.log(simpleScore(prompt));
      break;
    case "1":
      console.log(vowelBonusScore(prompt));
      break;
    case "2":
      console.log(scrabbleScore(prompt));
      break;
    default:
      console.log("Invalid Entry. Please try again.");
      scorerPrompt();
  }
}

function transform(object) {
  let structure = {};
  for (const key in object){
    for (let subject = 0; subject < object[key].length; subject++){
      let currentKey = object[key][subject];
      structure[currentKey.toLowerCase()] = key;
    }
  }
  console.log(structure);
  return structure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   transform(oldPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

