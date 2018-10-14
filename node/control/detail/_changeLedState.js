const five = require("johnny-five");
const _ = require("underscore");

export function _changeLedState({red, green, blue}, callback) {
    const leds = {
        red: {isOn: red, entity: new five.Led(17)},
        green: {isOn: green, entity: new five.Led(23)},
        blue: {isOn: blue, entity: new five.Led(16)}
    };
    _.each(leds, ({isOn, entity}) => {
        if (isOn) {
            // 因控制接地端，所以 off 為亮
            entity.off();
        } else {
            entity.on();
        }
    });

    if (typeof callback === "function") {
        callback();
    }
}