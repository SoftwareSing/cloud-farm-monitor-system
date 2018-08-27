const five = require("johnny-five");

/**
 * @param {Object} point { x, y, z }
 * @returns {undefined} no return
 */
export function moveToPoint({x, y, z}) {
    const {stepperX, stepperY, stepperZ} = getSteppers();

    stepperX.rpm(180).cw()
        .step(x, function() { //cw還是前進
            console.log("x done");
        });

    stepperZ.rpm(180).ccw()
        .step(z, function() { //ccw上升
            console.log("z done");
        });

    stepperY.rpm(180).cw()
        .step(y, function() {
            console.log("y done");

            stepperZ.rpm(180).cw()
                .step(z, function() { //cw下降
                    console.log("z done");
                });
        });
}

export function backToPoint({x, y, z}) {
    const {stepperX, stepperY, stepperZ} = getSteppers();

    stepperX.rpm(180).ccw()
        .step(x, function() {
            console.log("x done");
        });

    stepperZ.rpm(180).ccw()
        .step(z, function() {
            console.log("z done");
        });

    stepperY.rpm(180).ccw()
        .step(y, function() {
            console.log("y done");

            stepperZ.rpm(180).cw()
                .step(z, function() {
                    console.log("z done");
                });
        });
}

function getSteppers() {
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

    return {stepperX, stepperY, stepperZ};
}
