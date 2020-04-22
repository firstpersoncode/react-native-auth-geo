import { Dispatch } from 'redux'

import { setSession, setLoading, setError } from './actions'

const baseUrl = 'http://192.168.43.21:5000/auth'

export const sessionFetch = () => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl + '/me', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })

        if (!result.ok) {
            throw await result.json()
        }

        const data = await result.json()
        dispatch(setSession(data))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError({ statusCode: 302, message: 'Session required' }))
        dispatch(setSession({}))
        throw err
    }
}

interface IAppLogIn {
    email: string
    password: string
}

export const logIn = (body: IAppLogIn) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl + '/login', {
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
        // dispatch(setSession(data))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError(err))

        throw err
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))

    try {
        const result = await fetch(baseUrl + '/logout', {
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
        dispatch(setSession({}))
        setTimeout(() => dispatch(setLoading(false)), 500)

        return data
    } catch (err) {
        setTimeout(() => dispatch(setLoading(false)), 500)
        dispatch(setError(err))

        throw err
    }
}
