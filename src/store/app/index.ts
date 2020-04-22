import { SET_LOADING, SET_ERROR, SET_SESSION, SET_LOCATION } from './actions'
import { initialState } from './state'

export default (state = initialState, { type, payload }: { type: string; payload: any }) => {
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            }

        case SET_ERROR:
            return {
                ...state,
                error: payload
            }

        case SET_SESSION:
            return {
                ...state,
                session: payload
            }

        case SET_LOCATION:
            return {
                ...state,
                location: payload
            }

        default:
            return state
    }
}
