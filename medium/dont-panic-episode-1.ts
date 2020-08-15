// did this week of August 2nd, 2020
// rating: easy/medium - hard part was to understand fully what it means to wait, more on that for pt2
// https://www.codingame.com/training/medium/don't-panic-episode-1

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs: string[] = readline().split(' ');
const nbFloors: number = parseInt(inputs[0]); // number of floors
const width: number = parseInt(inputs[1]); // width of the area
const nbRounds: number = parseInt(inputs[2]); // maximum number of rounds
const exitFloor: number = parseInt(inputs[3]); // floor on which the exit is found
const exitPos: number = parseInt(inputs[4]); // position of the exit on its floor
const nbTotalClones: number = parseInt(inputs[5]); // number of generated clones
const nbAdditionalElevators: number = parseInt(inputs[6]); // ignore (always zero)
const nbElevators: number = parseInt(inputs[7]); // number of elevators
let elevators: number[] = new Array(nbElevators);
for (let i = 0; i < nbElevators; i++) {
    var inputs: string[] = readline().split(' ');
    const elevatorFloor: number = parseInt(inputs[0]); // floor on which this elevator is found
    const elevatorPos: number = parseInt(inputs[1]); // position of the elevator on its floor
    elevators[elevatorFloor] = elevatorPos;
}

console.error('width: ', width, ' total rounds: ', nbRounds, ' exit: (floor,pos): (', exitFloor, ',', exitPos, ')')

const directionFn = (comparePos, clonePos, direction) : void => {
    console.error('comparePos:',comparePos, 'clonePos:', clonePos, 'direction:', direction);
    if (comparePos < clonePos) {
        if (direction === 'LEFT') {
            console.log('WAIT');
        } else {
            console.log('BLOCK');
        }
    } else if (comparePos > clonePos) {
        if (direction === 'RIGHT') {
            console.log('WAIT');
        } else {
            console.log('BLOCK');
        }
    } else {
        console.log('WAIT');
    }
}

// game loop
while (true) {
    var inputs: string[] = readline().split(' ');
    const cloneFloor: number = parseInt(inputs[0]); // floor of the leading clone
    const clonePos: number = parseInt(inputs[1]); // position of the leading clone on its floor
    const direction: string = inputs[2]; // direction of the leading clone: LEFT or RIGHT
    
    console.error('floor: ', cloneFloor, ' pos: ',clonePos, 'direction: ', direction);
    
    if (clonePos === -1 || cloneFloor === -1 || direction === 'WAIT') {
        console.log('WAIT');
    } else {
        if (exitFloor === cloneFloor) {
        // destination is on this floor, compare to that
            directionFn(exitPos, clonePos, direction);
        } else {
        // look for elevator on floor
            const elevatorPos = elevators[cloneFloor];
            directionFn(elevatorPos, clonePos, direction);
        }
    }
}
