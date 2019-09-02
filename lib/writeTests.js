const fs = require('fs')
const generateTests = require('./generateTests.js')
const loadTests = require('./loadTests.js')
const path = require('path')
const roadmap_yaml_path = './spec/init.yaml'
const merge = require('merge-anything')

/**
 *
 * 1) Generate an array of tests from input yaml
 * 2) Then write tests to a file
 *
 */
async function writeTests( options ){

/*
		let default_options = {
			in_file: './spec/api.yml',
			out_file: './spec/api.spec.js'
		}	
		
		options = merge( default_options, options)
*/
		let out_file = options.outputFile

//	let roadmap = await loadTests(roadmap_yaml_path)
//	let tests = await generateTests(roadmap)
	let tests = await generateTests(options)
	const default_test_file_data = fs.readFileSync(path.join(__dirname,'./default_test_env.js'))
	let test_data 
	test_data = default_test_file_data
	for ( let test in tests){
		test_data += '\n\n' + tests[test]
	}
	try {
		fs.writeFileSync( out_file, test_data,'utf8')
		return true
	} catch (err) {
		return false
	}

}

module.exports = writeTests
