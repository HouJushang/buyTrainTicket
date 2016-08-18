/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST} from '../constants'

import request from '../utils/fetch'


//初始化火车列表
export function inittrainlist(arr) {
    return {
        type: INITTRAINLIST,
        list: arr
    }
}

export function ajaxinittrainlist(e) {
    return (dispatch) => {
        request({
            url: 'ticketsAvailable',
            data: {
                date: e.date,
                from: e.from,
                to: e.to
            },
            success: function (result) {
                return dispatch(inittrainlist(result.available_tickets));
            }
        })
    }
}
