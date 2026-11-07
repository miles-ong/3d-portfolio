import * as THREE from 'three'
import { MODEL_SINK, PLANET_RADIUS, ZONES, ZONE_RADIUS_MULTIPLIER, type ZoneConfig } from './config'
import type { Car } from './car'
import { colliders } from './collisions'
import { dirFromLatLon, surfaceFrame, loadModel } from './utils'
import { scene } from './world'

export interface Zone extends ZoneConfig {
    position: THREE.Vector3
    radius: number
}

export function createZones(): Zone[] {
    return ZONES.map(config => {
        const dir = dirFromLatLon(config.lat, config.lon)
        const zone: Zone = { ...config, position: dir.clone().multiplyScalar(PLANET_RADIUS), radius: 0 }

        loadModel(config.model, config.size, 'footprint')
        .then(model => {
            const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3())
            const orientation = surfaceFrame(dir, config.yaw)
            model.quaternion.copy(orientation)
            model.position.copy(zone.position).addScaledVector(dir, -MODEL_SINK)
            scene.add(model)

            zone.radius = Math.max(size.x, size.z) * ZONE_RADIUS_MULTIPLIER
            
            colliders.push({
                center: zone.position,
                axisX: new THREE.Vector3(1, 0, 0).applyQuaternion(orientation),
                axisZ: new THREE.Vector3(0, 0, 1).applyQuaternion(orientation),
                halfX: size.x / 2,
                halfZ: size.z / 2
            })
        })
        .catch(err => console.error(`Zone "${config.name}" failed to load:`, err))

        return zone
    })
}

export function findNearbyZone(zones: Zone[], car: Car) {
    return zones.find(zone => car.position.distanceTo(zone.position) < zone.radius) ?? null
}