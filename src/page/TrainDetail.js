import React from 'react';
import {connect} from 'react-redux'

import dataToweek from '../utils/dateToWeek'
import {preDay, nextDay} from '../utils/npdate'


import Header from '../components/Header.js';

import {gettraindetail} from '../actions/trainDetail.js';
import {changedate} from '../actions/index'

import timeTominute from '../utils/timeTominute.js'
import arrowImage from '../images/bigArrow.png'

class TrainDetail extends React.Component {
    constructor() {
        super();
        this.title = '车次详情';
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="animatepage trainDetailPage">
                <Header title={this.title} back={this.props.history.goBack}/>
                <dl className="trainDetailHeader">
                    <dd>
                        <p>{this.props.trainDetailData.from_station_name}</p>
                        <p className="timeFont">{this.props.trainDetailData.start_time}</p>
                        <p>{this.props.indexData.date} {dataToweek(this.props.indexData.date)}</p>
                    </dd>
                    <dd>
                        <p>{this.props.trainDetailData.train_code}</p>
                        <img src={arrowImage} width={100}/>
                        <p>{timeTominute(this.props.trainDetailData.run_time_minute)}</p>
                    </dd>
                    <dd>
                        <p> {this.props.trainDetailData.to_station_name}</p>
                        <p className="timeFont">{this.props.trainDetailData.arrive_time}</p>
                        <p>{this.props.trainDetailData.to_station_date} {dataToweek(this.props.trainDetailData.to_station_date)}</p>
                    </dd>
                </dl>
                <div className="preNexDay">
                        <span onClick={()=>this.npchange('pre', this.props.indexData.date)}>
                            上一天
                        </span>
                    <label htmlFor="detailDate">
                        {this.props.indexData.date} {dataToweek(this.props.indexData.date)}
                        <input type="date" className="date" value={this.props.indexData.date}
                               onChange={this.datechange.bind(this)}/>
                    </label>
                    <span onClick={()=>this.npchange('next', this.props.indexData.date)}>
                            下一天
                        </span>
                </div>
                <ul className="ticketList">
                    {this.props.trainDetailData.ticketinfo.map((object, i) => {
                        return <li key={i}>
                                <dl>
                                    <dd>{object.ticket_name}</dd>
                                    <dd><span>¥{object.ticket_price}</span></dd>
                                    <dd>{object.ticket_num}张</dd>
                                    {object.ticket_num == 0 ? <dd><span className="falseBtn">预定</span></dd> : <dd onClick={(e)=>this.goSubmitOrder(i)}><span className="trueBtn">预定</span></dd>}
                                </dl>
                        </li>
                    })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=> {
            this.initDetail(this.props.indexData.date)
        }, 600)
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
        this.initDetail(newDate);
    }

    //日期选择
    datechange(event) {
        this.props.changedate(event.target.value);
        this.initDetail(event.target.value);
    }

    submit(obj, type) {
        this.props.choosestaion(obj, type);
    }

    initDetail(oDate) {
        var parm = {
            from: this.props.indexData.startStation.code,
            to: this.props.indexData.endStation.code,
            date: oDate,
            train_code: this.props.params.traincode
        }
        this.props.gettraindetail(parm);
    }

    goSubmitOrder(e) {
        location.href = `#/ordersubmit/${e}`;
    }
}

export default connect(
    state => ({indexData: state.index, trainDetailData: state.traindetail}),
    {gettraindetail, changedate}
)(TrainDetail)
