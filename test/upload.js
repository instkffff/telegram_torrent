const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')
const fileManager = require('file-manager-js')
require('dotenv').config({path:'../config.env'})
//new telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN)

//mid_ware
bot.use(commandParts())

bot.command('uploadVideo',(ctx) => { 
	let Viedo = ctx.state.command.args
	console.log(ctx.state.command.args)
	ctx.telegram.sendDocument({
		source: './file_save/bbb_sunflower_1080p_60fps_stereo_abl.mp4'
	})
	.catch((error) => {ctx.reply(error)})
})

bot.startPolling()