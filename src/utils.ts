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

export async function loadModel(url: string, targetSize: number) {
    const { scene: model } = await loader.loadAsync(url)

    model.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
            obj.castShadow = true
            obj.receiveShadow = true
        }
    })

    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    model.scale.setScalar(targetSize / Math.max(size.x, size.y, size.z))

    box.setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.set(-center.x, -box.min.y, -center.z)

    const wrapper = new THREE.Group()
    wrapper.add(model)
    
    return wrapper
}