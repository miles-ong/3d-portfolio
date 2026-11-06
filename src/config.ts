// -- Planet --
export const PLANET_RADIUS = 30
export const PLANET_COLOR = '#4a7c59'
export const PLANET_SEGMENTS = 96 // Smoothness

// -- Space --
export const SPACE_COLOR = '#05060f'
export const STAR_COUNT = 1500
export const STAR_SIZE = 0.8 // px
export const STAR_MIN_DIST = 150
export const STAR_MAX_DIST = 200
export const MAX_PIXEL_RATIO = 2
export const MAX_FRAME_TIME = 0.05

// -- Lighting --
export const AMBIENT_INTENSITY = 1.0
export const SUN_INTENSITY = 2.0
export const SUN_OFFSET = { up: 30, forward: 10, right: 10 } // Sun position relative to car
export const SHADOW_MAP_SIZE = 2048
export const SHADOW_AREA = 30 // How much ground the car gets shadows

// -- Car --
export const CAR_MODEL_URL = 'src/assets/models/sedan.glb'
export const CAR_MODEL_LENGTH = 2.2
export const CAR_MODEL_YAW = 0
export const CAR_START = { lat: 0, lon: 0 }
export const ACCELERATION = 20
export const FRICTION = 1.0
export const MAX_FORWARD_SPEED = 15
export const MAX_REVERSE_SPEED = 5
export const TURN_RATE = 2.0 // Rads per second at full steering
export const FULL_STEER_SPEED = 4 // Below this speed, steering is weaker

// -- Camera --
export const CAMERA_FOV = 60
export const CAMERA_NEAR = 0.1
export const CAMERA_FAR = 400
export const CAMERA_DISTANCE = 10 // Distance behind the car
export const CAMERA_HEIGHT = 5 // Height above the car
export const CAMERA_LOOK_HEIGHT = 1 // Aim point above the car
export const CAMERA_SMOOTHING = 0.001 // Lower = snappier, higher = floatier (0 - 1)

// -- Controls --
export const KEYS = {
    forward: ['KeyW', 'ArrowUp'],
    backward: ['KeyS', 'ArrowDown'],
    left: ['KeyA', 'ArrowLeft'],
    right: ['KeyD', 'ArrowRight']
} as const
export const INTERACT_KEY = 'Enter'

// -- Links --
export const ZONES = [
    { name: 'GitHub', url: 'https://github.com/miles-ong', lat: 20, lon: 15 },
    { name: 'DebugDiner', url: 'https://mayuriswatch.itch.io/debug-diner', lat: 20, lon: -15 },
    { name: 'Cultivate', url: 'https://mayuriswatch.itch.io/cautionary-tale', lat: 20, lon: -15 },
    { name: 'KurisuBot', url: 'https://github.com/miles-ong/KurisuBot', lat: 20, lon: 15 },
    { name: 'Trust No 1', url: 'https://mayuriswatch.itch.io/trust-no-1', lat: 20, lon: 15 },
    { name: 'Mini Cities', url: 'https://github.com/miles-ong/Mini-Cities-Beta', lat: 20, lon: 15 }
]
export const ZONE_TRIGGER_DISTANCE = 5

// ---------- Signs ----------
export const SIGN_WIDTH = 4
export const SIGN_HEIGHT = 3
export const SIGN_DEPTH = 0.3
export const SIGN_COLOR = '#ffd166'
export const LABEL_TEXT_COLOR = '#222222'
export const LABEL_FONT = 'bold 80px sans-serif'
export const LABEL_CANVAS_WIDTH = 512 // Texture resolution; height follows the sign's shape
export const LABEL_INSET = 0.1 // Gap between the label and the sign's edge

// ---------- Interaction prompt ----------
export const PROMPT_TEXT = 'Press Enter to open'
export const PROMPT_STYLE =
  'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);' +
  'color:white;font:20px sans-serif;background:#0008;padding:8px 16px;border-radius:8px'