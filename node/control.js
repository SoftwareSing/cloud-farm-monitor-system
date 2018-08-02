const VirtualSerialPort = require("udp-serial").SerialPort;
const firmata = require("firmata");
const five = require("johnny-five");

const sp = new VirtualSerialPort({
    host: "172.23.99.10"
});
console.log("hi");
const io = new firmata.Board(sp);
console.log("hi again");
const board = new five.Board({io: io, repl: true});

function back(point, water, fertilizer, LED) {

}

function go(point, water, fertilizer, LED) {
    // const x = point.x;
    const {x, y, z} = point;
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

            stepperX.rpm(180).cw()
                .step(x, function() {
                    console.log("x done");
                });

            stepperY.rpm(180).cw()
                .step(y, function() {
                    console.log("y done");
                });

            stepperZ.rpm(180).cw()
                .step(z, function() {
                    console.log("z done");
                });

            if (water === "On") {
                waterPumprelay.on();
            }

            board.wait(1000, function() {
                waterPumprelay.off();
                console.log("water off");
            });

            if (fertilizer === "On") {
                fertilizerPumprelay.on();
            }

            board.wait(1000, function() {
                fertilizerPumprelay.off();
                console.log("fertilizer off");
            });

            if (LED === "On") {
                ledR.on();
                ledG.on();
                ledB.on();
            }

        // servos.x = new five.Servo({pin: 4, startAt:90,range:[70,130]});

        // servos.y = new five.Servo({pin: 5, startAt: 120});

        // board.repl.inject({s:servos});

  		// Button Event API

  		// "down" the button is pressed
 		/*button.on("down", function() {
    		console.log("down");
 		 });

  		// "hold" the button is pressed for specified time.
  		//        defaults to 500ms (1/2 second)
  		//        set
  		button.on("hold", function() {
    		console.log("hold");
  		});

  		// "up" the button is released
  		button.on("up", function() {
   			console.log("up");
        });*/
        });
    });
}


const xyzinput = {
    x: 10,
    y: 20,
    z: 30
};
go(xyzinput, "off", "off", "off");


