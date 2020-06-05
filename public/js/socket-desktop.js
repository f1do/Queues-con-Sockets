// Estrableciendo conexión
var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is mandatory');
}

var desktop = params.get('desktop');
var label = $('small');

$('h1').text('Desktop ' + desktop);

$('button').on('click', function() {

    socket.emit('attendTicket', { desk: desktop }, (ticket) => {
        if (ticket.err) {
            label.text(ticket.message);
            alert(ticket.message);
            return;
        }
        console.log(ticket.message);
        label.text('Ticket ' + ticket.message.ticket.number);
    });

});