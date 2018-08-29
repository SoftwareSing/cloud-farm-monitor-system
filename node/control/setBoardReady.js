import { io } from "~/control/io";


const five = require("johnny-five");

/**
 * 設定需要在board ready後執行的程式
 * @param {function} callback board ready後要執行的function, 會將board當參數傳入
 * @returns {undefined} no return
 */
export function setBoardReady(callback) {
    const board = new five.Board({io: io, repl: true});

    io.once("ready", function() {
        console.log("IO Ready");
        io.isReady = true;

        board.on("ready", function() {
            console.log("five ready");

            callback(board);
        });
    });
}
