const fs = require('fs')
const generateTests 		= require('./lib/generateRoadmapTests.js')
const generateMarkdown	= require('./lib/generateMarkdownRoadmap.js')
const writeTests 				= require('./lib/writeRoadmapTests.js')
const writeMarkdown 		= require('./lib/writeMarkdownRoadmap.js')
const loadRoadmap				=	require('./lib/loadRoadmap.js')

module.exports = { generateTests, generateMarkdown, writeTests, writeMarkdown }

loadRoadmap('./spec/init.yaml')
	.then( roadmap => {
		console.log(roadmap)
		return roadmap
	})
	.then( roadmap => {
		tests = generateTests(roadmap)
		console.log(tests)
		return tests
	})

writeTests('./spec/init.yaml','./spec/test.js')
	.then( tests => {
		console.log(tests)
	})
