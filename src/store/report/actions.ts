import { IReportSelected } from './state'

export const SET = 'REPORT/SET'
export const SET_DATA = 'REPORT/SET/DATA'

export const set = (payload: IReportSelected) => ({ type: SET, payload })
export const setData = (payload: IReportSelected[]) => ({ type: SET_DATA, payload })
