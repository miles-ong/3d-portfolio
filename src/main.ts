import { Car } from './car'
import { camera, snapCameraToCar, updateCamera } from './camera'
import { INTERACT_KEY, MAX_FRAME_TIME, PROMPT_TEXT } from './config'
import { getControls, onKeyPress } from './input'
import { setPrompt } from './ui'
import { renderer, scene, updateSun } from './world'
import { createZones, findNearbyZone, type Zone } from './zones'

const car = new Car()
scene.add(car.mesh)
const zones = createZones(car.position)
snapCameraToCar(car)

let activeZone: Zone | null = null
onKeyPress(INTERACT_KEY, () => {
  if (activeZone) window.open(activeZone.url, '_blank')
})

let lastTime = 0
renderer.setAnimationLoop(time => {
  const dt = Math.min((time - lastTime) / 1000, MAX_FRAME_TIME)
  lastTime = time

  const { throttle, steer } = getControls()
  car.update(dt, throttle, steer)
  updateCamera(car, dt)
  updateSun(car)

  activeZone = findNearbyZone(zones, car)
  setPrompt(activeZone && `${PROMPT_TEXT} ${activeZone.name}`)

  renderer.render(scene, camera)
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})