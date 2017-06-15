'use strict'

module.exports = class Generator {

    constructor(events) {
        this.events = events
        this.hosts = [
            "ip-10-22-94-50.us-west-2.compute.internal",
            "192.168.99.100",
            "192.168.99.232",
            "192.168.90.687"
        ]
    }

    get() {
        var evt = this.events[this.getRandomInt(0, this.events.length)];
        evt.HOSTNAME = this.hosts[this.getRandomInt(0, this.hosts.length)]
        if (evt.level == "INFO") {
            evt.data = { 
                "acquiring": this.getRandomInt(0, 10),
                "ready": this.getRandomInt(0, 10),
                "processing": this.getRandomInt(0, 10)
            }
        }
        return evt
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
