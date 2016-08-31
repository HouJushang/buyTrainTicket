import {OPENLOADING,CLOSTLOADING} from '../constants'

const initialState = {
    loadingFont: '数据加载中...',
    isLoading: false
}

export default function update(state = initialState, action) {
    if (action.type === OPENLOADING) {
        return Object.assign({}, state, {
            loadingFont: action.font,
            isLoading: true
        });
    }
    if(action.type === CLOSTLOADING){
        return Object.assign({}, state, {
            isLoading: false
        });
    }
    return state
}
