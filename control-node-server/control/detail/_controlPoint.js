const five = require("johnny-five");

const steppersInfo = {
    stepperX: {
        moving: false,
        point: 0
    },
    stepperY: {
        moving: false,
        point: 0
    },
    stepperZ: {
        moving: false,
        point: 0
    }
};

function setStepperInfo(stepper, moving, moveStep = 0) {
    steppersInfo[stepper].point += moveStep;
    steppersInfo[stepper].moving = moving;
}

export function getStepperPoints() {
    return {
        x: steppersInfo.stepperX.point,
        y: steppersInfo.stepperY.point,
        z: steppersInfo.stepperZ.point
    };
}

/**
 * @param {Object} point { x, y, z }
 * @param {function} [callback] callback
 * @returns {undefined} no return
 */
export function _moveToPoint({x, y, z}, callback) {
    const {stepperX, stepperY, stepperZ} = getSteppers();
    setStepperInfo("stepperX", true);
    setStepperInfo("stepperY", true);
    setStepperInfo("stepperZ", true);

    stepperX.rpm(180).cw()
        .step(x, function() { //cw還是前進
            console.log("x done");
            setStepperInfo("stepperX", false, x);
        });

    stepperZ.rpm(180).ccw()
        .step(z, function() { //cw下降
            console.log("z done");
            setStepperInfo("stepperZ", false, z);
        });

    stepperY.rpm(180).cw()
        .step(y, function() {
            console.log("y done");
            setStepperInfo("stepperY", false, y);
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
    setStepperInfo("stepperX", true);
    setStepperInfo("stepperY", true);
    setStepperInfo("stepperZ", true);

    stepperX.rpm(180).ccw()
        .step(x, function() {
            console.log("x done");
            setStepperInfo("stepperX", false, x * -1);
        });

    stepperZ.rpm(180).cw()
        .step(z, function() { // ccw上升
            console.log("z done");
            setStepperInfo("stepperZ", false, z * -1);
        });

    stepperY.rpm(180).ccw()
        .step(y, function() {
            console.log("y done");
            setStepperInfo("stepperY", false, y * -1);
        });

    if (typeof callback === "function") {
        autoCheckDoneThenCallback(callback);
    }
}

const steppers = {
    stepperX: null,
    stepperY: null,
    stepperZ: null
};
function getSteppers() {
    if (!steppers.stepperX) {
        steppers.stepperX = new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 500,
            pins: {
                step: 54,
                dir: 55
            }
        });
    }
    if (!steppers.stepperY) {
        steppers.stepperY = new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 500,
            pins: {
                step: 26,
                dir: 28
            }
        });
    }
    if (!steppers.stepperZ) {
        steppers.stepperZ = new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 200,
            pins: {
                step: 36,
                dir: 34
            }
        });
    }

    return steppers;
}

function autoCheckDoneThenCallback(callback) {
    if (isAllDone()) {
        callback();
    } else {
        setTimeout(autoCheckDoneThenCallback, 500, callback);
    }
}

function isAllDone() {
    return (!steppersInfo.stepperX.moving) && (!steppersInfo.stepperY.moving) && (!steppersInfo.stepperZ.moving);
}
