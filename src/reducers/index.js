import {CHOOSESTATION, EXCHANGEADDRESS, INDEXCHANGEDATE} from '../constants'
import dateformat from '../utils/dateFormat'

const initialState = {
    startStation: {
        code: 'BJP',
        cityName: '北京'
    },
    endStation: {
        code: 'SHH',
        cityName: '上海'
    },
    date: dateformat(new Date(),'yyyy-MM-dd')
}

export default function update(state = initialState, action) {

    if (action.type === CHOOSESTATION) {
        let newState = {};
        if (action.stationType == 'startStation') {
            newState = Object.assign({}, state, {
                startStation: action.obj
            });
        }
        if (action.stationType == 'endStation') {
            newState = Object.assign({}, state, {
                endStation: action.obj
            });
        }

        //判断终点站和出发站是否一致
        if (newState.startStation.cityName == newState.endStation.cityName) {
            alert('终点站和出发站不可一致');
        } else {
            window.history.go(-1);
            return newState;
        }
    }

    //todo bug
    if (action.type === EXCHANGEADDRESS) {
        let newState = {};
        let startStation = Object.assign({}, state.startStation);
        let endStation = Object.assign({}, state.endStation);

        newState.startStation = endStation;
        newState.endStation = startStation;

        return Object.assign({}, state, newState)
    }


    if (action.type === INDEXCHANGEDATE) {
        let newState = Object.assign({}, state, {
            date: action.date
        });
        return newState;
    }
    return state
}
