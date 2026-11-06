import * as THREE from 'three'
import {
  AMBIENT_INTENSITY, MAX_PIXEL_RATIO, PLANET_COLOR, PLANET_RADIUS, PLANET_SEGMENTS,
  SHADOW_AREA, SHADOW_MAP_SIZE, SPACE_COLOR, STAR_COUNT, STAR_MAX_DIST,
  STAR_MIN_DIST, STAR_SIZE, SUN_INTENSITY, SUN_OFFSET
} from './config'
import type { Car } from './car'

export const scene = new THREE.Scene()
scene.background = new THREE.Color(SPACE_COLOR)

export const renderer = new THREE.WebGLRenderer({ antialias : true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO))
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const planet = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_RADIUS, PLANET_SEGMENTS, PLANET_SEGMENTS),
    new THREE.MeshStandardMaterial({ color: PLANET_COLOR })
)
planet.receiveShadow = true
scene.add(planet)

const starPositions = new Float32Array(STAR_COUNT * 3)
const star = new THREE.Vector3()

for (let i = 0; i < STAR_COUNT; i++) {
    star.randomDirection().multiplyScalar(THREE.MathUtils.randFloat(STAR_MIN_DIST, STAR_MAX_DIST))
    star.toArray(starPositions, i * 3)
}

const starGeometry = new THREE.BufferGeometry()
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
scene.add(new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ color: 0xffffff, size: STAR_SIZE, sizeAttenuation: false })
))

scene.add(new THREE.AmbientLight(0xffffff, AMBIENT_INTENSITY))

const sun = new THREE.DirectionalLight(0xffffff, SUN_INTENSITY)
sun.castShadow = true
sun.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE)
Object.assign(sun.shadow.camera, {
    left: -SHADOW_AREA, right: SHADOW_AREA, top: SHADOW_AREA, bottom: -SHADOW_AREA,
    near: 1, far: SHADOW_AREA * 3
})
sun.shadow.camera.updateProjectionMatrix()
scene.add(sun, sun.target)

export function updateSun(car: Car) {
    sun.position.copy(car.position)
    .addScaledVector(car.up, SUN_OFFSET.up)
    .addScaledVector(car.forward, SUN_OFFSET.forward)
    .addScaledVector(car.right, SUN_OFFSET.right)
    sun.target.position.copy(car.position)
}
