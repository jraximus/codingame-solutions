// ****************************************************************************************************************************************
// puzzle of the week Aug 2nd->8th, 2020
// puzzle: https://www.codingame.com/training/easy/brackets-extreme-edition
// rating: between easy/med... idea was easy but trying to do it clever had me thinking about a solution other than the obvious for a bit
// time: <20 min
// ****************************************************************************************************************************************

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const expression = readline().replace(/[^\[\]\(\)\{\}]/g, '');

let stack = [];
for (let check of expression) {
    if (check === '(' || check === '{' || check === '[') {
        stack.push(check);
    } else {
        const last_character = stack.slice(-1)[0];
        const combined = last_character + check;
        if (combined === '()' || combined === '{}' || combined === '[]') {
            stack.pop();
        } else {
            stack.push(check);
        }
    }
}

console.log(stack.length === 0);