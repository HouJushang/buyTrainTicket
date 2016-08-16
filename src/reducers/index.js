import {INCREASE, DECREASE} from '../constants'

const initialState = {
    startStaion: {
        name: '上海',
        code: 111
    },
    endStation: {
        name: '北京',
        code: 2222
    },
    number: 1
}

export default function update(state = initialState, action) {
    var newState = Object.assign({},state);
    if (action.type === INCREASE) {
        const newNumber = state.number + action.amount;
        newState.number = newNumber
        return newState;
    }
    else if (action.type === DECREASE) {
        const newNumber = state.number - action.amount;
        newState.number = newNumber
        return newState;
    }
    return state
}
