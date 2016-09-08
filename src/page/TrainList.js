import React from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header.js';

import {ajaxinittrainlist, typesubmit, optionsubmit} from '../actions/trainlist'
import dataToweek from '../utils/dateToWeek'
import {preDay, nextDay} from '../utils/npdate'
import {changedate} from '../actions/index'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'

import footerTimeIcon from '../images/gray-time-icon.png'
import footerTypeIcon from '../images/gray-train-icon.png'
import footerSelectIcon from '../images/gray-select-icon.png'


class TrainList extends React.Component {
    constructor() {
        super();
        this.title = '车次列表'
    }

    componentWillMount() {
        this.state = {
            trainTypeCheckbox: this.props.data.trainTypeCheckboxRel.slice(),
            chooseToStation: [],
            chooseFromStation: [],
            chooseTime: [],
            trainTypePopup: false,
            optionPopup: false
        }
    }

    render() {
        return (
            <div className="animatepage trainlistPage">
                <Header title={this.title}/>
                <div className="preNexDay">
                    <span onClick={()=>this.npchange('pre', this.props.indexData.date)}>
                        上一天
                    </span>
                    <label htmlFor="trainListDate">
                        {this.props.indexData.date} {dataToweek(this.props.indexData.date)}
                        <input type="date" className="date" value={this.props.indexData.date}
                               onChange={this.datechange.bind(this)}/>
                    </label>

                    <span onClick={()=>this.npchange('next', this.props.indexData.date)}>
                        下一天
                    </span>
                </div>
                <div className="pageBody">
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig()}>
                        <ul className="trainlist-ul">
                            {this.props.data.trainListFilter.map((object, i) => {
                                return <li onClick={()=>this.toDetail(object.train_code)} key={i}>
                                    <dl>
                                        <dd>
                                            <p className="startfont">{object.start_time}</p>
                                            <p className="endfont">{object.arrive_time}</p>
                                        </dd>
                                        <dd>
                                            {object.train_code}
                                        </dd>
                                        <dd>
                                            <p>{object.from_station_name === object.start_station_name ?
                                                <span className="start">始</span> : <span className="middle">过</span>}
                                                {object.from_station_name}
                                            </p>
                                            <p>
                                                {object.end_station_name === object.to_station_name ?
                                                    <span className="end">终</span> : <span className="middle">过</span>}
                                                {object.to_station_name}
                                            </p>
                                        </dd>
                                        <dd>
                                            <p>{object.run_time}</p>
                                            <p>
                                                <span>￥</span><span>{object.ticketinfo[object.ticketinfo.length - 1]['ticket_price']}起</span>
                                            </p>
                                        </dd>
                                    </dl>
                                    <div className="ticketInfo">
                                        {
                                            object.ticketinfo.map((ticketObject, i)=> {
                                                return <span
                                                    key={i}>{ticketObject.ticket_name}({ticketObject.ticket_num == 0 ? '无' : ticketObject.ticket_num})</span>
                                            })
                                        }
                                    </div>
                                </li>
                            })}
                        </ul>
                    </ReactIScroll>
                </div>
                <div className="popupCanver" id={this.state.trainTypePopup || this.state.optionPopup ? "show" : "hide"}
                     onClick={()=> {
                         this.setState({trainTypePopup: false, optionPopup: false})
                     }}>
                </div>
                <dl className="trainTypePopup" id={this.state.trainTypePopup ? "show" : "hide"}>
                    <dt>
                       <span className="fl" onClick={()=> {
                           this.setState({trainTypePopup: false})
                       }}>
                           关闭
                       </span>
                        <span className="fr" onClick={this.typeSubmit.bind(this)}>
                           确定
                       </span>
                    </dt>
                    {this.props.data.trainTypeData.map((object, i) => {
                        return <dd>
                            <label key={i}>
                                <input type="checkbox" value={object.value} onChange={this.trainTypeChange.bind(this)}
                                       checked={this.state.trainTypeCheckbox.indexOf(object.value) > -1}/>
                                <div className="vcheckbox"></div>
                                <span>{object.name}</span>
                            </label>
                        </dd>
                    })}
                </dl>

                <dl className="trainOptionPopup" id={this.state.optionPopup ? "show" : "hide"}>
                    <dt>
                        <span className="fl" onClick={()=> {
                            this.setState({optionPopup: false})
                        }}>关闭</span>
                        <span className="fr" onClick={this.optionSubmit.bind(this)}>确定</span>
                    </dt>
                    <dd>
                        <div className="dd_header">
                            出发车站
                        </div>
                        <ul>
                            {this.props.data.fromStation.map((object, i) => {
                                return <li>
                                    <label key={i}>
                                        <input type="checkbox" value={object}
                                               checked={this.state.chooseFromStation.indexOf(object) > -1}
                                               onChange={this.fromStationChange.bind(this)}/>
                                        {object}
                                    </label>
                                </li>
                            })}
                        </ul>
                    </dd>
                    <dd>

                        <div className="dd_header">
                            到达车站
                        </div>
                        <ul>
                            {this.props.data.toStation.map((object, i) => {
                                return <li key={i}>
                                    <label>
                                        <input type="checkbox" value={object}
                                               checked={this.state.chooseToStation.indexOf(object) > -1}
                                               onChange={this.toStationChange.bind(this)}/>
                                        {object}
                                    </label>
                                </li>
                            })}
                        </ul>

                    </dd>
                    <dd>
                        <div className="dd_header">
                            出发时间段
                        </div>
                        <ul>
                            <li>
                                <input type="checkbox" value={1} onChange={this.timeChange.bind(this)}/>10点之前 <br/>
                            </li>
                            <li>
                                <input type="checkbox" value={2} onChange={this.timeChange.bind(this)}/>10:01-18:00<br/>
                            </li>
                            <li>
                                <input type="checkbox" value={3} onChange={this.timeChange.bind(this)}/>18:01之后<br/>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <div className="tranList-footer">
                    <div className="footerItem">
                        <img src={footerTimeIcon} width={16} height={16}/>
                        时间排序
                    </div>
                    <div className="footerItem" onClick={()=> {
                        this.setState({trainTypePopup: true, optionPopup: false})
                    } }>
                        <img src={footerTypeIcon} width={16} height={16}/>
                        车型选择
                    </div>
                    <div className="footerItem" onClick={()=> {
                        this.setState({optionPopup: true, trainTypePopup: false})
                    } }>
                        <img src={footerSelectIcon} width={16} height={16}/>
                        条件筛选
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=>this.initList(), 260)
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
        this.setState({trainTypePopup: false});
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
        let val = parseInt(event.target.value);
        let newArr = this.state.chooseTime;
        if (event.target.checked) {
            newArr.push(val)
        } else {
            newArr.splice(newArr.indexOf(val), 1)
        }
        this.setState({chooseTime: newArr})
    }

    optionSubmit() {
        this.props.optionsubmit({
            time: this.state.chooseTime,
            toStation: this.state.chooseToStation,
            fromStation: this.state.chooseFromStation
        })
        this.setState({optionPopup: false})
    }

    toDetail(traincode) {
        location.href = `#/traindetail/${traincode}`;
    }
}

export default connect(
    state => ({data: state.trainlist, indexData: state.index}),
    {ajaxinittrainlist, changedate, typesubmit, optionsubmit}
)(TrainList)
