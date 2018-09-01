const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')
const fileManager = require('file-manager-js')
require('dotenv').config({path:'../config.env'})
//new telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN)

//mid_ware
bot.use(commandParts())

bot.command('uploadVideo',(ctx) => { 
	let Video = ctx.state.command.args
	ctx.telegram.sendDocument({
		source: `/home/telegram_torrent/file_save/${Video}`
	})
	.catch((error) => {ctx.reply(error)})
})

bot.startPolling()