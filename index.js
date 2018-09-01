//require
var WebTorrent = require('webtorrent')
require('dotenv').config({path:'./config.env'})
const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')
const file = require('./file.js')

//new telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN)
//new torrent client
const client = new WebTorrent()
//mid_ware
bot.use(commandParts())
//normal
bot.start((ctx) => ctx.reply('Welcome! please check /help for more information'))
bot.help((ctx) => ctx.reply('just for personal use torrent client via telegram, if you want use please contact NightCandle for permission.'))

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

bot.command('ls',(ctx) => {
	let Path = ctx.state.command.args
	ctx.reply(`${file.listPath(Path)}`)
})

bot.command('list',(ctx) => {
	ctx.reply(`${file.listPath('./file_save')}`)
})

bot.command('rm',(ctx) => {
	let Path = ctx.state.command.args
	try{
		file.removeFolder(Path, (err) => 
		{
			if(error){
				throw err
			} else{
				ctx.reply('removeFolder successful')
			}
		})
	} catch (err){
		ctx.reply('removeFolder failed')
	}
})

bot.command('uploadVideo',(ctx) => {
	let video = ctx.state.command.args
	ctx.replyWithVideo({
		source: `${video}`
	})
})

bot.startPolling()