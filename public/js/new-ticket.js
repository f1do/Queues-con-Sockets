// Estrableciendo conexión
var socket = io();
var label = $('#lblNewTicket');

socket.on('lastTicket', (lastTicket) => {
    console.log('Cambia titulo', lastTicket);
    label.text(lastTicket.last);
});

$('button').on('click', function() {

    socket.emit('nextTicket', null, (nextTicket) => {
        label.text(nextTicket);
    });

});