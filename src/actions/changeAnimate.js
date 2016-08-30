/**
 * Created by hfcb on 16/8/30.
 */
import {CHANGEPAGETYPE} from '../constants'

export default function changepagetype(type) {
    return {
        type: CHANGEPAGETYPE,
        changeType: type
    }
}

