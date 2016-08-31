/**
 * Created by hfcb on 16/8/30.
 */
import {CHANGEPAGETYPE} from '../constants'

export function changepagetype(type) {
    return {
        type: CHANGEPAGETYPE,
        changeType: type
    }
}

