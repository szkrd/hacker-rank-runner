const chalk = require('chalk')
const fs = require('fs')
const { spawn } = require('child_process')

const sleep = (ms) => new Promise(resolve => { setTimeout(resolve,ms) })

async function runner (dir = '', fileWait = 500) {
  const outputPath = `./${dir}/output.txt`
  const inputPath = `./${dir}/input.txt`

  if (!fs.existsSync(inputPath)) {
    console.error('input.txt missing')
    process.exit(2)
  }
  let inputText = fs.readFileSync(inputPath, 'utf-8')
  const inputLines = inputText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split(/\n/)

  console.log(chalk.cyan(`\n[${dir}]`))
  const child = spawn('node', [dir], { env: { OUTPUT_PATH: outputPath } })
  child.stdin.setEncoding('utf-8')
  child.stdout.pipe(process.stdout)
  child.stderr.on('data', (data) => console.error(chalk.red(`${data}`)))
  inputLines.forEach(line => child.stdin.write(line + '\n'))
  child.stdin.emit('end')
  child.stdin.end()
  await sleep(fileWait)
  if (fs.existsSync(outputPath)) {
    const result = fs.readFileSync(outputPath, 'utf-8')
    console.log(chalk.green(`output`))
    console.log(result.trim())
  } else {
    console.error('output not found')
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
