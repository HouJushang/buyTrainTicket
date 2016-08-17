import { INCREASE, DECREASE } from '../constants'

import fetch from 'whatwg-fetch';

export function increase(n) {
    return {
        type: INCREASE,
        amount: n
    }
}

export function decrease(n) {
    return {
        type: DECREASE,
        amount: n
    }
}

// function incrementAsync() {
//     return dispatch => {
//         setTimeout(() => {
//             // Yay! Can invoke sync or async actions with `dispatch`
//             dispatch(increase());
//         }, 1000);
//     };
// }

