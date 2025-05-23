const socket = io();

document.addEventListener('DOMContentLoaded', () => {  
    const joinInput = document.getElementById('username');
    const joinForm = document.getElementById('join-form');
    const userTooltip = document.getElementById('user-Tooltip');
    const valueTooltip = document.getElementById('value-Tooltip');
    const createRoom= document.getElementById('create-room');
    const selectRoom = document.getElementById('select-room');

    // add submit event to joinForm
    joinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (joinInput.value.trim() !== '') {

            // emit to server to check for if username exists
            socket.emit('check-user', {username: joinInput.value, room: selectRoom.value});
        }
        else{
            valueTooltip.style.visibility = 'visible';
            const inputRect = joinInput.getBoundingClientRect();
            valueTooltip.style.left = inputRect.left + 'px';
            valueTooltip.style.top = inputRect.bottom + 5 + 'px';
            joinInput.focus();

            // Hide tooltip after 1.5 seconds
            setTimeout(() => {
                valueTooltip.style.visibility = 'hidden';
            }, 1500);
        }
    });

    // Allow users to add rooms and add that value to room dropdown
    createRoom.addEventListener('click', () => {
        const newRoom = prompt("Add new room name");
        if (newRoom === '' || newRoom === null){}
        else{
            const selectOption = document.createElement('option');
            selectOption.value = newRoom;
            selectOption.text = newRoom;
            selectRoom.appendChild(selectOption);
            document.querySelector(`#select-room [value="${newRoom}"]`).selected = true;
        }
    });

    // show tooltip that username exists
    socket.on('user-exists', name => {
        userTooltip.style.visibility = 'visible';
        const inputRect = joinInput.getBoundingClientRect();
        userTooltip.style.left = inputRect.left + 'px';
        userTooltip.style.top = inputRect.bottom + 5 + 'px';
        joinInput.focus();

        // Hide tooltip after 1.5 seconds
        setTimeout(() => {
            userTooltip.style.visibility = 'hidden';
        }, 1500);
    });

    // if username doesn't exists then submit the joinForm to open chatForm
    socket.on('user-ok', ({ username, room }) => {
        joinForm.submit();
    });
});  



