const Compiler = require('./compiler')
const options = require('../simplepack.config')

new Compiler(options).run()
// new Compiler(options).emitFiles()