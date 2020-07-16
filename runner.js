const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

const sleep = (ms) => new Promise(resolve => { setTimeout(resolve, ms) })

async function runner (dir = '', fileWait = 500) {
  const outputPath = path.resolve(__dirname, `./${dir}/output.txt`)
  const inputPath = path.resolve(__dirname, `./${dir}/input.txt`)
  let lastPlainOutput = ''

  if (!fs.existsSync(inputPath)) {
    console.error('input.txt missing')
    process.exit(2)
  }
  let inputText = fs.readFileSync(inputPath, 'utf-8')
  const inputLines = inputText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split(/\n/)

  const nodeBin = process.argv[0] // needed for nvm, plain `node` is not good of course
  const child = spawn(nodeBin, [dir], { env: { OUTPUT_PATH: outputPath } })
  child.stdin.setEncoding('utf-8')
  child.stdout.on('data', (data) => { lastPlainOutput = data.toString() })
  child.stdout.pipe(process.stdout)
  child.stderr.on('data', (data) => console.error(chalk.red(data)))
  inputLines.forEach(line => child.stdin.write(line + '\n'))
  child.stdin.emit('end')
  child.stdin.end()
  await sleep(fileWait)

  // if they used createWriteStream to print the output,
  // then we capture that and print it here finally
  if (fs.existsSync(outputPath)) {
    const result = fs.readFileSync(outputPath, 'utf-8')
    console.log(chalk.green('\nstream output:'))
    console.log(chalk.greenBright(result.trim()))
  } else if (lastPlainOutput) {
    // otherwise just print the last console.log
    console.log(chalk.green('\nlast plain output:'))
    console.log(chalk.greenBright(lastPlainOutput.trim()))
  }

}

module.exports = runner

// ---

if (require.main === module) { // run only for cli
  const dir = (process.argv[2] || '').replace(/[/\\]+$/, '')
  if (!dir) {
    console.error('dir param missing')
    process.exit(1)
  }
  runner(dir)
}
