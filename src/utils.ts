import * as THREE from 'three'
import { GLTFLoader }  from 'three/addons/loaders/GLTFLoader.js'

export const Y_AXIS = new THREE.Vector3(0, 1, 0)

const loader = new GLTFLoader()

export function dirFromLatLon(latDeg: number, lonDeg: number) {
    const lat = THREE.MathUtils.degToRad(latDeg)
    const lon = THREE.MathUtils.degToRad(lonDeg)

    return new THREE.Vector3(
        Math.cos(lat) * Math.sin(lon),
        Math.sin(lat),
        Math.cos(lat) * Math.cos(lon)
    )
}

export function surfaceFrame(dir: THREE.Vector3, yaw = 0) {
    const up = dir.clone().normalize()
    const north = Y_AXIS.clone().addScaledVector(up, -Y_AXIS.dot(up)).normalize()
    const right = new THREE.Vector3().crossVectors(up, north)

    return new THREE.Quaternion()
    .setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, north))
    .multiply(new THREE.Quaternion().setFromAxisAngle(Y_AXIS, yaw))
}

/**
 * 'longest' scales the model so its longest side (including height) equals targetSize.
 * 'footprint' does the same using only width and length, which is what you want for buildings.
 */
export type ModelFit = 'longest' | 'footprint'

export async function loadModel(url: string, targetSize: number, fit: ModelFit = 'longest') {
    const { scene: model } = await loader.loadAsync(url)

    model.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
            obj.castShadow = true
            obj.receiveShadow = true
        }
    })

    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const measured = fit === 'footprint' ? Math.max(size.x, size.z) : Math.max(size.x, size.y, size.z)
    model.scale.setScalar(targetSize / measured)

    box.setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.set(-center.x, -box.min.y, -center.z)

    const wrapper = new THREE.Group()
    wrapper.add(model)
    
    return wrapper
}