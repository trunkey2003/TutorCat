#!/usr/bin/env node

/**
 * Module dependencies.
 */

 var app = require('../app');
 const room = require('../src/models/roomModel');
 const { Server } = require('socket.io');
 var http = require('http');
 
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '5000');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 const io = new Server(server, {
   cors: {
     origin: [process.env.clientI, process.env.clientII]
   }
 });
 
 io.of('/live').on("connection", (socket) => {
   socket.emit("myID", socket.id);
 })
 
 // io.engine.generateId = function (req) {
 //   console.log(referer);
 //   return Math.random() * 100000;
 // }
 
 io.of('/room').on("connection", async (socket) => {
   socket.emit("me", socket.id);
   socket.on("create room", (id) => {
     socket.join(id);
     socket.roomID = id;
     io.of('/live').emit("update room");
   })
 
   socket.on("join room", (id) => {
     socket.join(id);
     socket.roomID = id;
     socket.broadcast.to(id).emit('remote join room', socket.id);
     socket.broadcast.to(id).emit('new chat break', socket.id + ' joined room');
     io.of('/live').emit("update room");
   });
 
   io.of("/room").adapter.on("create-room", (room) => {
     console.log(`room ${room} was created`);
   });
 
   socket.on('turn webcam off', (roomID) => {
     socket.broadcast.to(roomID).emit('remote turned webcam off');
   });
 
   socket.on('turn webcam on', (roomID) => {
     socket.broadcast.to(roomID).emit('remote turned webcam on');
   });
 
   socket.on('start sharing screen', (roomID) => {
     socket.broadcast.to(roomID).emit('remote started sharing screen');
   });
 
   socket.on('stop sharing screen', (roomID) => {
     socket.broadcast.to(roomID).emit('remote stoped sharing screen');
   });
 
   socket.on('start sharing audio', (roomID) =>{
     socket.broadcast.to(roomID).emit('remote started sharing audio');
   });
 
   socket.on('stop sharing audio', (roomID) =>{
     socket.broadcast.to(roomID).emit('remote stoped sharing audio');
   });
 
   socket.on("me chat", ({content, roomID}) =>{
     socket.broadcast.to(roomID).emit('remote chatted', content);
   });
 
   socket.on("me send code", ({content, roomID}) =>{
     socket.broadcast.to(roomID).emit('remote sent code', content);
   });
 
   socket.on("new chat break", ({content, roomID}) =>{
     socket.broadcast.to(roomID).emit("new chat break", content);
   });
 
   //Khi 1 người ngắt kết nối với room sẽ xóa socket id của người đó lưu trong DB ra
   //Nếu người đó là chủ room thì sẽ xóa phòng và thông báo cuộc gọi kết thúc
   //Nếu người đó là người join vào thì sẽ xóa socket.id của người đó đi và giảm userCount xuống 1 đơn vị đồng thời thông báo chủ room biết có người rời đi
   socket.on('disconnect', () => {
     //Tìm room mà người vừa disconnect đó ở
     // room.findOneAndDelete({userCount : 0}); //khỏi đợi
     room.findOne({
       $or: [
         { userID1: socket.id },
         { userID2: socket.id },
       ]
     })
       .then((_room) => {
         //Nếu room này đã xóa ở request khác rồi
         if (!_room) {
           return;
         }
     
         //Nếu còn một người hoặc là chủ room là người thoát thì delete //Lúc nào cũng là chủ room vì chủ room mà thoát thì phòng cũng phải kết thức. logic <= 1 là lâu lâu bị lỗi nó xóa luôn
         if (_room.userCount <= 1 || _room.userID1 == socket.id) {
           room.findOneAndDelete({roomID : _room.roomID}).then(() => {socket.broadcast.to(_room.roomID).emit('end call'); io.of('/live').emit("update room");});
         } else {
           const userID2 = _room.userID2;
           //nếu không phải chủ room
           room.findOneAndUpdate({
             roomID : _room.roomID
           }, { $inc: { userCount: -1 }, $set : {userID2 : ''} })
             .then(() => {
               console.log(socket.id + ' leave room');
             })
             .catch((err) => {
               console.log(err);
             })
             .finally(() =>{
               //thông báo chủ room biết có người vừa thoát
               io.of('/live').emit("update room");
               socket.broadcast.to(_room.roomID).emit('remote leave call');
               socket.broadcast.to(_room.roomID).emit('new chat break', userID2 + ' left room');
             })
         }
       })
       .catch((err) => {
         console.log(err);
       });
   });
 })
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'url ' + 'http://localhost:' + addr.port; //dev
   console.log('Listening on ' + bind);
 }
 