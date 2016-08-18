import {INITADDRESSLIST} from '../constants'

const initialState = {
    addressListisLoading: false,
    addressList: []
}

export default function update(state = initialState, action) {
    if (action.type === INITADDRESSLIST) {
        return Object.assign({}, state, {
            addressList: action.list,
            addressListisLoading: true
        });
    }
    return state
}
