import request from '../utils/fetch'
import {ININMYORDER,INITORDERDETAIL} from '../constants'
import phoneNo from '../native/getPhone'
export function initmyorder(list){
    return {
        type: ININMYORDER,
        list: list
    }
}
export function initorderdetail(detail) {
    return {
        type: INITORDERDETAIL,
        detail: detail
    }
}
export function ajaxinitmyorder() {
    return (dispatch) => {
        dispatch(request({
            url: 'queryTicketOrder',
            data: {
                mobile: phoneNo()
            },
            font: '获取数据中...',
            success: function (result) {
                return dispatch(initmyorder(result));
            }
        }))
    }
}
export function ajaxorderdetail(orderId) {
    return (dispatch) => {
        dispatch(request({
            url: 'getTicketOrderDetail',
            data: {
                orderId: orderId
            },
            font: '获取订单详情中...',
            success: function (result) {
                return dispatch(initorderdetail(result));
            }
        }))
    }
}
export function submitorder(e,successFn) {
    return (dispatch) => {
        dispatch(request({
            url: 'submitTicketOrder',
            data: e,
            font: '提交订单...',
            success: function (result) {
                successFn();
            }
        }))
    }
}

