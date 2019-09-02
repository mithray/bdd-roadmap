const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

async function loadTests( options ) {
	
	let tests

	try {
		tests = fs.readFileSync( options.inputFile, 'utf8')
		tests = yaml.safeLoad(tests)
	} catch (e) {
		console.log(e)
	}

	return tests
}

module.exports = loadTests
