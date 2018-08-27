const five = require("johnny-five");

export function controlFertilizerPump({state, time}, board) {
    const fertilizerPumprelay = new five.Relay(27);

    if (state === true) {
        fertilizerPumprelay.on();
    }

    board.wait(time, function() {
        fertilizerPumprelay.off();
        console.log("fertilizer off");
    });
}
