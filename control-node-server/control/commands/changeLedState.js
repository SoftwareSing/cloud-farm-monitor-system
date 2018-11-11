import { addCommand, doNextCommand, startDoCommand } from "~/control/commands/commands";
import { _changeLedState } from "~/control/detail/_changeLedState";

export function changeLedState({ red, green, blue }) {
    addCommand(() => {
        _changeLedState({ red, green, blue }, doNextCommand);
    });

    startDoCommand();
}
