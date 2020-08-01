'use strict'

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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
  const sums = []
  for (let i = 0; i < arr.length; i++) {
    const a = Array.from(arr)
    a.splice(i, 1)
    sums.push(a.reduce((a, b) => a + b, 0))
  }
  const min = Math.min(...sums)
  const max = Math.max(...sums)
  console.log(`${min} ${max}`)
}

function main() {
  const arr = readLine()
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10))

  miniMaxSum(arr)
}
