import request from '../utils/fetch'
import {ININMYORDER} from '../constants'
import phoneNo from '../native/getPhone'
export function initmyorder(list){
    return {
        type: ININMYORDER,
        list: list
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