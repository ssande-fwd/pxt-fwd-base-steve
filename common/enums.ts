// If an enum could conceivably be reusable put it here.
// Else keep it with it's associated module.

namespace fwdEnums {
    export const enum OverUnder {
        //% block="over"
        Over,
        //% block="under"
        Under,
    }

    export const enum OnOff {
        //% block="off"
        Off = 0,
        //% block="on"
        On = 1,
    }

    export const enum ClockwiseCounterclockwise {
        //% block="↻"
        CW,
        //% block="↺"
        CCW,
    }

    export const enum ForwardReverse {
        //% block="forward"
        Forward = 1,
        //% block="reverse"
        Reverse = -1,
    }

    export const enum RaisedLowered {
        //% block="raised"
        Raised = 1,
        //% block="lowered"
        Lowered = 0,
    }
}
