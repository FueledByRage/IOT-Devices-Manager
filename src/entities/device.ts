export type DeviceData = {
    name: string,
    data: any,
    unit : string,
}

export type Device = {
    id: string | number
    name : string
    currentData : Array<DeviceData>
} 