const socket = io();

// get username and room from url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// emit to server that new user has joined
socket.emit('new-user-join', {username: username, room: room});

document.addEventListener('DOMContentLoaded', () => {  
    const chatMessage = document.querySelector('.chat-message');
    const chatInput = document.getElementById('chat-input');
    const roomName = document.getElementById('room-name');
    const roomUsers = document.getElementById('room-users');
    const chatForm = document.getElementById('chat-form');
    const tooltip = document.getElementById('Tooltip');
    const boldBtn = document.getElementById('bold-btn');
    const italicBtn = document.getElementById('italic-btn');
    const linkBtn = document.getElementById('link-btn');
    var audio = new Audio('audio.mp3');

    //get room and users info to display on client side
    socket.on('room-users', ({room, users}) => {
        outputRoomName(room);
        outputRoomUsers(users);
    });

    // display the message sent by server
    socket.on('message', (message) => {
        outputServerMessage(message);
        chatMessage.scrollTop = chatMessage.scrollHeight;
    });

    // display the message sent by server
    socket.on('receive-message', (message) => {
        outputMessage(message, 'left');
        chatMessage.scrollTop = chatMessage.scrollHeight;
        audio.play(); //play this audio for notification on receiving message
    });

    // add submit event for chatForm
    chatForm.addEventListener('submit', (e) =>{
        e.preventDefault(); 
        
        // check if chatInput is not empty
        if (chatInput.innerHTML.trim() !== ""){
            const msg = chatInput.innerHTML;
            outputMessage(formatMessage('You', msg), 'right');
            
            // emit message to server
            socket.emit('send-message', msg);

            // clear the message
            chatInput.innerHTML = '';
            chatInput.focus();
            chatMessage.scrollTop = chatMessage.scrollHeight;
        }
        else{
            e.preventDefault(); // Stop form from submitting
            tooltip.style.visibility = 'visible'; //show tooltip when chatInput is empty
            chatInput.focus();
            const inputRect = chatInput.getBoundingClientRect();
            tooltip.style.left = inputRect.left + 'px';
            tooltip.style.top = inputRect.bottom + 2 + 'px';
            // Hide tooltip after 1.5 seconds
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
            }, 1500);
        }
    });

    //event for making selected text bold
    boldBtn.addEventListener('click', () => {
        chatInput.focus();
        document.execCommand('bold');
    });

    //event for making selected text italic
    italicBtn.addEventListener('click', () => {
        chatInput.focus();
        document.execCommand('italic');
    });

    //event to make the entered text to link
    linkBtn.addEventListener('click', () => {
        const url = prompt("Enter URL:", "https://");
        if (url) {
            chatInput.focus();
            document.execCommand('createLink', false, url);
        }
    });

    //format message to include username, text and time
    function formatMessage(username, text) {
        return {
            username,
            text,
            time: (new Date()).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
    }}

    // output message to DOM
    function outputMessage(message, position){
        const div = document.createElement('div');
        div.classList.add("message");
        div.classList.add(position);
        div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
                    <p class="text">${message.text}</p>`;
        chatMessage.appendChild(div);
    }

    // output message to DOM
    function outputServerMessage(message){
        const p = document.createElement('p');
        p.classList.add("app-message");
        p.innerHTML = `${message}`;
        document.querySelector('.chat-message').appendChild(p);
    }

    // output room name to DOM
    function outputRoomName(room){
        roomName.innerHTML = room;
    }
        
    // output room users to DOM
    function outputRoomUsers(users){
        roomUsers.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
    }
});  



