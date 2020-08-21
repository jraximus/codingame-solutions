// puzzle of the week Aug 9nd->15th, 2020
// puzzle: https://www.codingame.com/training/medium/bulgarian-solitaire
// rating: very easy
// time: <1 hour

/**
 * TODO: maybe look into way that no storage needed? 
 **/

const N: number = parseInt(readline());
var inputs: string[] = readline().split(' ');
let t1: number[] = [];
for (let i = 0; i < N; i++) {
    const C: number = parseInt(inputs[i]);
    t1.push(C);
}

console.error(t1);

const findNextTurn = (array: number[]) => {
    let filtered = array.filter((num) => num !== 0).map(num => num - 1);
    filtered.push(filtered.length);
    filtered.filter((num) => num !== 0);
    return {newArray:filtered, turn:createTurnString(filtered)};
}

const findLoop = (array, turns: string[]) : number => {
    let {newArray, turn} = findNextTurn(array);
    const idx = turns.indexOf(turn);
    if ( idx != -1) {
        return turns.length - idx;
    } else {
        turns.push(turn);
        return findLoop(newArray, turns);
    }
}

const createTurnString = (array:number[]) : string => {
    return array.filter((num) => num !== 0)
        .sort((a, b) => a === b ? 0 : (a < b ? -1: 1))
        .join("|");
}



const loop = findLoop(t1, [createTurnString(t1)]);
console.log(loop);
