//const whiteboard = require('./whiteboard');
import whiteboard from './whiteboard';
//const io = require('socket.io-client');
import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('load', (strokes) => {

  strokes.forEach( (stroke) => {
    let start = stroke.start;
    let end = stroke.end;
    let color = stroke.color;
    whiteboard.draw(start, end, color, false);
  });

});

socket.on('draw', (start, end, color) => {
  whiteboard.draw(start, end, color, false);
});

whiteboard.on('draw', (start, end, color) => {
  socket.emit('draw', start, end, color);
});
