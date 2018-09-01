const fileManager = require('file-manager-js');

function listPath(Path){
	fileManager.listDeep('Path')
		.catch((error) => {'listPath failed'})
}

console.log(listPath('../node_modules'))

fileManager.listDeep('./node_modules')
	.then((entries) => {
		console.log(entries)
	})
	.catch((error) => {console.log(error)})