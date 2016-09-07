/**
 * Created by hfcb on 16/8/17.
 */
import {changepagetype} from '../actions/changeAnimate'
import {browserHistory} from 'react-router'

export default function () {
    return dispatch => {
        dispatch(changepagetype('left'))
    }
}

