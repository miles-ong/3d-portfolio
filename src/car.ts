import * as THREE from 'three'
import {
  ACCELERATION, CAR_MODEL_URL, CAR_MODEL_LENGTH, CAR_MODEL_YAW, CAR_START, FRICTION, FULL_STEER_SPEED,
  MAX_FORWARD_SPEED, MAX_REVERSE_SPEED, PLANET_RADIUS, TURN_RATE,
} from './config'
import { Y_AXIS, dirFromLatLon, loadModel } from './utils'

const axis = new THREE.Vector3()
const carUp = new THREE.Vector3()
const rotation = new THREE.Quaternion()

export class Car {
    readonly mesh = new THREE.Group()
    readonly position = dirFromLatLon(CAR_START.lat, CAR_START.lon).multiplyScalar(PLANET_RADIUS)
    readonly up = new THREE.Vector3()
    readonly forward = new THREE.Vector3()
    readonly right = new THREE.Vector3()
    private speed = 0

    constructor() {
        loadModel(CAR_MODEL_URL, CAR_MODEL_LENGTH).then(model => {
            model.rotation.y = CAR_MODEL_YAW
            this.mesh.add(model)
        })
        .catch(err => console.error('Car model failed to load:', err))

        const up = this.position.clone().normalize()
        const north = Y_AXIS.clone().addScaledVector(up, -Y_AXIS.dot(up)).normalize()
        const right = new THREE.Vector3().crossVectors(up, north)
        this.mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, north))
        this.mesh.position.copy(this.position)
        this.updateAxes()
    }

    update(dt: number, throttle: number, steer: number) {
        this.speed += throttle * ACCELERATION * dt
        this.speed *= 1 - FRICTION * dt
        this.speed = THREE.MathUtils.clamp(this.speed, -MAX_REVERSE_SPEED, MAX_FORWARD_SPEED)

        const grip = Math.sign(this.speed) * Math.min(Math.abs(this.speed) / FULL_STEER_SPEED, 1)
        this.mesh.quaternion.multiply(rotation.setFromAxisAngle(Y_AXIS, steer * TURN_RATE * grip * dt))

        this.updateAxes()
        axis.crossVectors(this.up, this.forward).normalize()
        rotation.setFromAxisAngle(axis, (this.speed * dt) / PLANET_RADIUS)
        this.position.applyQuaternion(rotation)
        this.mesh.quaternion.premultiply(rotation)

        this.position.setLength(PLANET_RADIUS)
        this.up.copy(this.position).normalize()
        carUp.copy(Y_AXIS).applyQuaternion(this.mesh.quaternion)
        this.mesh.quaternion.premultiply(rotation.setFromUnitVectors(carUp, this.up)).normalize()
        
        this.mesh.position.copy(this.position)
        this.updateAxes()
    }

    private updateAxes() {
        this.up.copy(this.position).normalize()
        this.forward.set(0, 0, 1).applyQuaternion(this.mesh.quaternion)
        this.right.set(1, 0, 0).applyQuaternion(this.mesh.quaternion)
    }
}