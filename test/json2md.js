const json2md = require('json2md')
json2md.converters.files = function (input, json2md) {
	return '### files' + '<br>' + input
}
json2md.converters.dirs = function (input, json2md) {
	return '### dirs' + '<br>' + input
}


let md = json2md({"files":["file_save/09x07.mkv","file_save/09x07.srt","file_save/09x08.mkv","file_save/09x08.srt","file_save/09x09.mkv","file_save/09x09.srt","file_save/09x10.mkv","file_save/09x10.srt","file_save/09x11.mkv","file_save/09x11.srt","file_save/09x12.mkv","file_save/09x12.srt","file_save/09x13.mkv","file_save/09x13.srt"],"dirs":[]})
const regex = /,/gi

MD = md.replace(regex,'<br>')

console.log(MD)