const VirtualSerialPort = require("udp-serial").SerialPort;
const firmata = require("firmata");

const sp = new VirtualSerialPort({
    host: "172.23.99.210"
});
console.log("hi");
export const io = new firmata.Board(sp);
console.log("hi again");
