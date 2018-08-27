import { backToPoint } from "control/detail/controlPoint";
import { changeLedState } from "control/detail/changeLedState";
import { setBoardReady } from "control/setBoardReady";

const five = require("johnny-five");

/**
 * @param {Object} point { x, y, z }
 * @param {Object} led { red, green, blue }
 * @returns {undefined} no return
 */
export function back(point, led) {
    setBoardReady(() => {
        turnOffAllPump();
        backToPoint(point);
        changeLedState(led);
    });
}

function turnOffAllPump() {
    const waterPumprelay = new five.Relay(25);
    const fertilizerPumprelay = new five.Relay(27);
    waterPumprelay.off();
    fertilizerPumprelay.off();
}
