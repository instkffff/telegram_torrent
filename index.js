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
bot.command('magnetic',({ctx,replay}) => {
	let magnetic_url = ctx.state.command.args
	client.add(magnetic_url,{path: './file_save'}, 
		function(torrent){
			replay('torrent download start')
			torrent.on('done',function(){
				replay('torrent download finished')
				var file_list = torrent.files.find(
					function(file_list){
						return file.path.endsWith(['.mp4','.m4v','.mkv','.avi'])
				})
				ctx.replayWithVideo({
					source:fs.createReadStream(`./file_save/ ${file_list}`)
				})
			})
		})
})

//current download list
bot.command('onDownload',({ctx,replay}) => {
	torrent.on('download',function(bytes){
		replay('just downloaded:' + bytes)
		replay('total downloaded:' + torrent.downloaded)
		replay('progress:' + torrent.progress )
	})

})

//destroy
bot.command('destroy',({ctx,replay}) => {
	let torrent_id = ctx.state.command.args
	client.remove(torrent_id,
		function(){
			replay('remove torrent successful')
		}).catch(function(err){
			replay('please contact NightCandle for help')
		})
})

bot.startPolling()