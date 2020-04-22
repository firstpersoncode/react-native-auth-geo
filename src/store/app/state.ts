export interface IAppError {
    statusCode?: number
    message?: string
}

export interface IAppSession {
    id?: number
    publicId?: string
    status?: number
    role?: number
    name?: string
    email?: string
    phone?: string
    dob?: string
    address?: string
    longitude?: number
    latitude?: number
    ntr?: number
    nte?: number
    ntm?: number
    created?: string
    updated?: string
    archived?: string
}

export interface IAPPLocation {
    timestamp?: string
    mocked?: boolean
    coords?: {
        altitude: number
        heading: number
        longitude: number
        latitude: number
        speed: number
        accuracy: number
    }
}

interface IAppState {
    loading: boolean
    error: IAppError
    session: IAppSession
    location: IAPPLocation
}

export const initialState: IAppState = {
    loading: false,
    error: {},
    session: {},
    location: {}
}
