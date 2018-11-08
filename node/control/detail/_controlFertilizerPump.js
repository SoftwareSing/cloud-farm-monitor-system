const five = require("johnny-five");

export function _controlFertilizerPump({state, time}, board, callback) {
    const fertilizerPumprelay = new five.Relay(27);

    if (state === true) {
        while (!fertilizerPumprelay.isOn) {
            fertilizerPumprelay.on();
        }
        console.log(`fertilizer (should on): ${fertilizerPumprelay.isOn}`);
    }

    const offFun = () => {
        while (fertilizerPumprelay.isOn) {
            fertilizerPumprelay.off();
        }
        console.log(`fertilizer (should off): ${fertilizerPumprelay.isOn}`);

        if (typeof callback === "function") {
            callback();
        }
    };
    setTimeout(offFun, time);
    // board.wait(time, offFun);
}
