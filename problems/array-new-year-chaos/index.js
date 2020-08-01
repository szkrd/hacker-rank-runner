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

// Complete the minimumBribes function below.
function minimumBribes(q) {
  // This solution swaps the elements, which can be considered a brute force approach
  // since in reality it would be enough to check the number of movements and the number of bribes
  // without any array operations at all :(
  var swapped = [],
    arr = q,
    steps = 0,
    result = 0,
    tmp = 0
  while (true) {
    result = 1
    for (let i = 0, l = arr.length - 1; i < l; i++) {
      if (arr[i] !== i + 1 && arr[i] > arr[i + 1]) {
        if (swapped.indexOf(-arr[i]) > -1) {
          return console.log('Too chaotic')
        }
        if (swapped.indexOf(arr[i]) > -1) swapped.push(-arr[i])
        if (swapped.indexOf(arr[i]) === -1) swapped.push(arr[i])
        tmp = arr[i + 1]
        arr[i + 1] = arr[i]
        arr[i] = tmp
        result = 0
        break
      }
    }
    if (result) return console.log(steps)
    steps++
  }
}

function main() {
  const t = parseInt(readLine(), 10)

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10)

    const q = readLine()
      .split(' ')
      .map((qTemp) => parseInt(qTemp, 10))

    minimumBribes(q)
  }
}
