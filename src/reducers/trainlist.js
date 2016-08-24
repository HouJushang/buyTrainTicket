/**
 * Created by hfcb on 16/8/18.
 */
import {INITTRAINLIST, TYPESUBMIT, OPTIONSUBMIT} from '../constants'


const initialState = {
    trainListisLoading: false,
    trainList: [],
    trainListFilter: [],

    //车次选择保存
    trainTypeCheckboxRel: ['G', 'D'],

    //车次种类全选数据
    trainTypeValueData: ['G', 'D', 'Z', 'T', 'K', 'X'],

    //车站列表 和 选择车站
    toStation: [],
    chooseToStation: [],
    fromStation: [],
    chooseFromStation: [],
    //时间选择
    chooseTime: [1, 2, 3],
    chooseTimeData: [1,2,3],

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
/*
 *@parm
 * arr 需要过滤的车次数组
 * typeFilter 车次类型过滤数组
 * timeFilter 时间过滤数组
 */
function filter(arr, typeFilter, timeFilter, toStation, fromStation) {
    if (!timeFilter) {
        timeFilter = initialState.chooseTime;
    }
    let newArr = arr.filter(function (item) {
        return typeFilter.indexOf(item.train_type) > -1 && timeFilterCheck(item.start_time, timeFilter) && stationFilter(item.from_station_name, fromStation) && stationFilter(item.to_station_name, toStation);
    })
    return newArr;
}
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
        let toStation = action.data.to_station_data;
        let fromStation = action.data.from_station_data;

        var chooseToStation = [];
        toStation.forEach(function (item) {
            chooseToStation.push(item.station_name)
        })

        var chooseFromStation = [];
        fromStation.forEach(function (item) {
            chooseFromStation.push(item.station_name)
        })

        return Object.assign({}, state, {
            trainList: list,
            trainListFilter: filter(list, state.trainTypeCheckboxRel, '', chooseToStation, chooseFromStation),
            toStation: toStation,
            chooseToStation: chooseToStation,
            fromStation: fromStation,
            chooseFromStation: chooseFromStation,
        });
    }
    if (action.type === TYPESUBMIT) {
        return Object.assign({}, state, {
            trainTypeCheckboxRel: action.typeArr,
            trainListFilter: filter(state.trainList, action.typeArr, '', state.chooseToStation, state.chooseFromStation),
        });
    }
    if (action.type === OPTIONSUBMIT) {
        return Object.assign({}, state, {
            chooseTime: action.option.time,
            chooseToStation: action.option.toStation,
            chooseFromStation: action.option.fromStation,
            trainListFilter: filter(state.trainList, state.trainTypeCheckboxRel, action.option.time, action.option.toStation, action.option.fromStation),

        });
    }
    return state
}
