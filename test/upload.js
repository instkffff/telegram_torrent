const Telegraf = require('telegraf')
const commandParts = require('telegraf-command-parts')
const fileManager = require('file-manager-js')
bot.command('uploadVideo',(ctx) => { 
	let Viedo = ctx.state.command.args
	console.log(ctx.state.command.args)
	ctx.replyWithVideo({
		source: './file_save/bbb_sunflower_1080p_60fps_stereo_abl.mp4'
	})
	.catch((error) => {ctx.reply('failed')})
})