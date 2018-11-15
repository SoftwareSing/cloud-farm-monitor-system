const five = require("johnny-five");
const _ = require("underscore");

export function _changeLedState(color, callback) {
    const led = new five.Led.RGB({
        pins: {
            red: 4,
            green: 5,
            blue: 3
        }
    });
    led.on();
    led.color(color);

    if (typeof callback === "function") {
        callback();
    }
}
