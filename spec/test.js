const should = require('should')
require('tap').mochaGlobals()


/*
 *	These tests are automatically created
 */



const npmRepoExists = require('../lib/npmRepoExists.js')
describe('Check if npm repo exists.', function() {
  it('Should equal(true)', async function() {
		let testee = await npmRepoExists()
		testee.should.equal(true)
	})
})

const npmInit = require('../lib/npmInit.js')
describe('Create npm repo', function() {
  it('Should have property("name")', async function() {
		let testee = await npmInit()
		testee.should.have.property("name")
	})
})

const specDirExists = require('../lib/specDirExists.js')
describe('Check if spec directory exists', function() {
  it('Should equal(true)', async function() {
		let testee = await specDirExists()
		testee.should.equal(true)
	})
})