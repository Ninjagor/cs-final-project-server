const { io } = require("socket.io-client");

// const socket = io("https://cs-final-project-server-dev-dqpk.1.us-1.fl0.io", { transports: ['websocket'] });
const socket = io("http://localhost:3000", { transports: ['websocket'] });


let userId;

// socket.on('connection_details', (details) => {
//     console.log(details)
//     userId = details.userid;
//     // changeUsername();
//     // socket.emit('create_room', "cool_room");
//     // socket.emit('join_room', "cool_room")
// })

socket.on('connection_details', (data) => {
		console.log(data)
})

socket.on('error', (message) => {
    console.log(`ERROR: ${message}`);
})

socket.on('global_chat', (message) => {
    console.log(message);
})

socket.on('room_chat', (message) => {
    console.log(message);
})



function changeUsername() {
    // setTimeout(() => {
    //     const url = 'http://localhost:3000/configure/username';
    //     const data = { username: 'ooga booga', userid: userId };
    //     fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }, 0);
    // socket.emit('change_username', userId, 'ooga booga man');
}

// const readline = require('node:readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
//
// readline.question(`Enter chat message: `, message => {
//     console.log("CHAT SENT")
//     socket.emit('room_chat', message, "global")
// });
//
