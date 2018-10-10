const five = require("johnny-five");

const states = {
    done: "done",
    moving: "moving"
};

const stepperStates = {
    stepperX: states.done,
    stepperY: states.done,
    stepperZ: states.done
};

/**
 * @param {Object} point { x, y, z }
 * @param {function} [callback] callback
 * @returns {undefined} no return
 */
export function _moveToPoint({x, y, z}, callback) {
    const {stepperX, stepperY, stepperZ} = getSteppers();
    stepperStates.stepperX = states.moving;
    stepperStates.stepperY = states.moving;
    stepperStates.stepperZ = states.moving;

    stepperX.rpm(180).cw()
        .step(x, function() { //cw還是前進
            console.log("x done");
            stepperStates.stepperX = states.done;
        });

    stepperZ.rpm(180).ccw()
        .step(z, function() { //ccw上升
            console.log("z done");
            stepperStates.stepperZ = states.done;
        });

    stepperY.rpm(180).cw()
        .step(y, function() {
            console.log("y done");

            stepperZ.rpm(180).cw()
                .step(z, function() { //cw下降
                    console.log("z done");

                    stepperStates.stepperY = states.done;
                });
        });

    if (typeof callback === "function") {
        autoCheckDoneThenCallback(callback);
    }
}

/**
 * @param {Object} point { x, y, z }
 * @param {function} [callback] callback
 * @returns {undefined} no return
 */
export function _backToPoint({x, y, z}, callback) {
    const {stepperX, stepperY, stepperZ} = getSteppers();
    stepperStates.stepperX = states.moving;
    stepperStates.stepperY = states.moving;
    stepperStates.stepperZ = states.moving;

    stepperX.rpm(180).ccw()
        .step(x, function() {
            console.log("x done");
            stepperStates.stepperX = states.done;
        });

    stepperZ.rpm(180).ccw()
        .step(z, function() {
            console.log("z done");
            stepperStates.stepperZ = states.done;
        });

    stepperY.rpm(180).ccw()
        .step(y, function() {
            console.log("y done");

            stepperZ.rpm(180).cw()
                .step(z, function() {
                    console.log("z done");

                    stepperStates.stepperY = states.done;
                });
        });

    if (typeof callback === "function") {
        autoCheckDoneThenCallback(callback);
    }
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

function autoCheckDoneThenCallback(callback) {
    if (isAllDone()) {
        callback();
    } else {
        setTimeout(autoCheckDoneThenCallback, 500, callback);
    }
}

function isAllDone() {
    return stepperStates.stepperX === states.done && stepperStates.stepperY === states.done && stepperStates.stepperZ === states.done;
}
