const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

function dashboard(params) {
    socket.on("connect", () => {
        // console.log(`connected to ${socket.id}`);
    });
    socket.emit("dashboard", params)


    // socket.disconnect();
}

module.exports = dashboard;
