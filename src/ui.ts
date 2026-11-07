import * as THREE from 'three'
import './tooltip.css'
import { DEFAULT_SECONDARY_URL_LABEL, DEFAULT_URL_LABEL, INTERACT_KEY, SECONDARY_INTERACT_KEY, TOOLTIP_HEIGHT } from './config'
import type { Car } from './car'
import type { Zone } from './zones'

const tooltip = document.createElement('div')
tooltip.className = 'tooltip'
document.body.appendChild(tooltip)

const anchor = new THREE.Vector3()
let shownZone: Zone | null = null

const keyName = (code: string) => code.replace(/^Key/, '')

function element(className: string, text: string) {
    const div = document.createElement('div')
    div.className = className
    div.textContent = text

    return div
}

function actionRow(key: string, label: string) {
    const row = document.createElement('div')
    row.className = 'tooltip-action'
    const kdb = document.createElement('kdb')
    kdb.textContent = key
    row.append(kdb, ` ${label}`)

    return row
}

function fillTooltip(zone: Zone) {
    tooltip.replaceChildren(
        element('tooltip-title', zone.name),
        element('tooltip-description', zone.description),
        actionRow(keyName(INTERACT_KEY), zone.urlLabel ?? DEFAULT_URL_LABEL)
    )

    if (zone.secondaryUrl) {
        tooltip.append(actionRow(keyName(SECONDARY_INTERACT_KEY), zone.secondaryUrlLabel ?? DEFAULT_SECONDARY_URL_LABEL))
    }
}

export function showTooltip(zone: Zone, car: Car, camera: THREE.Camera) {
    if (zone !== shownZone) {
        fillTooltip(zone)
        shownZone = zone
    }

    anchor.copy(car.position).addScaledVector(car.up, TOOLTIP_HEIGHT).project(camera)
    const x = (anchor.x * 0.5 + 0.5) * innerWidth
    const y = (-anchor.y * 0.5 + 0.5) * innerHeight

    tooltip.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`
    tooltip.style.display = 'block'
}

export function hideTooltip() {
    tooltip.style.display = 'none'
}