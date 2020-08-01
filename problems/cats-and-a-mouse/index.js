'use strict'

const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin
})

process.stdin.on('end', (_) => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''))

  main()
})

function readLine() {
  return inputString[currentLine++]
}

// Complete the catAndMouse function below.
function catAndMouse(a, b, c) {
  // stationary: 0, moving left to right: 1, moving right to left: -1
  const getVector = (x, y) => (x === y ? 0 : x > y ? -1 : 1)
  const aDir = getVector(a, c)
  const bDir = getVector(b, c)
  while (true) {
    if (a === c && b === c) return 'Mouse C'
    if (a === c) return 'Cat A'
    if (b === c) return 'Cat B'
    a = a + aDir
    b = b + bDir
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const q = parseInt(readLine(), 10)

  for (let qItr = 0; qItr < q; qItr++) {
    const xyz = readLine().split(' ')

    const x = parseInt(xyz[0], 10)

    const y = parseInt(xyz[1], 10)

    const z = parseInt(xyz[2], 10)

    let result = catAndMouse(x, y, z)

    ws.write(result + '\n')
  }

  ws.end()
}
