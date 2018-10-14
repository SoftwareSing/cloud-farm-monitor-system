import { goPoint, backPoint } from "~/control/commands/point";
import { changeLedState } from "~/control/commands/changeLedState";
import { controlFertilizerPump } from "~/control/commands/controlFertilizerPump";
import { controlWaterPump } from "~/control/commands/controlWaterPump";

const xyzinput = {
    x: 5000, //走1000步
    y: 5000,
    z: 0
};
const water = {
    state: true, //true為開
    time: 1000 //1000等於1秒
};

const fertilizer = {
    state: true, //true為開
    time: 1000 //1000等於1秒
};

const LED = {
    red: true, //RG 黃 GB 淡藍 RB 粉紅 RGB 白
    green: true,
    blue: true
};

// const seed = {
//     seedState: true
// };

changeLedState(LED);
goPoint(xyzinput);
backPoint(xyzinput);
goPoint(xyzinput);
backPoint(xyzinput);
goPoint(xyzinput);
backPoint(xyzinput);
goPoint(xyzinput);
backPoint(xyzinput);
//controlWaterPump(water);
//controlFertilizerPump(fertilizer);
