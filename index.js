const io = require("socket.io-client");

// const baseUrl = 'http://localhost:8080';
// const baseUrl = 'https://fastcode.live';
const baseUrl = 'https://e994-103-215-225-194.in.ngrok.io';

// const socket = io("https://89e1-103-215-225-194.in.ngrok.io");
// const socket = io(baseUrl + "/project");



// import baseUrl from './baseurl'
// import { default as axios } from 'axios'
const axios = require('axios');

var username = "gaurav"

async function userDevicesData() {

    var userDevices = await axios.get(`${baseUrl}/api/userDevices/${username}`, {
        headers: {
            Authorization: 'Bearer ' + process.env['FASTCODE_TOKEN'],
        }
    })
    console.log("userDevices.data.userDevices[0].secretKey: ", userDevices.data.userDevices[0].secretKey)
    return userDevices.data.userDevices[0].secretKey;
}





const socket = io.connect(baseUrl + "/project", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
});
socket.on("connect", async () => {
    console.log("socket connected");
    var token = await userDevicesData();

    socket
        .on("authenticated", () => {
            // cli.action.stop();
            console.log("socket authenticated");
        })
        .on("unauthorized", (error, callback) => {
            console.log("unauthorized", error);
            if (
                error.data.type == "UnauthorizedError" ||
                error.data.code == "invalid_token"
            ) {
                // cli.action.stop(
                //     "Your device key is either invalid or has expired. \nPlease add your device key again."
                // );
                console.log("Your device key is either invalid or has expired. \nPlease add your device key again.")
                process.exit();
            }
        })
        .emit("authenticate", {
            token: token,
        });
});


function dashboard(params) {
    // socket.on("connect", () => {
    //     // console.log(`connected to ${socket.id}`);
    // });
    // socket.emit("projectData", {
    //     projectID: "62d7014be8ad1bebd2673fa6",
    //     deviceID: "dashboard",
    //     message: params,
    // })
    socket.emit("projectData", process.env.PROJECT_ID,params)



    // socket.disconnect();
}

module.exports = dashboard;
