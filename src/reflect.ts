const FillFromDOMSymbol = Symbol('Fill with dom decorator')

export interface FillFromDOMMetadataItem<T, E extends HTMLElement> {
    property: keyof T
    selector: string
    filler: (element: E) => any
}

export type FillFromDOMMetadata<T> = FillFromDOMMetadataItem<T, any>[]

export function getFillFromDOMMetadata<T>(target: object): FillFromDOMMetadata<T> | undefined {
    return Reflect.getMetadata(FillFromDOMSymbol, target)
}

export function addToFillFromDOMMetadata<T>(target: object, ...items: FillFromDOMMetadataItem<T, any>[]) {
    const metadata = getFillFromDOMMetadata<T>(target)
    if (metadata) {
        metadata.push(...items)
    } else {
        Reflect.defineMetadata(FillFromDOMSymbol, items, target)
    }
}

export function fillFromDOM<T extends HTMLElement>(selector: string, filler: (element: T) => any) {
    return function(target: any, property: string) {
        addToFillFromDOMMetadata(target, {selector, filler, property})
    }
}
