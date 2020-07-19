'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// level 1 flat shim
Array.prototype.flat = /*Array.prototype.flat ||*/ function() {
    return this.reduce((acc, val) => acc.concat(val), []);
};

function getHourGlass(arr, x, y) {
    const hg = [
        [ (arr[y + 0] || [])[x + 0], (arr[y + 0] || [])[x + 1], (arr[y + 0] || [])[x + 2] ],
        [ (arr[y + 1] || [])[x + 0], (arr[y + 1] || [])[x + 1], (arr[y + 1] || [])[x + 2] ],
        [ (arr[y + 2] || [])[x + 0], (arr[y + 2] || [])[x + 1], (arr[y + 2] || [])[x + 2] ],
    ];
    hg[1][0] = hg[1][2] = 0; // remove the "sides" of the hourglass
    const invalidPosition = hg.flat().some(val => val === undefined)
    return invalidPosition ? null : hg;
}

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    const sums = [];
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            const hg = getHourGlass(arr, x, y);
            if (hg) sums.push(hg.flat().reduce((a, b) => a + b, 0));
        }
    }
    return Math.max(...sums);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
