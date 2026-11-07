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
export const CAR_MODEL_URL = 'src/assets/models/cars/sedan.glb'
export const CAR_MODEL_LENGTH = 2.2
export const CAR_MODEL_YAW = 0
export const CAR_COLLISION_RADIUS = 0.6
export const CAR_COLLISION_OFFSETS = [-0.5, 0.5]
export const CAR_BOUNCE = 0.5
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
export const INTERACT_KEY = 'KeyE'
export const SECONDARY_INTERACT_KEY = 'KeyF'

// -- Links --
export interface ZoneConfig {
    name: string
    description: string
    url: string
    urlLabel?: string
    secondaryUrl?: string
    secondaryUrlLabel?: string
    model: string
    size: number
    yaw?: number
    lat: number
    lon: number
} 
export const ZONES: ZoneConfig[] = [
    {
        name: 'GitHub',
        description: 'Hosts all my project\'s source code.',
        url: 'https://github.com/miles-ong',
        urlLabel: 'See repositories',
        model: 'src/assets/models/pets/animal-cat.glb',
        size: 8,
        lat: 38,
        lon: 0
    }
]
export const ZONE_RADIUS_MULTIPLIER = 1.5
export const MODEL_SINK = 0.15

// -- Tooltip --
export const TOOLTIP_HEIGHT = 2.0
export const DEFAULT_URL_LABEL = 'Open'
export const DEFAULT_SECONDARY_URL_LABEL = 'Learn more'