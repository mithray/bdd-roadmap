const fs = require('fs')
const generateTests 		= require('./lib/generateTests.js')
const generateMarkdown	= require('./lib/generateMarkdownChecklist.js')
const writeTests 				= require('./lib/writeTests.js')
const writeMarkdown 		= require('./lib/writeMarkdownChecklist.js')
const loadTests					=	require('./lib/loadTests.js')

module.exports = { generateTests, generateMarkdown, writeTests, writeMarkdown, loadTests}

/*
loadTests('./spec/api.yml')
	.then( roadmap => {
		console.log(roadmap)
		return roadmap
	})

	.then( roadmap => {
		tests = generateTests(roadmap)
		console.log(tests)
		return tests
	})

writeTests('./spec/api.yml','./spec/api.js')
	.then( tests => {
	})
	*/
