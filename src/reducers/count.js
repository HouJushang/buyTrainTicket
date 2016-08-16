import {INCREASE, DECREASE} from '../constants'

const initialState = {
    startStation: {
        name: '上海',
        code: 111
    },
    endStation: {
        name: '北京',
        code: 222
    },
    number: 1
}

export default function update(state = initialState, action) {
    if (action.type === INCREASE) {
        return {number: state.number + action.amount}
    }
    else if (action.type === DECREASE) {
        return {number: state.number - action.amount}
    }
    return state
}
