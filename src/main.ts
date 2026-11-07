import { Car } from './car'
import { camera, snapCameraToCar, updateCamera } from './camera'
import { INTERACT_KEY, SECONDARY_INTERACT_KEY, MAX_FRAME_TIME } from './config'
import { getControls, onKeyPress } from './input'
import { showTooltip, hideTooltip } from './ui'
import { renderer, scene, updateSun } from './world'
import { createZones, findNearbyZone, type Zone } from './zones'

const car = new Car()
scene.add(car.mesh)
const zones = createZones()
snapCameraToCar(car)

let activeZone: Zone | null = null

const openLink = (url?: string) => {
  if (url) window.open(url, '_blank', 'noopener')
}
onKeyPress(INTERACT_KEY, () => openLink(activeZone?.url))
onKeyPress(SECONDARY_INTERACT_KEY, () => openLink(activeZone?.secondaryUrl))

let lastTime = 0

renderer.setAnimationLoop(time => {
  const dt = Math.min((time - lastTime) / 1000, MAX_FRAME_TIME)
  lastTime = time

  const { throttle, steer } = getControls()
  car.update(dt, throttle, steer)
  updateCamera(car, dt)
  updateSun(car)
  activeZone = findNearbyZone(zones, car)

  renderer.render(scene, camera)

  if (activeZone) showTooltip(activeZone, car, camera)
  else hideTooltip()
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})