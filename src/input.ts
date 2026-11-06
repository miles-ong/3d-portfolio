import { KEYS } from './config'

const pressed = new Set<string>()
addEventListener('keydown', e => pressed.add(e.code))
addEventListener('keyup', e => pressed.delete(e.code))
const isDown = (codes: readonly string[]) => codes.some(code => pressed.has(code))

export function getControls() {
    return {
        throttle: Number(isDown(KEYS.forward)) - Number(isDown(KEYS.backward)),
        steer: Number(isDown(KEYS.left)) - Number(isDown(KEYS.right))
    }
}

export function onKeyPress(code: string, callback: () => void) {
    addEventListener('keydown', e =>  {
        if (e.code === code && !e.repeat) callback()
    })
}