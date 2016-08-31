import {INITCUSTOMERLIST,CHOOSECUSTOMER} from '../constants'
import getPhone from '../native/getPhone'
import request from '../utils/fetch'

export function initcustomer(customerlist) {
    return {
        type: INITCUSTOMERLIST,
        list: customerlist
    }
}
export function ajaxcustomerlist(e) {
    return (dispatch) => {
        dispatch(request({
            url: 'getPassenger',
            data: {
                mobile: getPhone()
            },
            font: '获取顾客列表...',
            success: function (result) {
                return dispatch(initcustomer(result));
            }
        }))
    }
}
export function choosecustomer(list){
    return {
        type: CHOOSECUSTOMER,
        list: list
    }
}

