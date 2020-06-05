// Estrableciendo conexión
var socket = io();
var label1 = $('#lblTicket1');
var label2 = $('#lblTicket2');
var label3 = $('#lblTicket3');
var label4 = $('#lblTicket4');

var desk1 = $('#lblDesk1');
var desk2 = $('#lblDesk2');
var desk3 = $('#lblDesk3');
var desk4 = $('#lblDesk4');

var lblTickets = [label1, label2, label3, label4];
var lblDesktops = [desk1, desk2, desk3, desk4];

socket.on('lastTicket', (lastTicket) => {
    console.log('Cambia titulo', lastTicket);
    refreshHTML(lastTicket.last4);
});

socket.on('last4', (last4) => {
    refreshHTML(last4);

    var ring = new Audio('audio/new-ticket.mp3').play();
    if (ring !== undefined) {
        ring.then(_ => {
            console.log('New turn');
        }).catch(err => {
            console.log(err);
        });
    }
});

function refreshHTML(last4) {
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblDesktops[i].text('Desktop ' + last4[i].desk);
    }
}