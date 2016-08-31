import {CHANGEPAGETYPE} from '../constants'

const initialState = {
    className: 'animateright'
}

export default function update(state = initialState, action) {
    if (action.type === CHANGEPAGETYPE) {
        if(action.changeType == 'left'){
            var newClassName = 'animateleft';
        }
        if(action.changeType == 'right'){
            var newClassName = 'animateright';
        }
        var newState = Object.assign({}, state, {
            className: newClassName
        });
        return newState;
    }
    return state
}
