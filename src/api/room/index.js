const router = require('express').Router();
const roomController = require('./room.controller');

router.get('/get/:roomID', roomController.getRoom);
router.post('/add', roomController.addRoom);
router.delete('/delete/:roomID', roomController.deleteRoom)
router.delete('/delete-if-empty/:roomID', roomController.deleteRoomIfEmpty);
router.put('/join/:roomID/:userID', roomController.increaseUserCount);
router.put('/leave/:roomID/:userID', roomController.decreaseUserCount);
router.get('/get', roomController.getAllAvailableRooms);

module.exports = router;
