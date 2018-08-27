import { go } from "control/go";
import { back } from "control/back";

const VirtualSerialPort = require("udp-serial").SerialPort;
const firmata = require("firmata");
const five = require("johnny-five");

const sp = new VirtualSerialPort({
    host: "172.23.99.10"
});
console.log("hi");
const io = new firmata.Board(sp);
console.log("hi again");

function led(LED) {
    const board = new five.Board({io: io, repl: true});

    // const x = point.x;

    const LEDRed = LED.Red;
    const LEDGreen = LED.Green;
    const LEDBlue = LED.Blue;

    io.once("ready", function() {
        console.log("fuck");
        console.log("IO Ready");
        io.isReady = true;

        board.on("ready", function() {
            console.log("five ready");

            //var led = new five.Led();
            const stopButtonX = new five.Button({
                pin: 3,
                invert: true
            });
            const stopButtonY = new five.Button({
                pin: 14,
                invert: true
            });
            const stopButtonZ = new five.Button({
                pin: 18,
                invert: true
            });

            const stepperX = new five.Stepper({
                type: five.Stepper.TYPE.DRIVER,
                stepsPerRev: 500,
                pins: {
                    step: 54,
                    dir: 55
                }
            });
            const stepperY = new five.Stepper({
                type: five.Stepper.TYPE.DRIVER,
                stepsPerRev: 500,
                pins: {
                    step: 26,
                    dir: 28
                }
            });
            const stepperZ = new five.Stepper({
                type: five.Stepper.TYPE.DRIVER,
                stepsPerRev: 200,
                pins: {
                    step: 36,
                    dir: 34
                }
            });

            const ledR = new five.Led(17);
            const ledG = new five.Led(23);
            const ledB = new five.Led(16);

            const waterPumprelay = new five.Relay(25);

            const fertilizerPumprelay = new five.Relay(27);

            waterPumprelay.off();

            fertilizerPumprelay.off();

            if (LEDRed === true) {
                ledR.on();
            }
            if (LEDGreen === true) {
                ledG.on();
            }
            if (LEDBlue === true) {
                ledB.on();
            }

            // while (stopButtonX.off) { //要測
            //     stepperX.rpm(180).ccw()
            //         .step(1, function() {
            //             console.log("x retrun to end");
            //         });
            // }
            // while (stopButtonY.off) { //要測
            //     stepperY.rpm(180).ccw()
            //         .step(1, function() {
            //             console.log("Y retrun to end");
            //         });
            // }
            // while (stopButtonZ.off) { //要測
            //     stepperZ.rpm(180).ccw()
            //         .step(1, function() {
            //             console.log("Z retrun to end");
            //         });
            // }
        });
    });
}

const xyzinput = {
    x: 1000, //走1000步
    y: 1000,
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

go(xyzinput, water, fertilizer, LED); //xyz座標, 水幫浦, 肥料幫浦, LED顏色

back(xyzinput, water, fertilizer, LED);

led(LED);
