import {INCREASE, DECREASE} from '../constants'

const initialState = {
    list: [
        {
            name: '北京',
            id: 1
        },
        {
            name: '上海',
            id: 2
        },
        {
            name: '厦门',
            id: 3
        }
    ]
}

export default function update(state = initialState, action) {
    // var newState = Object.assign({},state);
    // if (action.type === INCREASE) {
    //     const newNumber = state.number + action.amount;
    //     newState.number = newNumber
    //     return newState;
    // }
    // else if (action.type === DECREASE) {
    //     const newNumber = state.number - action.amount;
    //     newState.number = newNumber
    //     return newState;
    // }
    return state
}
