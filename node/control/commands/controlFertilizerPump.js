import { addCommand, doNextCommand, startDoCommand } from "~/control/commands/commands";
import { _controlFertilizerPump } from "~/control/detail/_controlFertilizerPump";

export function controlFertilizerPump({state, time}) {
    addCommand((board) => {
        _controlFertilizerPump({state, time}, board, doNextCommand);
    });

    startDoCommand();
}
