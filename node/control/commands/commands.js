import { setBoardReady } from "~/control/setBoardReady";

const commands = [];
let isRuningCommand = false;
let board = null;

/**
 * 加入新的command
 * @param {Function} command 要執行的command, 會傳入board作為參數: command(board)
 * @returns {undefind} no return
 */
export function addCommand(command) {
    commands.push(command);
}

function getCommand() {
    return commands.shift();
}

export function doNextCommand() {
    const nextCommand = getCommand();
    if (nextCommand) {
        isRuningCommand = true;
        nextCommand(board);
    } else {
        isRuningCommand = false;
    }
}

export function startDoCommand() {
    if (!isRuningCommand) {
        isRuningCommand = true;
        if (!board) {
            setBoardReady((newBoard) => {
                board = newBoard;
                doNextCommand();
            });
        } else {
            doNextCommand();
        }
    }
}
