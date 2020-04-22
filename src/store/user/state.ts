export interface IUserSelected {
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

interface IUserState {
    selected: IUserSelected
    data: IUserSelected[]
}

export const initialState: IUserState = {
    selected: {},
    data: []
}
