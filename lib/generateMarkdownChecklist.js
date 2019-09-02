const loadTests = require('./loadTests.js')
const changeCase = require('change-case')

function parseSentence(sentence){

	sentence = changeCase.sentence(sentence)

	return sentence

}

async function generateMarkdownChecklist(roadmap_yaml_path){

	let tests = await loadTests(roadmap_yaml_path)
	let goals = []
	roadmap_tests = tests.tests
	var md = ""
	for ( let test_family in roadmap_tests ){

		md += `\n* [ ] ${parseSentence(test_family)}`
		test_family = roadmap_tests[test_family]

		for ( let test in test_family ){

			md += `\n  * [ ] ${parseSentence(test)}`

		}
	}
				
	return md

}

module.exports = generateMarkdownChecklist
