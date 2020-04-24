import { IUserSelected } from '../user/state'

export interface IReportSelected {
    id?: number
    publicId?: string
    status?: number
    self?: boolean
    name?: string
    fever?: boolean
    cough?: boolean
    sneeze?: boolean
    sore?: boolean
    asphyxiate?: boolean
    address?: string
    longitude?: number
    latitude?: number
    created?: string
    updated?: string
    archived?: string
    user?: IUserSelected
}

interface IReportState {
    selected: IReportSelected
    data: IReportSelected[]
}

export const initialState: IReportState = {
    selected: {},
    data: []
}
