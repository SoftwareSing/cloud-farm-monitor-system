const five = require("johnny-five");

export function _controlFertilizerPump({state, time}, board, callback) {
    const fertilizerPumpMotor = new five.Motor({
        pins: {
            pwm: 6,
            dir: 27
        }
    });

    if (state === true) {
        fertilizerPumpMotor.stop();
        console.log(`fertilizer (motor): forward`);
    }

    const offFunction = () => {
        fertilizerPumpMotor.forward(255);
        console.log(`fertilizer (motor): stop`);

        if (typeof callback === "function") {
            callback();
        }
    };
    setTimeout(offFunction, time);
    // board.wait(time, offFun);
}
