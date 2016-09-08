import {ININMYORDER,INITORDERDETAIL} from '../constants'

const initialState = {
    list:{
        notpayorderlist: [],
        payorderlist: []
    },
    orderDetail: {
        passengers:[]
    }
}
export default function update(state = initialState, action) {
    if (action.type === ININMYORDER) {
        return Object.assign({}, state, {
            list: action.list,
        });
    }
    if (action.type === INITORDERDETAIL) {
        return Object.assign({}, state, {
            orderDetail: action.detail,
        });
    }
    return state
}
