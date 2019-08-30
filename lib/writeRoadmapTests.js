const fs = require('fs')
const generateRoadmapTests = require('./generateRoadmapTests.js')
const loadRoadmap = require('./loadRoadmap.js')
const path = require('path')
const roadmap_yaml_path = './spec/init.yaml'

/**
 *
 * 1) Generate an array of tests from input yaml
 * 2) Then write tests to a file
 *
 */
async function writeRoadmapTests( in_file, out_file ){

	let roadmap_yaml_path = in_file
	let test_file = out_file

	let roadmap = await loadRoadmap(roadmap_yaml_path)
	let tests = await generateRoadmapTests(roadmap)
	const default_test_file_data = fs.readFileSync(path.join(__dirname,'./default_test_env.js'))
	let test_data 
	test_data = default_test_file_data
	for ( let test in tests){
		test_data += '\n\n' + tests[test]
	}
	try {
		fs.writeFileSync( test_file, test_data,'utf8')
		return true
	} catch (err) {
		return false
	}

}

module.exports = writeRoadmapTests
