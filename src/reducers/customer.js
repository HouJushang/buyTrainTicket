import {INITCUSTOMERLIST} from '../constants'

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
    return state
}
