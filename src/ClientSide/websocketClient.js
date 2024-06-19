const io = require('socket.io-client');

const socket = io('ws://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('customerStatusUpdated', (payload) => {
  console.log('Received customer status update:', payload);
});

socket.on('newCabRequest', (payload) => {
  console.log('Received new cab request:', payload);
});

socket.on('requestStatus:2', (payload) => {
  console.log('Received request status update:', payload);
  // Update UI or take necessary actions based on the received status
});
