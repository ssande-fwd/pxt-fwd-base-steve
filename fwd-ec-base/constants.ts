namespace fwdBase {
    // Service ElectricalConductivity constants
    export const SRV_ELECTRICALCONDUCTIVITY = 0x1e9778c5
    export const enum ElectricalConductivityReg {
        /**
         * Read-only pH u22.10 (uint32_t). The electricalconductivity, uS, of fluids.
         *
         * ```
         * const [electricalconductivity] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        ElectricalConductivity = 0x101,

        /**
         * Read-only pH u22.10 (uint32_t). Error on the electricalconductivity reading.
         *
         * ```
         * const [electricalconductivityError] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        ElectricalConductivityError = 0x106,

        /**
         * Constant pH u22.10 (uint32_t). Lowest ElectricalConductivity that can be reported.
         *
         * ```
         * const [minElectricalConductivity] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MinElectricalConductivity = 0x104,

        /**
         * Constant uS u22.10 (uint32_t). Highest ElectricalConductivity that can be reported.
         *
         * ```
         * const [maxElectricalConductivity] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MaxElectricalConductivity = 0x105,
    }

    export const enum ElectricalConductivityCmd {
        /**
         * No-args command. Set the low reference calibration point
         */
        CalibrateLow = 0x83,

        /**
         * No-args command. Set the high reference calibration point
         */
        CalibrateHigh = 0x84,
    }

    export namespace ElectricalConductivityCmdPack {
        /**
         * Pack format for 'CalibrateLow/High' data.
         */
        export const SetCalibrationPoint = "u32"
    }

    export namespace ElectricalConductivityRegPack {
        /**
         * Pack format for 'electricalconductivity' data.
         */
        export const ElectricalConductivity = "u22.10"

        /**
         * Pack format for 'electricalconductivity_error' data.
         */
        export const ElectricalConductivityError = "u22.10"

        /**
         * Pack format for 'min_electricalconductivity' data.
         */
        export const MinElectricalConductivity = "u22.10"

        /**
         * Pack format for 'max_electricalconductivity' data.
         */
        export const MaxElectricalConductivity = "u22.10"
    }
}
