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




const loadTests = require('../lib/loadTests.js')
describe('Should load roadmap from yml', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})
	it('Should have property "api"', async function() {
		let expression = await loadTests( {"inputFile":"./spec/api.yml"} )
		expression.should.have.property("api")
	})

})


const generateTests = require('../lib/generateTests.js')
describe('Should generate an array of tests from yml', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})
	it('Should be array', async function() {
		let expression = await generateTests( {"inputFile":"./spec/api.yml"} )
		expression.should.be.array
	})

})


const generateMarkdownChecklist = require('../lib/generateMarkdownChecklist.js')
describe('Should generate markdown describing tests from yml', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})
	it('Should be string', async function() {
		let expression = await generateMarkdownChecklist( {"inputFile":"./spec/api.yml"} )
		expression.should.be.string
	})

})


const writeTests = require('../lib/writeTests.js')
describe('Should generate an array of tests from yml and then write to a file', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})
	it('Should not fail', async function() {
		let expression = await writeTests( {"inputFile":"./spec/api.yml","outputFile":"./spec/api.spec.js"} )
		expression.should.not.fail
	})

})


const writeMarkdownChecklist = require('../lib/writeMarkdownChecklist.js')
describe('Should generate markdown describing tests form yml and then write to a file', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})
	it('Should not fail', async function() {
		let expression = await writeMarkdownChecklist( {"inputFile":"./spec/api.yml","outputFile":"./spec/api.md"} )
		expression.should.not.fail
	})

})