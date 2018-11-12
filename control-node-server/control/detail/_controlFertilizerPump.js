const five = require("johnny-five");

export function _controlFertilizerPump({state, time}, board, callback) {
    const fertilizerPumpMotor = new five.Motor({
        pins: {
            pwm: 29,
            dir: 25
        }
    });

    board.repl.inject({
        motor: fertilizerPumpMotor
    });

    if (state === true) {
        fertilizerPumpMotor.forward(255);
        console.log(`fertilizer (motor): forward`);
    }

    const offFun = () => {
        fertilizerPumpMotor.stop();
        console.log(`fertilizer (motor): stop`);

        if (typeof callback === "function") {
            callback();
        }
    };
    setTimeout(offFun, time);
    // board.wait(time, offFun);
}
