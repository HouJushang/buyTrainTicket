/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST,TYPESUBMIT} from '../constants'


const initialState = {
    trainListisLoading: false,
    trainList: [],
    trainListFilter: [],
    trainTypeCheckboxRel: ['G', 'D'],
    trainTypeValueData: ['G','D','Z','T','K','X'],
    trainTypeData: [
        {
            name: 'GC高铁/城际',
            value: 'G',
        },
        {
            name: 'D动车',
            value: 'D',
        },
        {
            name: 'Z字头',
            value: 'Z',
        },
        {
            name: 'T字头',
            value: 'T',
        },
        {
            name: 'K字头',
            value: 'K',
        },
        {
            name: '其他',
            value: 'X',
        }
    ]
}
/*
 *@parm
 * arr 需要过滤的车次数组
 * typeFilter 车次类型过滤数组
 */
function filter(arr,typeFilter){
    let newArr = arr.filter(function(item){
        return typeFilter.indexOf(item.train_type)>-1;
    })
    return newArr;
}
export default function update(state = initialState, action) {
    if (action.type === INITTRAINLIST) {
        return Object.assign({}, state, {
            trainList: action.list,
            trainListFilter: filter(action.list,state.trainTypeCheckboxRel),
            trainListisLoading: true
        });
    }
    if(action.type === TYPESUBMIT){
        return Object.assign({}, state, {
            trainTypeCheckboxRel: action.typeArr,
            trainListFilter: filter(state.trainList,action.typeArr),
        });
    }
    return state
}
