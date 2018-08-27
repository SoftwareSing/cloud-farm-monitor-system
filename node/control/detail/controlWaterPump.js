const five = require("johnny-five");

export function controlWaterPump({state, time}, board) {
    const waterPumprelay = new five.Relay(25);

    if (state === true) {
        waterPumprelay.on();
    }

    board.wait(time, function() {
        waterPumprelay.off();
        console.log("water off");
    });
}
