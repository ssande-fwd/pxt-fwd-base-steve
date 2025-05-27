// Someday I hope this code will be in pxt-jacdac.

namespace modules {
    /**
     * Controls LED lights
     **/
    //% fixedInstances blockGap=8
    export class LightbulbClient extends jacdac.Client {
        private readonly _brightness: jacdac.RegisterClient<[number]>

        constructor(role: string) {
            super(jacdac.SRV_LIGHTS, role)

            this._brightness = super.addRegister<[number]>(
                jacdac.LightsReg.Brightness,
                jacdac.LightsRegPack.Brightness
            )
        }

        /**
         * Returns true if the light brightness is anything other than 0%.
         */
        //% group="Environment"
        //% block="$this on"
        //% blockId=jacdac_lightbulb_is_on
        isOn(): boolean {
            if (this._brightness.values.get(0) === 0) {
                return false
            } else {
                return true
            }
        }

        /**
         * Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
         * For non-dimmable lights, the value should be clamp to 0xffff for any non-zero value.
         */
        //% group="Environment"
        //% blockId=jacdac_lightbulb_brightness___set
        //% block="set %lights brightness to %value (\\%)"
        //% weight=100
        //% value.min=0
        //% value.max=100
        //% value.defl=100
        setBrightness(value: number) {
            if (value < 0 || value > 100) {
                // If out of range, do nothing
                return
            }

            super.start()
            const values = this._brightness.values as any[]
            values[0] = value / 100
            this._brightness.values = values as [number]
        }
    }

    //% fixedInstance whenUsed weight=1 block="lightbulb1"
    export const lightbulb1 = new LightbulbClient("lightbulb1")
}
