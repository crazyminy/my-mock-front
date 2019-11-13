const EventEmitter = require('events');

class EventBus extends EventEmitter{
    transMessage = {}
}

const eventBus = new EventBus();

export default eventBus;
