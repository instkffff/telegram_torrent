//file manager

const fileManager = require('file-manager-js');


function listPath(Path){
	fileManager.listDeep(Path)
		.catch((error) => {'listPath failed'})
}

function removeFLoder(Path){
	fileManager.removeDir(Path)
		.catch((error) => {'removeFLoder failed'})
}

module.exports = {
    listPath,
    removeFLoder
}