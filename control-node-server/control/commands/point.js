import { addCommand, doNextCommand, startDoCommand } from "~/control/commands/commands";
import { _moveToPoint, _backToPoint } from "~/control/detail/_controlPoint";

/**
 * @param {Object} point { x, y, z }
 * @returns {undefined} no return
 */
export function goPoint(point) {
    addCommand(() => {
        _moveToPoint(point, doNextCommand);
    });

    startDoCommand();
}

/**
 * @param {Object} point { x, y, z }
 * @returns {undefined} no return
 */
export function backPoint(point) {
    addCommand(() => {
        _backToPoint(point, doNextCommand);
    });

    startDoCommand();
}

