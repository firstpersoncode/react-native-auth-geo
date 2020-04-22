import { SET, SET_DATA } from './actions'
import { initialState } from './state'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET:
            return {
                ...state,
                selected: payload
            }

        case SET_DATA:
            return {
                ...state,
                data: payload
            }

        default:
            return state
    }
}
