import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';

import {ajaxinittrainlist, typesubmit, optionsubmit} from '../actions/trainlist'
import dataToweek from '../utils/dateToWeek'
import {preDay, nextDay} from '../utils/npdate'
import {changedate} from '../actions/index'


class TrainList extends React.Component {
    constructor() {
        super();
        this.title = '车次列表'
    }

    componentWillMount() {
        this.back = this.props.history.goBack;

        this.state = {
            trainTypeCheckbox: this.props.data.trainTypeCheckboxRel.slice(),
            chooseToStation: this.props.data.chooseToStation.length > 0 ? this.props.data.chooseToStation.slice() : [],
            chooseFromStation: this.props.data.chooseFromStation.length > 0 ? this.props.data.chooseFromStation.slice() : [],
            chooseTime: this.props.data.chooseTime.length > 0 ? this.props.data.chooseTime.slice() : [],
        }
    }

    render() {
        return (
            <div id="trainlistPage">
                <Header title={this.title} back={this.back}/>
                <div>
                    <span onClick={()=>this.npchange('pre', this.props.indexData.date)}>
                        上一天
                    </span>
                    <input type="date" className="date" value={this.props.indexData.date}
                           onChange={this.datechange.bind(this)}/>{dataToweek(this.props.indexData.date)}
                    <span onClick={()=>this.npchange('next', this.props.indexData.date)}>
                        下一天
                    </span>
                </div>
                <div>
                    <h3>车型选择</h3>
                    {this.props.data.trainTypeData.map((object, i) => {
                        return <label key={i}>
                            <input type="checkbox" value={object.value} onChange={this.trainTypeChange.bind(this)}
                                   checked={this.state.trainTypeCheckbox.indexOf(object.value) > -1}/> {object.name}
                        </label>
                    })}
                    <span onClick={this.typeSubmit.bind(this)}>确定</span>
                </div>
                <div style={{border: '1px solid #ccc'}}>
                    <h3>条件筛选</h3>
                    出发车站
                    <div>
                        {this.props.data.fromStation.map((object, i) => {
                            return <label key={i}>
                                <input type="checkbox" value={object.station_name}
                                       checked={this.state.chooseFromStation.indexOf(object.station_name) > -1}
                                       onChange={this.fromStationChange.bind(this)}/>
                                {object.station_name}
                            </label>
                        })}
                    </div>
                    <hr/>
                    到达车站
                    <div>
                        {this.props.data.toStation.map((object, i) => {
                            return <label key={i}>
                                <input type="checkbox" value={object.station_name}
                                       checked={this.state.chooseToStation.indexOf(object.station_name) > -1}
                                       onChange={this.toStationChange.bind(this)}/>
                                {object.station_name}
                            </label>
                        })}
                    </div>
                    <hr/>
                    <h5>出发时间段</h5><br/>
                    <input type="checkbox" value={1} onChange={this.timeChange.bind(this)}/>10点之前 <br/>
                    <input type="checkbox" value={2} onChange={this.timeChange.bind(this)}/>10:01-28:00<br/>
                    <input type="checkbox" value={3} onChange={this.timeChange.bind(this)}/>18:01之后<br/>

                    <span onClick={this.optionSubmit.bind(this)}>确定</span>
                    <h3>排序</h3>
                    按时间顺序
                    按时间倒序
                </div>
                <ul>
                    {this.props.data.trainListFilter.map((object, i) => {
                        return <li onClick={()=> this.submit(object, this.type)} key={i}>
                            {object.train_code} <br/>
                            出发站:{object.from_station_name} <br/>
                            终点站: {object.to_station_name} <br/>
                            出发时间:{object.start_time} <br/>
                            到达时间:{object.arrive_time}<br/>
                            历时: {object.run_time} <br/>
                            <hr/>
                        </li>
                    })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.initList();
    }

    //初始化车次列表
    initList() {
        this.props.ajaxinittrainlist({
            from: this.props.indexData.startStation.code,
            to: this.props.indexData.endStation.code,
            date: this.props.indexData.date
        })
    }

    //上一天和下一天
    npchange(str, oDate) {
        let newDate;
        if (str === 'pre') {
            newDate = preDay(oDate);
        } else if (str === 'next') {
            newDate = nextDay(oDate);
        }
        this.props.changedate(newDate);
        this.initList();
    }

    //日期选择
    datechange(event) {
        this.props.changedate(event.target.value);
        this.initList();
    }

    //火车类型选择
    trainTypeChange(e) {
        const newCheckBox = this.state.trainTypeCheckbox;
        if (e.target.checked) {
            newCheckBox.push(e.target.value)
        } else {
            newCheckBox.splice(newCheckBox.indexOf(e.target.value), 1)
        }

        this.setState({trainTypeCheckbox: newCheckBox})
    }

    //火车类型选择确定
    typeSubmit() {
        this.props.typesubmit(this.state.trainTypeCheckbox);
    }

    //车站选择
    fromStationChange(event) {
        let val = event.target.value;
        let newArr = this.state.chooseFromStation;
        if (event.target.checked) {
            newArr.push(val)
        } else {
            newArr.splice(newArr.indexOf(val), 1)
        }
        this.setState({chooseFromStation: newArr})
    }

    toStationChange(event) {
        let val = event.target.value;
        let newArr = this.state.chooseToStation
        if (event.target.checked) {
            newArr.push(val)
        } else {
            newArr.splice(newArr.indexOf(val), 1)
        }
        this.setState({chooseToStation: newArr})

    }

    timeChange(event) {
        let val = event.target.value;
        let newArr = this.state.chooseTime;
        if (event.target.checked) {
            newArr.push(val)
        } else {
            newArr.splice(newArr.indexOf(val), 1)
        }
        this.setState({chooseTime: newArr})
    }

    optionSubmit() {
        let time = this.state.chooseTime.length > 0 ? this.state.chooseTime : this.props.data.chooseTimeData.slice();
        let toStation = this.state.chooseToStation.length > 0 ? this.state.chooseToStation : this.props.data.chooseToStation.slice();
        let fromStation = this.state.chooseFromStation.length > 0 ? this.state.chooseFromStation : this.props.data.chooseFromStation.slice();
        this.props.optionsubmit({
            time: time,
            toStation: toStation,
            fromStation: fromStation
        })
    }
}

export default connect(
    state => ({data: state.trainlist, indexData: state.index}),
    {ajaxinittrainlist, changedate, typesubmit, optionsubmit}
)(TrainList)
