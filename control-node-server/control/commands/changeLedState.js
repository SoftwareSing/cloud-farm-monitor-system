import { addCommand, doNextCommand, startDoCommand } from "~/control/commands/commands";
import { _changeLedState } from "~/control/detail/_changeLedState";

export function changeLedState(color) {
    addCommand(() => {
        _changeLedState(color, doNextCommand);
    });

    startDoCommand();
}
