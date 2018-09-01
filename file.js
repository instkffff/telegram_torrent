//file manager

const fileManager = require('file-manager-js');


function listPath(Path){
	fileManager.listDeep(Path)
		.then((entries) => {
			var Files = entries.files
			var Dirs = entries.dirs
			var fileList = Object.assign(Files,Dirs) 
		})
		.catch((error) => {'listPath failed'})
	return fileList
}

function removeFLoder(Path){
	fileManager.removeDir(Path)
		.catch((error) => {'removeFLoder failed'})
}

module.exports = {
    listPath,
    removeFLoder
}