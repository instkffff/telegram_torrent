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
	client.add(magnetic_url,{path: './file_save'}, 
		function(torrent){
			bot.use((ctx) => {ctx.replay('torrent download start')})
			torrent.on('done',function(){
				bot.use((ctx) => {ctx.replay('torrent download finished')})
				var file_list = torrent.files.find(
					function(file_list){
						return file.path.endsWith(['.mp4','.m4v','.mkv','.avi'])
				})
				bot.use((ctx) => {ctx.replayWithVideo({
						source:fs.createReadStream(`./file_save/ ${file_list}`)
					})
				})
			})
		})
})

//current download list


//destroy
bot.command('destroy',(ctx) => {
	let torrent_id = ctx.state.command.args
	client.remove(torrent_id,
		function(){
			bot.use((ctx) => {ctx.replay('remove torrent successful')})
		}).catch(function(err){
			bot.use((ctx) => {ctx.replay('please contact NightCandle for help')})
		})
})

bot.startPolling()