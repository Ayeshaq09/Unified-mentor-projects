const path = require('path');
const http = require("http");
const express = require('express');
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');
const {userJoin, userLeave, getCurrentUser, getRoomUsers, getUsername} = require('./utils/users');

const app = express();

const server = http.createServer(app);

//set static folder()
app.use(express.static(path.join(__dirname, 'public')));

const io = socketio(server);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    `Server started running on port: ${PORT}`
});

// runs when client connects
io.on('connection', (socket) => {
    console.log('New connection');

    // check if username exists
    socket.on('check-user', ({ username, room }) => {
        const userFound = getUsername(username);
        if (userFound) {
            socket.emit('user-exists', username); // Username already exists
        } else {
            socket.emit('user-ok', { username, room }); // Let the user proceed
        }
    });

    // runs when the new user joins
    socket.on('new-user-join', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // emit event to client side to tell that new user has joined
        socket.broadcast.to(user.room).emit('message', `${user.username} has joined the chat`);

        // send room and users info to client side
        io.to(user.room).emit('room-users', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });

    // runs when user sends a message
    socket.on('send-message', (message) => {
        const user = getCurrentUser(socket.id);  

        // emit the message to client side to display
        socket.broadcast.to(user.room).emit('receive-message', formatMessage(user.username, message));
    });

    // runs when user leaves the chat room
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            // emit to client side that user has left the chat
            socket.broadcast.to(user.room).emit('message', `${user.username} has left the chat`);

            //send room and users to client side
            io.to(user.room).emit('room-users', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    });


});