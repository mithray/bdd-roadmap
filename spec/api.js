const should = require('should')
const MOCHA = require('mocha')
const mocha = new MOCHA({reporter: "markdown"})
//require('tap').mochaGlobals()

function toMdLine( name, state){

		var line = ""

		if( state === 'passed' ){
			line = '- [x] ' + name
		} else {
			line = '- [ ] ' + name
		}

		return line

}

after(function(){
	console.log(md_arr)
	return
})

const md_arr = []


/*
 *	These tests are automatically created
 */




const loadRoadmap = require('../lib/loadRoadmap.js')
describe('Should load roadmap from yml', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('Should have property', async function() {
		let testee = await loadRoadmap('./spec/api.yml')
		testee.should.have.property
	})
})


const generateRoadmapTests = require('../lib/generateRoadmapTests.js')
describe('Should generate an array of tests from yml', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('Should be array', async function() {
		let testee = await generateRoadmapTests(loadRoadmap('./spec/api.yml'))
		testee.should.be.array
	})
})


const generateMarkdownRoadmap = require('../lib/generateMarkdownRoadmap.js')
describe('Should generate markdown describing tests from yml', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('Should be string', async function() {
		let testee = await generateMarkdownRoadmap('./spec/api.yml')
		testee.should.be.string
	})
})


const writeRoadmapTests = require('../lib/writeRoadmapTests.js')
describe('Should generate an array of tests from yml and then write to a file', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('Should not fail', async function() {
		let testee = await writeRoadmapTests('./spec/api.yml','./spec/api.js')
		testee.should.not.fail
	})
})


const writeMarkdownRoadmap = require('../lib/writeMarkdownRoadmap.js')
describe('Should generate markdown describing tests form yml and then write to a file', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('Should not fail', async function() {
		let testee = await writeMarkdownRoadmap('./spec/api.yml','./spec/api.md')
		testee.should.not.fail
	})
})