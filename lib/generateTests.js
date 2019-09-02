const changeCase = require('change-case')
const loadTests = require('./loadTests.js')
const parseParamDescriptions = require('./parseParamDescriptions.js')

function describeTests(test){
	let path = test.path

	let require_lines	= ""
	for ( let req in test.require ){
		req = test.require[req]
		require_lines += `\nconst ${changeCase.camelCase(req)} = require('../${path}/${changeCase.camelCase(req)}.js')`
	}

	let param_descs = parseParamDescriptions(test.parameter_desc)

	let test_start = `${require_lines}
describe('${test.description}', function() {

	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_line = md_line.replace('"after each" hook','')
		md_arr.push(md_line.trim())
		done()
	})`

	let test_middle = ""
	for ( let idx in test.tests ){
		subtest 				= test.tests[idx]
		let condition		= subtest.condition
		let verb				= condition.replace( /([^'"()]*).*/, '$1')
		let value				= condition.replace( /.*'(.*?)'/g, '$1' )
		value						= value.replace( /.*"(.*?)"/g, '$1' )
		value						= value.replace(verb,'')
		let parameters  = subtest.parameters
		let func				= test.function
		let param_name	= param_descs[idx].name
		let function_call = value.length > 0 ? `("${value}")` : ""
		value				= value.length > 0 ? `"${value}"` : ""
		let expression	= `${func}( ${JSON.stringify(parameters)} )`
		test_middle += `
	it('${(changeCase.sentence(verb) + ' ' + value).trim()}', async function() {
		let expression = await ${expression}
		expression.${ changeCase.dotCase(verb)}${function_call}
	})\n`
	}

	let test_end =`
})`

	return test_start + test_middle + test_end

}

function interpretArgs(arg){

	let arg_arr_old = []
	let arg_arr_new = []

	if ( typeof arg === 'object' ){ 
		arg_arr_old = arg
	} else {
		arg_arr_old = [ arg ]
	} 


	for ( let val in arg_arr_old ){
		val = arg_arr_old [val]
		if ( typeof val === 'string' && val.startsWith('$')){ 
			arg_arr_new.push(val.replace(/\$/,''))
		} else if ( typeof val === 'string' ){
			arg_arr_new.push(`"${val}"`)
		} else {
			arg_arr_new.push(val)
		}
	}

	return arg_arr_new

}

/**
 * Generates an array of tests in javascript code compatible with mocha/tap.
 */
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
async function generateTests(options){
	let test_data = await loadTests(options)
	let tests = []
	let tests_data = test_data.api
		for ( let test in tests_data ){
			test = tests_data[test]

			test.path				= test_data.path_prefix
			
			test.func				= interpretArgs(test.function)

			if ( test.require ){
				test.require 		= [ test.require ]
			} else {
				test.require		= []
			}
			test.require.push(test.func)
			test.require		= test.require.filter( onlyUnique )
			test.require		= test.require.flat()
			let test_block = describeTests(test)
			tests.push(test_block)
		}
				
	return tests

}

module.exports = generateTests
