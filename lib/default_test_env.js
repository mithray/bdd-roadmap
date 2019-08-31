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

