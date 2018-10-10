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
            entity.on();
        } else {
            entity.off();
        }
    });

    if (typeof callback === "function") {
        callback();
    }
}
