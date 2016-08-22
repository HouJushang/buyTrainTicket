import {CHOOSESTATION, EXCHANGEADDRESS, INDEXCHANGEDATE} from '../constants'

export function choosestaion(obj, stationType) {
    return {
        type: CHOOSESTATION,
        obj: obj,
        stationType: stationType
    }
}
export function exchangestation() {
    return {
        type: EXCHANGEADDRESS
    }
}
export function changedate(date) {
    return {
        type: INDEXCHANGEDATE,
        date: date
    }
}
