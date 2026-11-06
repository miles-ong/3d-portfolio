import * as THREE from 'three'
import {
  LABEL_CANVAS_WIDTH, LABEL_FONT, LABEL_INSET, LABEL_TEXT_COLOR, PLANET_RADIUS, SIGN_COLOR,
  SIGN_DEPTH, SIGN_HEIGHT, SIGN_WIDTH, ZONES, ZONE_TRIGGER_DISTANCE,
} from './config'
import type { Car } from './car'
import { dirFromLatLon } from './utils'
import { scene } from './world'

export interface Zone {
    name: string
    url: string
    position: THREE.Vector3
}

function makeLabel(text: string) {
    const canvas = document.createElement('canvas')
    canvas.width = LABEL_CANVAS_WIDTH
    canvas.height = (LABEL_CANVAS_WIDTH * SIGN_HEIGHT) / SIGN_WIDTH
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = SIGN_COLOR
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = LABEL_TEXT_COLOR
    ctx.font = LABEL_FONT
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace

    return new THREE.Mesh(
        new THREE.PlaneGeometry(SIGN_WIDTH - LABEL_INSET * 2, SIGN_HEIGHT - LABEL_INSET * 2),
        new THREE.MeshBasicMaterial({ map: texture })
    )
}

export function createZones(spawnPoint: THREE.Vector3): Zone[] {
    return ZONES.map(({ name, url, lat, lon }) => {
        const dir = dirFromLatLon(lat, lon)

        const sign = new THREE.Mesh(
            new THREE.BoxGeometry(SIGN_WIDTH, SIGN_HEIGHT, SIGN_DEPTH),
            new THREE.MeshStandardMaterial({ color: SIGN_COLOR })
        )
        sign.castShadow = true
        sign.position.copy(dir).multiplyScalar(PLANET_RADIUS + SIGN_HEIGHT / 2)
        sign.up.copy(dir)
        sign.lookAt(spawnPoint)

        const label = makeLabel(name)
        label.position.z = SIGN_DEPTH / 2 + 0.01
        sign.add(label)
        scene.add(sign)

        return { name, url, position: dir.multiplyScalar(PLANET_RADIUS) }
    })
}

export function findNearbyZone(zones: Zone[], car: Car) {
    return zones.find(zone => car.position.distanceTo(zone.position) < ZONE_TRIGGER_DISTANCE) ?? null
}