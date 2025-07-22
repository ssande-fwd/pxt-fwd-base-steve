namespace fwdBase {
    //% fixedInstances
    export class EcClient extends jacdac.SimpleSensorClient {
        private calibrated: boolean = false
        private standard1: number
        private reading1: number
        private standard2: number
        private reading2: number

        constructor(role: string) {
            super(
                fwdBase.SRV_ELECTRICALCONDUCTIVITY,
                role,
                fwdBase.ElectricalConductivityRegPack.ElectricalConductivity
            )
        }

        /**
         * Returns the sensor's EC reading.
         */
        //% group="EC"
        //% block="$this EC"
        //% blockId=fwd_ec_get_ec
        ec(): number {
            if (this.calibrated) {
                const slope =
                    (this.standard2 - this.standard1) /
                    (this.reading2 - this.reading1)
                const intercept = this.standard1 - slope * this.reading1
                const reading = super.reading()

                return slope * reading + intercept
            } else {
                return super.reading()
            }
        }

        /**
         * Calibrates the EC setup against 2 solutions with a known EC to ensure accurate readings.
         * The calibration will not apply to the live value displayed in MakeCode when the micro:bit is connected.
         * @param standard1 the known EC of standard1
         * @param reading1 the measured EC of standard1
         * @param standard2 the known EC of standard2
         * @param reading2 the measured EC of standard2
         */
        //% group="EC"
        //% block="calibrate $this measures $standard1 as $reading1 measures $standard2 as $reading2"
        //% blockId=fwd_ph_calibrate
        //% inlineInputMode=external
        calibrate(
            standard1: number,
            reading1: number,
            standard2: number,
            reading2: number
        ): void {
            this.standard1 = standard1
            this.reading1 = reading1
            this.standard2 = standard2
            this.reading2 = reading2
            this.calibrated = true
        }
    }

    //% fixedInstance whenUsed
    export const EC1 = new EcClient("ec1")
    //% fixedInstance whenUsed
    export const EC2 = new EcClient("ec2")
    //% fixedInstance whenUsed
    export const EC3 = new EcClient("ec3")
    //% fixedInstance whenUsed
    export const EC4 = new EcClient("ec4")
}
