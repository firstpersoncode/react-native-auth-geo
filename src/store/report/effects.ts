import { Dispatch } from 'redux'

import { setLoading, setError } from '../app/actions'

import { set, setData } from './actions'

const baseUrl = 'http://192.168.1.33:5000/report'

export const reportData = () => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })

        if (!result.ok) {
            throw await result.json()
        }

        const data = await result.json()
        dispatch(setData(data))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError(err))

        throw err
    }
}

export const reportFetch = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl + '/' + id, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })

        if (!result.ok) {
            throw await result.json()
        }

        const data = await result.json()
        dispatch(set(data))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError(err))

        throw err
    }
}

interface IUserFields {
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
}

export const reportCreate = (body: IUserFields) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!result.ok) {
            throw await result.json()
        }

        const data = await result.json()
        dispatch(set(data))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError(err))

        throw err
    }
}
