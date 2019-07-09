import { controlWaterPump } from "~/control/commands/controlWaterPump";

// /api/control/controlWaterPump?state=true&time=1000
export function methodControlWaterPump(req, res) {
    const state = req.body.state === true;
    const time = Number(req.body.time) || 0;
    console.log(`method controlWaterPump: ${state} ${time}`);
    controlWaterPump({ state, time });
    res.end();
}
