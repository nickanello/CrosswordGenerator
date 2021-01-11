class Crossword {
    constructor(row, column, direction) {
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.constraintLevel = 0;
        this.wordListIndex = 0;
    }
}

class CrosswordQueue { 
    constructor() { 
        this.crosswords = [];
        this.maxLength = 0;
    } 
  
    isEmpty() {
        return this.crosswords.length == 0;
    }

    isFull() {
        this.crosswords.length == this.maxLength;
    }

    enqueue(crossword) {
        let enqueued = false;
        for (let i = 0; i < this.crosswords.length; i++) { 
            if (this.crosswords[i].constraintLevel < crossword.constraintLevel) { 
                // Once the correct location is found it is 
                // enqueued 
                this.crosswords.splice(i, 0, crossword); 
                enqueued = true; 
                break; 
            } 
        } 
        if (!enqueued) {
            this.crosswords.push(crossword);
        }
        if (this.crosswords.length > maxLength) {
            maxLength++;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return console.log('Cannot dequeue an empty queue');
        }
        return this.crosswords.shift();
    }
} 

function shuffleWords(words) {
    for (let k = 0; k < words.length; k++) {
        for (let i = words[k].length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = words[k][i];
            words[k][i] = words[k][j];
            words[k][j] = x;
        }
    }
}

module.exports = {
    Crossword: Crossword,
    CrosswordQueue: CrosswordQueue,
    shuffleWords: shuffleWords
}