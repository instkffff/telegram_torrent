//require
var WebTorrent = require('webtorrent')
require('dotenv').config({path:'./config.env'})
const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')
const fileManager = require('file-manager-js')
const { DownloaderHelper } = require('node-downloader-helper')

//new telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN)
//new torrent client
const client = new WebTorrent()
//mid_ware
bot.use(commandParts())
//normal
bot.start((ctx) => ctx.reply('Welcome! please check /help for more information'))
bot.help((ctx) => ctx.reply('just for personal use torrent client via telegram, if you want use please contact NightCandle for permission.'))

//downloader
bot.command('download',(ctx) => {
	let http_url = ctx.state.command.args
	let dl = new DownloaderHelper(http_url, './file_save')
	dl.on('start',function(){
		ctx.reply('donwload start')
	})
	dl.on('end', function(){
		ctx.reply('download completed')
	})
	dl.on('error',function(){
		ctx.reply('download failed')
	})
	dl.on('timeout',function(){
		dl.stop()
		ctx.reply('download failed')
	})
	dl.start()
})

//torrent magnetic
bot.command('magnetic',(ctx) => {
	let magnetic_url = ctx.state.command.args
	client.add(magnetic_url,{path: './file_save'}, 
		function(torrent){
			ctx.reply('torrent download start')
			torrent.on('done',function(){
				ctx.reply('torrent download finished')
			})
		})
})

//state
bot.command('progress',(ctx) =>{
	console.log(client.progress)
	console.log(client.downloadSpeed)
	ctx.reply(`${client.progress}
${client.downloadSpeed}`)
})

//remove
bot.command('remove',(ctx) => {
	let torrentId = ctx.state.command.args
	try{
		client.remove(torrentId, (err) =>
		{	
			if(err){
				throw err
			} else{
				ctx.reply('torrent remove successful')
			}
		})
	} catch (err){
		ctx.reply('torrent remove failed')
	}
})

//list
bot.command('list',(ctx) => {
	fileManager.list('./file_save')
		.then((entries) => {
			ctx.reply(entries)
		})
		.catch((error) => {ctx.reply(error.code)})
})

//listFolder
bot.command('ls',(ctx) => {
	let Path = ctx.state.command.args
	fileManager.listDeep(`./file_save/${Path}`)
		.then((entries) => {
			ctx.reply(entries)
		})
		.catch((error) => {ctx.reply(error.code)})
})

//uploadVideo
bot.command('uploadVideo',(ctx) => { 
	let Video = ctx.state.command.args
	ctx.telegram.sendDocument({
		source: `/home/telegram_torrent/file_save/${Video}`
	})
	.catch((error) => {ctx.reply('failed:reason maybe files too large(less than 50mb)')})
})

//removeFolder
bot.command('rmdir',(ctx) => {
	let dir = ctx.state.command.args
	fileManager.removeDir(`./file_save/${dir}`)
		.then((path) => {ctx.reply('remove folder successful')})
		.catch((error) => {ctx.reply('remove folder failed')})
})

//removeFiles
bot.command('rmfile',(ctx) => {
	let filename = ctx.state.command.args
	fileManager.removeFile(`./file_save/${filename}`)
		.then((path) => {ctx.reply('remove file successful')})
		.catch((error) => {ctx.reply('remove file failed')})
})

//rename
bot.command('rename',(ctx) => {
	file_name = ctx.state.command.args
	ctx.reply('input new name')
	bot.command('newname',(ctx) =>{
		let newname = ctx.state.command.args
		fileManager.rename(`./file_save/${file_name}`,`./file_save/${newname}`)
			.then((newPath) => {ctx.reply('rename successful')})
			.catch((error) => {ctx.reply('rename failed')})
	})
})

bot.startPolling()

