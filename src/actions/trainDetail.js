/**
 * Created by hfcb on 16/8/18.
 */
import {GETTRAINDETAIL} from '../constants'

import request from '../utils/fetch'


//初始化火车列表
//初始化地址列表
export function traindetailaction(trainDetail) {
    return {
        type: GETTRAINDETAIL,
        trainDetail: trainDetail
    }
}
export function gettraindetail(e) {
    return (dispatch) => {
        dispatch(request({
            url: 'ticketsAvailable',
            data: {
                date: e.date,
                from: e.from,
                to: e.to,
                train_code: e.train_code
            },
            font: '获取车次详情...',
            success: function (result) {
                if(result.available_tickets.length>0){
                    return dispatch(traindetailaction(result.available_tickets[0]));
                }else{
                    alert('没有查到相关车次');
                }
            }
        }))
    }
}
