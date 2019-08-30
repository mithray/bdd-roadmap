const generateMarkdownRoadmap = require('./generateMarkdownRoadmap.js')
const fs = require('fs')

async function writeMarkdownRoadmap( in_file, out_file ){

		const md = await generateMarkdownRoadmap( in_file )
		
		try {
			fs.writeFileSync( out_file, md,'utf8')
			return true
		} catch (e) {
			return false
		}

}

module.exports = writeMarkdownRoadmap
