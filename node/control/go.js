import { moveToPoint } from "control/detail/controlPoint";
import { changeLedState } from "control/detail/changeLedState";
import { controlWaterPump } from "control/detail/controlWaterPump";
import { controlFertilizerPump } from "control/detail/controlFertilizerPump";
import { setBoardReady } from "control/setBoardReady";

/**
 * @param {Object} point { x, y, z }
 * @param {Object} water { state, time }
 * @param {Object} fertilizer { state, time }
 * @param {Object} led { red, green, blue }
 * @returns {undefined} no return
 */
export function go(point, water, fertilizer, led /*, seed*/) { //撒種子暫緩
    setBoardReady((board) => {
        moveToPoint(point);
        controlWaterPump(water, board);
        controlFertilizerPump(fertilizer, board);
        changeLedState(led);
    });
}
