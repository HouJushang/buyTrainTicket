import {GETTRAINDETAIL} from '../constants'

const initialState = {
    ticketinfo: []
}

export default function update(state = initialState, action) {
    if (action.type === GETTRAINDETAIL) {
        console.log(action.trainDetail);
        return action.trainDetail;
    }
    return state
}
