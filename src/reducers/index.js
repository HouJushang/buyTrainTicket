// import {INCREASE, DECREASE} from '../constants'

const initialState = {
    startStation: {
        name: '上海',
        code: 111
    },
    endStation: {
        name: '北京',
        code: 222
    },
}

export default function update(state = initialState, action) {
    alert(1);
    return state
}
