import { addCommand, doNextCommand, startDoCommand } from "~/control/commands/commands";
import { _controlWaterPump } from "~/control/detail/_controlWaterPump";

export function controlWaterPump({state, time}) {
    addCommand((board) => {
        _controlWaterPump({state, time}, board, doNextCommand);
    });

    startDoCommand();
}
