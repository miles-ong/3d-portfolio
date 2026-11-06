import { PROMPT_STYLE } from './config'

const prompt = document.createElement('div')
prompt.style.cssText = PROMPT_STYLE
prompt.style.display = 'none'
document.body.appendChild(prompt)

export function setPrompt(text: string | null) {
    prompt.style.display = text ? 'block' : 'none'

    if (text) prompt.textContent = text
}