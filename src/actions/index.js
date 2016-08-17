import {CHOOSESTATION, EXCHANGEADDRESS} from '../constants'

export function choosestaion(obj, stationType) {
    return {
        type: CHOOSESTATION,
        obj: obj,
        stationType: stationType
    }
}
export function exchangestation() {
    return {
        type: EXCHANGEADDRESS,
    }
}
