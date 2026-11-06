import * as THREE from 'three'
import {
  CAMERA_DISTANCE, CAMERA_FAR, CAMERA_FOV, CAMERA_HEIGHT, CAMERA_LOOK_HEIGHT, CAMERA_NEAR,
  CAMERA_SMOOTHING,
} from './config'
import type { Car } from './car'

export const camera = new THREE.PerspectiveCamera(CAMERA_FOV, innerWidth / innerHeight, CAMERA_NEAR, CAMERA_FAR)

const chasePosition = new THREE.Vector3()
const lookTarget = new THREE.Vector3()

function computeChase(car: Car) {
    chasePosition.copy(car.position)
    .addScaledVector(car.up, CAMERA_HEIGHT)
    .addScaledVector(car.forward, -CAMERA_DISTANCE)
    lookTarget.copy(car.position).addScaledVector(car.up, CAMERA_LOOK_HEIGHT)
}

export function snapCameraToCar(car: Car) {
    computeChase(car)
    camera.position.copy(chasePosition)
    camera.up.copy(car.up)
    camera.lookAt(lookTarget)
}

export function updateCamera(car: Car, dt: number) {
    const t = 1 - Math.pow(CAMERA_SMOOTHING, dt)
    computeChase(car)
    camera.position.lerp(chasePosition, t)
    camera.up.lerp(car.up, t).normalize()
    camera.lookAt(lookTarget)
}