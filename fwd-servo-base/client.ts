namespace fwdBase {
    //% fixedInstances
    export class FwdServoClient extends modules.ServoClient {
        constructor(role: string) {
            super(role)
        }

        // block created in fwd-servo-positional / fwd-servo-continuous
        isEnabled(): boolean {
            return super.enabled()
        }

        // block created in fwd-servo-positional / fwd-servo-continuous
        setEnabled(state: boolean): void {
            return super.setEnabled(state)
        }

        // block created in fwd-servo-positional
        getAngle(): number {
            return super.angle()
        }

        // block created in fwd-servo-positional
        setAngle(angle: number): void {
            super.setAngle(angle)
        }

        // block created in fwd-servo-positional
        setAngleAndWait(angle: number): void {
            let maxPauseDuration =
                (super.responseSpeed() / 60) * 270 + 20 || 380
            let degreesToMove = Math.abs(
                this.getAngle() > angle
                    ? this.getAngle() - angle
                    : angle - this.getAngle()
            )
            super.setAngle(angle)

            // it takes maxPauseDuration seconds to move 270 degrees
            // with degreesToMove as the second denominator, cross-multiply and divide to get the pause needed
            basic.pause((maxPauseDuration * degreesToMove) / 270)
        }

        // block created in fwd-servo-continuous
        getSpeed(): number {
            return Math.map(
                this.angle(),
                this.minAngle(),
                this.maxAngle(),
                -100,
                100
            )
        }

        // block created in fwd-servo-continuous
        setSpeed(speed: number): void {
            this.setAngle(
                Math.map(speed, -100, 100, this.minAngle(), this.maxAngle())
            )
        }
    }

    //% fixedInstance whenUsed
    export const leftServo = new FwdServoClient("leftServo?srvo=0")
    //% fixedInstance whenUsed
    export const middleServo = new FwdServoClient("middleServo?srvo=1")
    //% fixedInstance whenUsed
    export const rightServo = new FwdServoClient("rightServo?srvo=2")
}
