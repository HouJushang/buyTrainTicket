import {INITCUSTOMERLIST, CHOOSECUSTOMER} from '../constants'

const initialState = {
    customerList: [],
    chooseCustomer: []
}

export default function update(state = initialState, action) {
    if (action.type === INITCUSTOMERLIST) {
        return Object.assign({}, state, {
            customerList: action.list,
        });
    }
    if (action.type === CHOOSECUSTOMER) {
        return Object.assign({}, state, {
            chooseCustomer: action.list,
        });
    }
    return state
}
