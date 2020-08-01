'use strict'

const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin
})

process.stdin.on('end', function () {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''))

  main()
})

function readLine() {
  return inputString[currentLine++]
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
  let swapCount = 0
  function swap(a, b) {
    swapCount++
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }
  let i = arr.length
  while (i--) {
    const idx = arr.indexOf(i + 1) // the values in the array are 1 based
    if (idx + 1 !== i + 1) swap(idx, i)
  }
  return swapCount
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const n = parseInt(readLine(), 10)

  const arr = readLine()
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10))

  const res = minimumSwaps(arr)

  ws.write(res + '\n')

  ws.end()
}
