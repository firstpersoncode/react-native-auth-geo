import { IUserSelected } from './state'

export const SET = 'USER/SET'
export const SET_DATA = 'USER/SET/DATA'

export const set = (payload: IUserSelected) => ({ type: SET, payload })
export const setData = (payload: IUserSelected[]) => ({ type: SET_DATA, payload })
