import request from '../utils/fetch'

export function submitorder(e) {
    return (dispatch) => {
        dispatch(request({
            url: 'submitTicketOrder',
            data: e,
            font: '提交订单...',
            success: function (result) {
                console.log(result);
            }
        }))
    }
}
