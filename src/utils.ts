import * as THREE from 'three'

export const Y_AXIS = new THREE.Vector3(0, 1, 0)

export function dirFromLatLon(latDeg: number, lonDeg: number) {
    const lat = THREE.MathUtils.degToRad(latDeg)
    const lon = THREE.MathUtils.degToRad(lonDeg)

    return new THREE.Vector3(
        Math.cos(lat) * Math.sin(lon),
        Math.sin(lat),
        Math.cos(lat) * Math.cos(lon)
    )
}