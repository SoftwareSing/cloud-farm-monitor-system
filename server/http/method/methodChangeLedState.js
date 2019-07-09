import { changeLedState } from "~/control/commands/changeLedState";

// /api/control/changeLedState
export function methodChangeLedState(req, res) {
    const color = req.body.color;
    console.log(`method changeLedState: ${color}`);
    changeLedState(color);
    res.end();
}
