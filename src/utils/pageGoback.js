/**
 * Created by hfcb on 16/8/17.
 */
import 'whatwg-fetch'
import {changepagetype} from '../actions/changeAnimate'
import {browserHistory} from 'react-router'

export default function () {
    alert(1);
    return dispatch => {
        dispatch(changepagetype('left'));
        browserHistory.goBack();
        setTimeout(()=> {
            dispatch(changepagetype('right'))
        }, 260)
    }
}

