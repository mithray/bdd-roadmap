function parseParamDescriptions(descriptions){
	
  let temp_arr = []
		temp_arr.push(descriptions)
		temp_arr = temp_arr.flat()
		descriptions = temp_arr

	let desc_arr = []

  for ( let desc in descriptions){
    desc = descriptions[desc]
    let desc_obj = {
      type: desc.replace(/.*{(.*?)}.*/,'$1').trim(),
      name: desc.replace(/.*\[(.*?)=(.*)\].*/,'$1').trim(),
      default: desc.replace(/.*\[(.*)=['"]+(.*)['"]+\].*/,'$2').trim()
    }
    desc_arr.push(desc_obj)
  }

  return desc_arr
}

module.exports = parseParamDescriptions
