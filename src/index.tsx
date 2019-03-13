import 'reflect-metadata'
import {onFormChange} from "./updates"

onFormChange(data => {
    const messages: string[] = []
    if (!data.name) {
        messages.push('Необходимо заполнить имя')
    }
    if (!data.age) {
        messages.push('Необходимо заполнить возраст')
    }
    if (!data.email) {
        messages.push('Необходимо заполнить email')
    }
    data.callback = messages.join('<br>')
})
