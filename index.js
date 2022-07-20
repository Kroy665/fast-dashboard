const { io } = require("socket.io-client");

const socket = io("https://89e1-103-215-225-194.in.ngrok.io");

function dashboard(params) {
    socket.on("connect", () => {
        // console.log(`connected to ${socket.id}`);
    });
    socket.emit("dashboard", params)


    // socket.disconnect();
}

module.exports = dashboard;
