const { io } = require('../server');
const { TicketManager } = require('../classes/ticket-manager');

const ticketManager = new TicketManager();


io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketManager.next();
        console.log(next);
        callback(next);
    });

    client.emit('lastTicket', {
        last: ticketManager.getLastTicket(),
        last4: ticketManager.getLast4()
    });

    client.on('attendTicket', (data, callback) => {

        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk field is mandatory'
            });
        }

        let attendTicket = ticketManager.serveTicket(data.desk);
        callback({
            err: !attendTicket.number,
            message: !attendTicket.number ?
                attendTicket : { ticket: attendTicket }
        });

        client.broadcast.emit('last4', ticketManager.getLast4());

    });

});