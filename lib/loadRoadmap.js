const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

async function loadRoadmap(roadmap_yaml_path) {

	var roadmap
	try {
		roadmap = yaml.safeLoad(fs.readFileSync( roadmap_yaml_path, 'utf8'))
	} catch (e) {
		console.log(e)
	}

	return roadmap
}

module.exports = loadRoadmap
