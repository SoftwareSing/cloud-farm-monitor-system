import { updateToDb } from "~/monitor/updateToDb";

export class ArduinoData {
    constructor() {
        if (ArduinoData._me) {
            return ArduinoData._me;
        } else {
            ArduinoData._me = this;
        }

        this.jsonData = {};
        this.lastUpdateTime = 0;
    }

    static get _me() {
        return this.__me;
    }

    static set _me(newOne) {
        this.__me = newOne;
    }

    set(jsonData) {
        this.jsonData = jsonData;
        this.update();
    }

    // 溫度值
    get airtemp() {
        return this.jsonData.airtemp;
    }
    // 濕度值
    get airhumid() {
        return this.jsonData.airhumid;
    }
    // 土壤濕度
    get soild1humid1() {
        return this.jsonData.soild1humid1;
    }
    // 土壤濕度
    get soild1humid2() {
        return this.jsonData.soild1humid2;
    }
    // ph值
    get ph() {
        return this.jsonData.ph;
    }
    // 水位
    get waterLevelTank1() {
        return this.jsonData.waterLevelTank1;
    }
    // 水位
    get waterLevelTank2() {
        return this.jsonData.waterLevelTank2;
    }

    update() {
        if (Date.now() - this.lastUpdateTime < 60000) {
            return;
        }

        this.lastUpdateTime = Date.now();
        updateToDb(this.jsonData);
        console.log("success auto update data to firebase");
    }
}
