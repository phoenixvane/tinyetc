input.onButtonPressed(Button.A, function () {
    オープン()
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    BLEUART = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    BLEUART = BLEUART.substr(0, BLEUART.length - 1)
    if (BLEUART == "o") {
        オープン()
    } else if (BLEUART == "c") {
        クローズ()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (オート == 0) {
        basic.showString("auto")
        オート = 1
    } else {
        basic.showString("manu")
        オート = 0
    }
})
input.onButtonPressed(Button.B, function () {
    クローズ()
})
function オープン () {
    if (ゲート == 0) {
        basic.showIcon(IconNames.Square)
        for (let カウンター = 0; カウンター <= 90; カウンター++) {
            pins.servoWritePin(AnalogPin.P0, カウンター)
            basic.pause(10)
        }
        ゲート = 1
    }
}
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == 1) {
        オープン()
    } else if (control.eventValue() == 3) {
        クローズ()
    }
})
function クローズ () {
    if (ゲート == 1) {
        basic.showIcon(IconNames.No)
        for (let カウンター = 0; カウンター <= 90; カウンター++) {
            pins.servoWritePin(AnalogPin.P0, 90 - カウンター)
            basic.pause(10)
        }
        ゲート = 0
    }
}
let BLEUART = ""
let オート = 0
let ゲート = 0
basic.showIcon(IconNames.Yes)
bluetooth.startIOPinService()
ゲート = 0
オート = 0
BLEUART = ""
basic.showIcon(IconNames.No)
pins.servoWritePin(AnalogPin.P0, 0)
basic.forever(function () {
    if (オート == 1) {
        if (Math.abs(input.magneticForce(Dimension.X)) >= 30) {
            オープン()
        } else {
            クローズ()
        }
        basic.pause(500)
    }
})
