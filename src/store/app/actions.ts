import { IAppError, IAppSession, IAPPLocation } from './state'

export const SET_LOADING = 'APP/SET/LOADING'
export const SET_ERROR = 'APP/SET/ERROR'
export const SET_SESSION = 'APP/SET/SESSION'
export const SET_LOCATION = 'APP/SET/LOCATION'
export const SET_DRAWER = 'APP/SET/DRAWER'

export const setLoading = (payload: boolean) => ({ type: SET_LOADING, payload })
export const setError = (payload: IAppError) => ({ type: SET_ERROR, payload })
export const setSession = (payload: IAppSession) => ({ type: SET_SESSION, payload })
export const setLocation = (payload: IAPPLocation) => ({ type: SET_LOCATION, payload })
export const setDrawer = (payload: boolean) => ({ type: SET_DRAWER, payload })
