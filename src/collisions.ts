import * as THREE from 'three'

export interface BoxCollider {
    center: THREE.Vector3
    axisX: THREE.Vector3
    axisZ: THREE.Vector3
    halfX: number
    halfZ: number
}

export const colliders: BoxCollider[] = []

export interface Contact {
    normal: THREE.Vector3
    depth: number
}

const offset = new THREE.Vector3()
const contact: Contact = { normal: new THREE.Vector3(), depth: 0 }

export function findContact(point: THREE.Vector3, radius: number): Contact | null {
    let deepest = 0

    for (const box of colliders) {
        offset.subVectors(point, box.center)
        const x = offset.dot(box.axisX)
        const z = offset.dot(box.axisZ)
        const dx = x - THREE.MathUtils.clamp(x, -box.halfX, box.halfX)
        const dz = z - THREE.MathUtils.clamp(z, -box.halfZ, box.halfZ)
        const dist = Math.hypot(dx, dz)

        if (dist >= radius) continue

        let nx: number
        let nz: number
        let depth: number

        if (dist > 1e-6) {
            nx = dx / dist
            nz = dz / dist
            depth = radius - dist
        }
        else {
            const toSideX = box.halfX - Math.abs(x)
            const toSideZ = box.halfZ - Math.abs(z)

            if (toSideX < toSideZ) {
                nx = Math.sign(x) || 1
                nz = 0
                depth = toSideX + radius
            }
            else {
                nx = 0
                nz = Math.sign(z) || 1
                depth = toSideZ + radius
            }
        }

        if (depth <= deepest) continue

        deepest = depth
        contact.depth = depth
        contact.normal.set(0, 0, 0).addScaledVector(box.axisX, nx).addScaledVector(box.axisZ, nz)
    }

    return deepest > 0 ? contact : null
}