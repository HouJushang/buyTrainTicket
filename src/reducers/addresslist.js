import {INITADDRESSLIST} from '../constants'

const initialState = {
    isLoading: false,
    list: [
        {
            cityName: '列表',
            code: 1
        },
    ]
}

export default function update(state = initialState, action) {
    var newState = Object.assign({}, state);
    if (action.type === INITADDRESSLIST) {
        newState.list = action.list;
        newState.isLoading = true;
        return newState;
    }
    return state
}
