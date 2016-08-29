/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST, TYPESUBMIT, OPTIONSUBMIT} from '../constants'


const initialState = {
    trainListisLoading: false,
    trainList: [],
    trainListFilter: [],

    //车次选择保存
    trainTypeCheckboxRel: [],
    //车次种类全选数据
    trainTypeValueData: ['G', 'D', 'Z', 'T', 'K', 'X'],

    //车站列表 和 选择车站
    toStation: [],
    chooseToStationRel: [],
    fromStation: [],
    chooseFromStationRel: [],

    //时间选择
    chooseTimeRel: [],
    chooseTimeData: [1, 2, 3],

    //车次种类数据
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
//过滤规则
const filteRule = {
    typeFilter(item, state){
        let filterArr = state.trainTypeCheckboxRel.length > 0 ? state.trainTypeCheckboxRel : state.trainTypeValueData;
        return filterArr.indexOf(item.train_type) > -1;
    },
    timeFilter(item, state){
        let filterArr = state.chooseTimeRel.length > 0 ? state.chooseTimeRel : state.chooseTimeData;
        return timeFilterCheck(item.start_time, filterArr);
    },
    toStationFilter(item, state){
        let filterArr = state.chooseToStationRel.length > 0 ? state.chooseToStationRel : state.toStation;
        return stationFilter(item.to_station_name, filterArr);
    },
    fromStationFilter(item, state){
        let filterArr = state.chooseFromStationRel.length > 0 ? state.chooseFromStationRel : state.fromStation;
        return stationFilter(item.from_station_name, filterArr);
    }
}
//执行过滤
function filter(list, state, option = ['typeFilter', 'timeFilter', 'toStationFilter', 'fromStationFilter']) {
    let newList = list.filter(function (itemList) {
        var checkArr = [];
        option.forEach(function (itemOption) {
            checkArr.push(filteRule[itemOption](itemList, state));
        })
        if (checkArr.indexOf(false) > -1) {
            return false;
        } else {
            return true;
        }
    })
    return newList;
}
//时间过滤函数
function timeFilterCheck(time, filterArr) {
    var arr = [];
    var hour = time.split(':')[0];
    filterArr.forEach(function (item) {
        if (item == 1) {
            if (hour < 10) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }
        if (item == 2) {
            if (hour >= 10 && hour < 18) {
                arr.push(true);
            } else {
                arr.push(false)
            }
        }
        if (item == 3) {
            if (hour >= 18) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }
    })
    if (arr.indexOf(true) > -1) {
        return true;
    } else {
        return false;
    }
}
//车站过滤函数
function stationFilter(item, filterArr) {
    if (filterArr.indexOf(item) > -1) {
        return true;
    } else {
        return false;
    }
}
function sort(state, arr) {
    //todo sort
    return arr;
}
export default function update(state = initialState, action) {
    if (action.type === INITTRAINLIST) {
        let list = action.data.available_tickets;

        let toStation = [];
        action.data.to_station_data.forEach(function (item) {
            toStation.push(item.station_name)
        })

        let fromStation = [];
        action.data.from_station_data.forEach(function (item) {
            fromStation.push(item.station_name)
        })

        let newState = Object.assign({}, state, {
            trainList: list,
            toStation: toStation,
            fromStation: fromStation,
        });
        newState.trainListFilter = filter(list, newState);
        return newState;
    }
    if (action.type === TYPESUBMIT) {
        let typeArr = action.typeArr.slice();
        let newState = Object.assign({}, state, {
            trainTypeCheckboxRel: typeArr,
        });
        newState.trainListFilter = filter(state.trainList, newState);
        return newState;
    }
    if (action.type === OPTIONSUBMIT) {
        let time = action.option.time.slice();
        let toStation = action.option.toStation.slice();
        let fromStation = action.option.fromStation.slice();

        let newState = Object.assign({}, state, {
            chooseTimeRel: time,
            chooseToStationRel: toStation,
            chooseFromStationRel: fromStation,
        });
        newState.trainListFilter = filter(state.trainList, newState);
        return newState;
    }
    return state
}
