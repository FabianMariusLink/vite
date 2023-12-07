export type Run = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string,
}

export type NewRun = {
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string
}