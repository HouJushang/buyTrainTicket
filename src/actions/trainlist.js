/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST, TYPESUBMIT, OPTIONSUBMIT} from '../constants'

import request from '../utils/fetch'
//初始化火车列表
export function inittrainlist(arr) {
    return {
        type: INITTRAINLIST,
        data: arr
    }
}

export function ajaxinittrainlist(e) {
    return (dispatch) => {
        dispatch(request({
            url: 'ticketsAvailable',
            data: {
                date: e.date,
                from: e.from,
                to: e.to
            },
            font: '获取车次中...',
            success (result) {
                console.log(result);
                return dispatch(inittrainlist(result));
            },
            error(){
                return dispatch(inittrainlist({available_tickets:[],to_station_data:[],from_station_data:[]}))
            }
        }))
    }
}
export function typesubmit(arr) {
    return {
        type: TYPESUBMIT,
        typeArr: arr
    }
}
export function optionsubmit(data) {
    return {
        type: OPTIONSUBMIT,
        option: data
    }
}
