const five = require("johnny-five");

export function _controlFertilizerPump({state, time}, board, callback) {
    const fertilizerPumprelay = new five.Relay(27);

    if (state === true) {
        fertilizerPumprelay.toggle();
        console.log(`fertilizer: ${fertilizerPumprelay.isOn}`);
    }

    const offFun = () => {
        fertilizerPumprelay.toggle();
        console.log("fertilizer off");

        if (typeof callback === "function") {
            callback();
        }
    };
    setTimeout(offFun, time);
    // board.wait(time, offFun);
}
