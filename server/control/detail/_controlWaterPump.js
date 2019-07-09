const five = require("johnny-five");

export function _controlWaterPump({state, time}, board, callback) {
    const waterPumpMotor = new five.Motor({
        pins: {
            pwm: 11,
            dir: 25
        }
    });

    if (state === true) {
        console.log("water on");
        waterPumpMotor.stop();
    }

    const offFunction = () => {
        waterPumpMotor.forward(255);
        console.log("water off");

        if (typeof callback === "function") {
            callback();
        }
    };
    setTimeout(offFunction, time);
}
