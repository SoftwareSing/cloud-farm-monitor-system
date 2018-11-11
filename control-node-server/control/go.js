import { setBoardReady } from "~/control/setBoardReady";
import { _moveToPoint } from "~/control/detail/_controlPoint";
import { _controlWaterPump } from "~/control/detail/_controlWaterPump";
import { _controlFertilizerPump } from "~/control/detail/_controlFertilizerPump";
import { _changeLedState } from "~/control/detail/_changeLedState";

/**
 * @param {Object} point { x, y, z }
 * @param {Object} water { state, time }
 * @param {Object} fertilizer { state, time }
 * @param {Object} led { red, green, blue }
 * @returns {undefined} no return
 */
export function go(point, water, fertilizer, led /*, seed*/) { //撒種子暫緩
    setBoardReady((board) => {
        _moveToPoint(point);
        _controlWaterPump(water, board);
        _controlFertilizerPump(fertilizer, board);
        _changeLedState(led);
    });
}
