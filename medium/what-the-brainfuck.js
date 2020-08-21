
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * puzzle of the week Aug 16nd->22nd, 2020
 * puzzle: https://www.codingame.com/training/medium/what-the-brainfuck
 * rating: easy concept/theory crafting to get 100%
 * time: 1.5 hours
 * notes: Could definitely use some optimizations with the switch, maybe think of using functional programming for v2, i wanted to write this one using recursion instead of a for/while loops
 **/

var inputs = readline().split(' ');
const L = parseInt(inputs[0]);
const S = parseInt(inputs[1]);
const I = parseInt(inputs[2]);

// program lines
let program = ""
for (let i = 0; i < L; i++) {
    const r = readline();
    program += r;
}

// inputs for program lines
let nums = []
for (let i = 0; i < I; i++) {
    const c = parseInt(readline());
    nums.push(c);
}
let pointers = Array(S).fill(0)

const checkIdx = (pointers, idx) => {
    if (idx < 0 || idx >= pointers) {
        throw "POINTER OUT OF BOUNDS";
    }
}
const checkPointerCell = (cell) => {
    if (cell < 0 || cell > 255) {
        throw "INCORRECT VALUE";
    }
}

const validate = (program, brackets = "") => {
    if (!program || program === '') {
        if (brackets != "") {
            throw "SYNTAX ERROR";
        }
        return true;
    }

    const op = program.charAt(0);
    validate(program.slice(1), addToBrackets(brackets, op));
}

const addToBrackets = (brackets, op) => {
    if (op === "[") {
        return brackets + op;
    } else if (op === "]") {
        if (brackets.length === 0) {
            throw "SYNTAX ERROR";
        }
        if (brackets.charAt(brackets.length-1) === ']'){
            throw "SYNTAX ERROR";
        }
        return brackets.slice(0, brackets.length - 1);
    }
    return brackets;
}

const findJumpLocation = (program, pidx, forwardJump, open = 0, close = 0) => {
    const op = program[pidx];
    if (forwardJump && op === '[') {
        open += 1;
    } else if (!forwardJump && op === ']') {
        close += 1;
    } else if (op === '[') {
        if (close > 0) {
            close -= 1;
        } else {
            return pidx;
        }
    } else if (op === ']') {
        if (open > 0) {
            open -= 1;
        } else {
            return pidx;
        }
    } 
    return findJumpLocation(program, forwardJump ? pidx + 1: pidx - 1, forwardJump, open, close);
}

const recurseProgram = program => recurseHelper(program, 0, pointers, 0, "");
const recurseHelper = (program, pidx = 0, pointers, idx, output) => {
	if (!program || pidx >= program.length) {
		return output;
	}
	const operator = program.charAt(pidx);	

	if (operator === '+') {
		pointers[idx] += 1;
        checkPointerCell(pointers[idx])
	} else if (operator === '-') {
		pointers[idx] -= 1;
        checkPointerCell(pointers[idx])
	} else if (operator === '>') {
		idx += 1;
        checkIdx(pointers.length, idx)
	} else if (operator === '<') {
		idx -= 1;
        checkIdx(pointers.length, idx)
	} else if (operator === '.') {
		output += String.fromCharCode(pointers[idx]);
	} else if (operator === '[') {
        if (pointers[idx] === 0) {
            pidx = findJumpLocation(program, pidx + 1, true);
        }
    } else if (operator === ']') {
        if (pointers[idx] !== 0) {
            pidx = findJumpLocation(program, pidx - 1, false);
        }
    } else if (operator === ',') {
        pointers[idx] = nums.shift();
    }

    pidx += 1;
	return recurseHelper(program, pidx, pointers, idx, output);
}

try {
    validate(program);
    console.log(recurseProgram(program));
} catch(errorMsg) {
    console.log(errorMsg)
}


// Write an answer using console.log()
// To debug: console.error('Debug messages...');