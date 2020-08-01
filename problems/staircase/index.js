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

// Complete the staircase function below.
function staircase(n) {
  const nChars = (char, n) => {
    let s = ''
    for (let i = 0; i < n; i++) s += char
    return s
  }
  const alignRight = (space, char, n, max) =>
    nChars(space, max - n) + nChars(char, n)
  const s = []
  for (let i = 1; i <= n; i++) {
    s.push(alignRight(' ', '#', i, n))
  }
  console.log(s.join('\n'))
}

function main() {
  const n = parseInt(readLine(), 10)

  staircase(n)
}
