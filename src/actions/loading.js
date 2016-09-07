import {OPENLOADING, CLOSTLOADING} from '../constants'

export function openloading(font) {
    return {
        type: OPENLOADING,
        font: font
    }
}
export function closeloading() {
    return {
        type: CLOSTLOADING,
    }
}
export function alert(e) {
    return (dispatch) => {
        dispatch(openloading(e));
        setTimeout(()=> {
            return dispatch(closeloading())
        }, 200)
    }
}
