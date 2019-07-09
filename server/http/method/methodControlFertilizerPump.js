import { controlFertilizerPump } from "~/control/commands/controlFertilizerPump";

// /api/control/controlFertilizerPump
export function methodControlFertilizerPump(req, res) {
    const state = req.body.state === true;
    const time = Number(req.body.time) || 0;
    console.log(`method controlFertilizerPump: ${state} ${time}`);
    controlFertilizerPump({ state, time });
    res.end();
}
