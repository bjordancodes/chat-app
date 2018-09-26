var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

const port = process.env.PORT || 3001

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(port, ()=>{
    console.log("Connected to port " + port)
})