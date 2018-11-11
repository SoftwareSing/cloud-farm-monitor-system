const five = require("johnny-five");

export function _controlWaterPump({state, time}, board, callback) {
    const waterPumprelay = new five.Relay(25);

    if (state === true) {
        waterPumprelay.on();
    }

    board.wait(time, function() {
        waterPumprelay.off();
        console.log("water off");

        if (typeof callback === "function") {
            callback();
        }
    });
}
