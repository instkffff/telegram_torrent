//require
var WebTorrent = require('webtorrent')
require('dotenv').config({path:'./config.env'})
const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')

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
	ctx.reply('torrent download start')
	client.add(magnetic_url,{path: './file_save'}, 
		function(torrent){
			torrent.on('done',function(){
				ctx.reply('torrent download finished')
				var file_list = torrent.files.find(
					function(file_list){
						return file.path.endsWith(['.mp4','.m4v','.mkv','.avi'])
				})
				ctx.replyWithVideo({
					source:fs.createReadStream(`./file_save/ ${file_list}`)
				})
			})
		})
})

bot.startPolling()