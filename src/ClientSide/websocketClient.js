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

// Example of sending a cab request
const requestCab = (pickupLatitude, pickupLongitude, customerId) => {
  socket.emit('requestCab', { pickupLatitude, pickupLongitude, customerId });
};

// Handle incoming cab request events
socket.on('newCabRequest', (data) => {
  console.log('New cab request:', data);
  // Handle the new cab request, e.g., display it to available drivers
});

socket.on('noDriversAvailable', (message) => {
  console.log(message);
});

// Call requestCab with example data
requestCab(12.9715987, 77.594566, 1);