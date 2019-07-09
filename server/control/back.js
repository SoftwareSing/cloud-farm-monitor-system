import { setBoardReady } from "~/control/setBoardReady";
import { _backToPoint } from "~/control/detail/_controlPoint";
import { _changeLedState } from "~/control/detail/_changeLedState";


const five = require("johnny-five");

/**
 * @param {Object} point { x, y, z }
 * @param {Object} led { red, green, blue }
 * @returns {undefined} no return
 */
export function back(point, led) {
    setBoardReady(() => {
        turnOffAllPump();
        _backToPoint(point);
        _changeLedState(led);
    });
}

function turnOffAllPump() {
    const waterPumprelay = new five.Relay(25);
    const fertilizerPumprelay = new five.Relay(27);
    waterPumprelay.off();
    fertilizerPumprelay.off();
}
