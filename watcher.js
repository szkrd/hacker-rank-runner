const chokidar = require('chokidar')
const runner = require('./runner')

const watchPath = './problems/**/*.{txt,js}'
console.log(`watching "${watchPath}"`)

chokidar
  .watch(watchPath, {
    ignored: [/[\/\\]\./, 'node_modules', '.idea'],
  })
  .on('change', (path, event) => {
    if (!path.startsWith('problems')) {
      return
    }
    if (!/(index\.js|input\.txt)$/.test(path)) {
      return
    }

    const dirName = path.replace(/\\/g, '/').split('/')[1]
    runner(`problems/${dirName}`)
  })
