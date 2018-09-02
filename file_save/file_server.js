const FileServer = require('file-server');
 
const fileServer = new FileServer((error, request, response) => {
    response.statusCode = error.code || 500;
    response.end(error);
});
 
const serveRobots = fileServer.serveDirectory('/home/telegram_torrent/file_save');
 
require('http')
    .createServer(serveRobots)
    .listen(8080);