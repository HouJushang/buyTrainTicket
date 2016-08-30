import {INITADDRESSLIST} from '../constants'

const initialState = {
    className: 'animateright'
}

export default function update(state = initialState, action) {
    if (action.type === INITADDRESSLIST) {
        if(action.className = 'left'){
            var newClassName = 'animateleft';
        }
        if(action.className = 'right'){
            var newClassName = 'animateright';
        }
        return Object.assign({}, state, {
            className: newClassName
        });
    }
    return state
}
