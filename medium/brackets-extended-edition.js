// ****************************************************************************************************************************************
// puzzle of the week Aug 23th->29th, 2020
// puzzle: https://www.codingame.com/training/medium/brackets-extended-edition
// rating:  easy after doing brackets-extreme-edition(easy rated puzzle) - just had to modify code to handle more cases
// time: <30 minutes
// ****************************************************************************************************************************************

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
let expressions = [];
for (let i = 0; i < N; i++) {
    expressions.push(readline().replace(/[^\<\>\[\]\(\)\{\}]/g, '')); // remove all non essentials
}

process = (expression) => {
    const open = "({[<";
    const close = ")}]>";
    let stack = [];

    for (let check of expression) {
        if (stack.length === 0) {
            stack.push(close.indexOf(check) > -1 ? open[close.indexOf(check)] : check);
        } else {
            const last_character = stack.slice(-1)[0];
            let combined = last_character + (open.indexOf(check) > -1 ? close[open.indexOf(check)] : check);
            if (combined === '()' || combined === '{}' || combined === '[]' || combined === '<>') {
                stack.pop();
            } else {
                stack.push(close.indexOf(check) > -1 ? open[close.indexOf(check)] : check)
            }
        }
    }
    console.log(stack.length === 0);
}

for (let i = 0; i < N; i++) {
    process(expressions[i]);
}

