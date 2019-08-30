const should = require('should')
const mocha = require('mocha')
//require('tap').mochaGlobals()


/*
 *	These tests are automatically created
 */




const loadRoadmap = require('../lib/loadRoadmap.js')
describe('Should load roadmap from yml', function() {
  it('Should have property', async function() {
		let testee = await loadRoadmap('./spec/api.yml')
		testee.should.have.property
	})
})


const generateRoadmapTests = require('../lib/generateRoadmapTests.js')
describe('Should generate an array of tests from yml', function() {
  it('Should be array', async function() {
		let testee = await generateRoadmapTests(loadRoadmap('./spec/api.yml'))
		testee.should.be.array
	})
})


const generateMarkdownRoadmap = require('../lib/generateMarkdownRoadmap.js')
describe('Should generate markdown describing tests from yml', function() {
  it('Should be string', async function() {
		let testee = await generateMarkdownRoadmap('./spec/api.yml')
		testee.should.be.string
	})
})


const writeRoadmapTests = require('../lib/writeRoadmapTests.js')
describe('Should generate an array of tests from yml and then write to a file', function() {
  it('Should not fail', async function() {
		let testee = await writeRoadmapTests('./spec/api.yml','./tests.js')
		testee.should.not.fail
	})
})


const writeMarkdownRoadmap = require('../lib/writeMarkdownRoadmap.js')
describe('Should generate markdown describing tests form yml and then write to a file', function() {
  it('Should not fail', async function() {
		let testee = await writeMarkdownRoadmap()
		testee.should.not.fail
	})
})