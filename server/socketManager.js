const io = require('./index.js').io
const {VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../src/Events')
const {createUser, createMessage, createChat} = require('../src/Factories');
let connectedUsers = {}

module.exports = function(socket){
    console.log("Socket Id " + socket.id)

    socket.on(VERIFY_USER, (nickname, callback) => {
    if(isUser(connectedUsers, nickname)){
        callback({isUser:true, user:null})
    }
    else{
        callback({isUser: false, user:createUser({name: nickname})})
    }

    socket.on(USER_CONNECTED, (user)=> {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;

        io.emit(USER_CONNECTED, connectedUsers)
        console.log(connectedUsers);
    })
})


const addUser = (userList, user) => {
    let newList = Object.assign({}, userList)
    newList[user.name] = user;
    return newList
}

const removeUser = (userList, username) => {
    let newList = Object.assign({}, userlist)
    delete newList[username]
    return newList
}

const isUser = (userList, username) => {
    return username in userList
}
}