/**
 * Created by hfcb on 16/8/17.
 */
import {INITADDRESSLIST} from '../constants'

import request from '../utils/fetch'


//初始化地址列表
export function initaddresslist(arr) {
    return {
        type: INITADDRESSLIST,
        list: arr
    }
}

export function ajaxinitaddresslist() {
    return (dispatch) => {
        request({
            url: 'cityInformation',
            success: function (result) {
                return dispatch(initaddresslist(result));
            }
        })
    }
}
