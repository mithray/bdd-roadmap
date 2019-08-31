const changeCase = require('change-case')

function describeTest(test_obj){

	let description		= test_obj.description
	let condition			= test_obj.condition
	let testee				= test_obj.testee
	let predicate			= test_obj.predicate
	let verb					= test_obj.verb
	let object				= test_obj.object
	let path 					= test_obj.path
	let require				= test_obj.require
	let require_lines	= ""
	for ( let req in require ){
		req = require[req]
		require_lines += `\nconst ${changeCase.camelCase(req)} = require('../${path}/${changeCase.camelCase(req)}.js')`
	}

	let test = `${require_lines}
describe('${description}', function() {
	afterEach(function(done){
		let state		= this.currentTest.state
		let name 		= this.test.fullTitle()
		let md_line = toMdLine( name, state)
		md_arr.push(md_line)
		done()
	})
  it('${changeCase.sentence(verb) + object}', async function() {
		let testee = await ${testee}
		testee.${predicate}
	})
})`

	return test

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
function generateTestArrRoadmap(roadmap){
	let tests = []
	roadmap_tests = roadmap.tests
	for ( let test_family in roadmap_tests ){
		test_family = roadmap_tests[test_family]
		for ( let test in test_family ){
			test = test_family[test]

			let description = test.description
			let condition 	= test.condition
			let testee 			= interpretArgs(test.testee)
			let value 			= interpretArgs(test.value)
			let path 				= roadmap.default_test_path
			let require			= test.require

			let subject = testee
			let verb		= changeCase.dotCase(condition)
			let object
			if ( value.length > 1 ){
			object	= "(" + value + ")"
			} else {
			object = ""
			}

			let predicate = verb + object
	
			let test_obj = { subject, verb, object, predicate, description, condition, testee, value, path, require }
			
			test = describeTest(test_obj)

			tests.push(test)
		}
	}
				
	return tests

}

module.exports = generateTestArrRoadmap