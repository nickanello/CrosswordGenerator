const utils = require('./utils.js');
const dictionary = require('./dictionary.js');
var words = require('./words.js');
const sample5x5 = require('./sample5x5.js');

const across = true;
const down = false;
var grid = [];
var crosswords = [];
var usedWords = [];


function initGridAndCrosswords(gridStructure) {
    //initialize the grid with ' ' as white squares and '' as black squares
    //add instances of Crossword to crosswords array
    for (let i = 0; i < gridStructure.length; i++) {
        grid.push([]);
        
        for (let j = 0; j < gridStructure[0].length; j++) {
            ch = gridStructure[i][j];
            
            if (ch == '+') {
                grid[i].push(' ');
                crosswords.push(new utils.Crossword(i, j, across));
                crosswords.push(new utils.Crossword(i, j, down));
            }
            else if (ch == '>') {
                grid[i].push(' ');
                crosswords.push(new utils.Crossword(i, j, across));
            }
            else if (ch == '|') {
                grid[i].push(' ');
                crosswords.push(new utils.Crossword(i, j, down));
            }
            else if (ch == ' ') {
                grid[i].push(' ');
            }
            else {
                grid[i].push('');
            }
        }
    }

    //set lengths of crosswords
    for (let x = 0; x < crosswords.length; x++) {
        crossword = crosswords[x];
        length = 0;
        if (crossword.direction == across) {
            j = crossword.column;
            while (grid[crossword.row][j]) {
                length++;
                j++;
            }
        }
        else {
            i = crossword.row;
            while (grid[i] && grid[i][crossword.column]) {
                length++;
                i++;
            }
        }

        crossword.length = length;
    }
    return grid;
}

function buildGrid(gridStructure) {
    utils.shuffleWords(words);
    initGridAndCrosswords(gridStructure);
    if (placeWords(crosswords)) {
        console.log(grid);
    }
    else {
        console.log('Cannot build a valid grid!');
    }
}

function placeWords(crosswords) {
    for (let i = 0; i < crosswords.length; i++) {
        console.log('placing word for ' + i);
        if (selectWord(crosswords[i])) {
            if (i == crosswords.length - 1) {
                return true;
            }
        }
        else {
            console.log('Could not fill word ' + i + '.');
            return false;
        }
    }
}

function selectWord(crossword) {
    for (let i = 0; i < words[crossword.length].length; i++) {
        word = words[crossword.length][i];
        if (wordFits(crossword, word)) {
            if (!usedWords.includes(word)) {
                placeWord(crossword, word);
                console.log(grid);
                usedWords.push(word);
                return true;
            }
        }
    }

    return false;
}

function wordFits(crossword, word) {
    if (crossword.direction == across) {
        for (let j = 0; j < crossword.length; j++) {
            let gridChar = grid[crossword.row][crossword.column + j]
            if (gridChar != ' ' && gridChar != word.charAt(j)) {
                return false;
            }
        }
    }
    else {
        for (let i = 0; i < crossword.length; i++) {
            let gridChar = grid[crossword.row + i][crossword.column]
            if (gridChar != ' ' && gridChar != word.charAt(i)) {
                return false;
            }
        }
    }
    
    return true;
}

function placeWord(crossword, word) {
    if (crossword.direction == across) {
        for (let j = 0; j < crossword.length; j++) {
            grid[crossword.row][crossword.column + j] = word.charAt(j);
        }
    }
    else {
        for (let i = 0; i < crossword.length; i++) {
            grid[crossword.row + i][crossword.column] = word.charAt(i);
        }
    }
}

buildGrid(sample5x5);