import {ININMYORDER} from '../constants'

const initialState = {
    list:{
        notpayorderlist: []
    },
}

export default function update(state = initialState, action) {
    if (action.type === ININMYORDER) {
        return Object.assign({}, state, {
            list: action.list,
        });
    }
    return state
}
