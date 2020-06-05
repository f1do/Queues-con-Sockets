const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketManager {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');


        if (data.today === this.today) {
            this.last = Number(data.last);
            this.tickets = data.tickets;
            this.last4 = data.last4 || [];
        } else {
            this.resetCount();
        }
    }

    next() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLast4() {
        return this.last4;
    }

    serveTicket(desk) {
        if (this.tickets.length === 0) {
            return 'There\'s no tickets';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desk);
        this.last4.unshift(attendTicket);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }

        this.saveFile();

        return attendTicket;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        this.saveFile();
    }

    saveFile() {
        let data = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonData = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', jsonData);
    }

}

module.exports = {
    TicketManager,
    Ticket
}