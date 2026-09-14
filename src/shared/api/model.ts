// Цвет кота
interface IColor {
    id?: number
    name?: string
    rgb?: string
    comment?: string
    date?: string
}

// тип шерстки
interface ICoatType {
    id?: number
    name?: string
    comment?: string
    date?: string
}

// тип кота по размещению - уличный, домашний
interface ICatLocationType {
    id?: number
    name?: string
}

// порода
interface ICatBreedType {
    id?: number
    name?: string
    comment?: string
}

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

interface ICat {
    id?: number
    name?: string
    shortName?: string
    coatTypeId?: number
    owner?: string
    mass?: number
    date?: string
    colorId?: number
    locationTypeId?: number
    breedTypeId?: number
    //мягкость
    softness?: string
    //возможность превращаться в булочку
    breadness?: boolean
    //насколько большие глазки
    bigeyedness?: number
    //рейтинг кота
    stars?: number
    photos?: string[]
}

export type { IColor, ICoatType, RgbColor, ICat, ICatLocationType, ICatBreedType }