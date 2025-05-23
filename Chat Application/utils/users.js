const users = [];

// add new users to users list
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);
    return user;
}

// get current user based on id
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

// get the user who has left the room and delete it from the list
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index != -1){
        return users.splice(index, 1)[0];
    }
}

// get all room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

// get current user based on username
function getUsername(name){
    return users.find(user => user.username === name);
}

module.exports = {userJoin, getCurrentUser, userLeave, getRoomUsers, getUsername}