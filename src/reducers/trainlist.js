/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST} from '../constants'

import dateformat from '../utils/dateFormat'

const initialState = {
    trainListisLoading: false,
    trainList: [],
    // date: dateformat(new Date(), 'yyyy-MM-dd'),
}

export default function update(state = initialState, action) {
    if (action.type === INITTRAINLIST) {
        console.log(action.list);
        return Object.assign({}, state, {
            trainList: action.list,
            trainListisLoading: true
        });
    }
    return state
}
