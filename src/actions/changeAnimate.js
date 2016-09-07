/**
 * Created by hfcb on 16/8/30.
 */
import {CHANGEPAGETYPE} from '../constants'
import {browserHistory} from 'react-router'

export function changepagetype(type) {
    return {
        type: CHANGEPAGETYPE,
        changeType: type
    }
}
export function pageback() {
    return (dispatch) => {
        dispatch(changepagetype('left'));
        browserHistory.goBack();
        setTimeout(()=> {
            return dispatch(changepagetype('right'))
        }, 260)
    }
}
