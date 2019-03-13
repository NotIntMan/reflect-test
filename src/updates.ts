import {fillFromDOM, getFillFromDOMMetadata} from "./reflect"

class FormData {
    @fillFromDOM('#input-name', (element: HTMLInputElement) => element.value)
    name: string = ''

    @fillFromDOM('#input-age', (element: HTMLInputElement) => element.value)
    age: string = ''

    @fillFromDOM('#input-email', (element: HTMLInputElement) => element.value)
    email: string = ''

    @fillFromDOM('#callback', (element: HTMLDivElement) => element)
    callbackElement?: HTMLDivElement

    get callback() {
        if (!this.callbackElement) {
            return ''
        }
        return this.callbackElement.innerHTML
    }

    set callback(value) {
        if (this.callbackElement) {
            this.callbackElement.innerHTML = value
        }
    }
}

export function onFormChange(handler: (data: FormData) => any) {
    const metadata = getFillFromDOMMetadata<FormData>(FormData.prototype) || []
    debugger
    const elements: { [selector: string]: Element } = {}
    for (const metadataItem of metadata) {
        const selector = metadataItem.selector
        const element = document.querySelector(selector)
        if (element) {
            elements[selector] = element
            element.addEventListener('change', change)
        }
    }

    function change() {
        const formData = new FormData()
        for (const metadataItem of metadata) {
            const element = elements[metadataItem.selector]
            if (element) {
                formData[metadataItem.property] = metadataItem.filler(element)
            }
        }
        handler(formData)
    }

    return {
        unsubscribe() {
            for (const key in elements) {
                elements[key].removeEventListener('change', change)
            }
        }
    }
}
