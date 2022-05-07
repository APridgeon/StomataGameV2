
const eventsCenter = new Phaser.Events.EventEmitter();

function resetEvents(eventsCenter){
    eventsCenter.destroy();
    eventsCenter = new Phaser.Events.EventEmitter();
}


export {eventsCenter, resetEvents};