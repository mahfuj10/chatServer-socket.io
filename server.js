const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {

    console.log("user connected ", socket.id);


    socket.on("join_room", (data) => {
        socket.join(data);
        console.log('data', data);
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("recive_message", data);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    })
});


app.get('/', (req, res) => {
    res.send("Server runnint")
})
app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});