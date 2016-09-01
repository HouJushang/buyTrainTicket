import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Header from '../components/Header.js';
import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';
import dataToweek from '../utils/dateToWeek'
import {exchangestation, changedate} from '../actions/index'

class Index extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="animatepage indexPage">
                <Header title="火车购票"/>
                <div className="indexBody">
                    <img src={bannerImage} className="trainBanner"/>
                    <div className="chooseStaion">
                        <Link to={'/choose/startStation'}
                              className="station">
                            <p>出发站</p>
                            <p>{this.props.data.startStation.cityName}</p>

                        </Link>
                        {/*todo 出发站和重点站互换*/}
                        <span onClick={()=>this.props.exchangestation()}>
                        <img src={checkImage} alt="" width={43} height={43}/>
                    </span>
                        <Link to={'/choose/endStation'} className="station">
                            <p>终点站</p>
                            <p>{this.props.data.endStation.cityName}</p>
                        </Link>
                    </div>
                    <label htmlFor="indexDate" className="label-indexDate indexlabelBox">
                        <span className="fl">出发日期</span> <span
                        className="fr">{this.props.data.date} {dataToweek(this.props.data.date)}</span>
                        <input type="date" className="date" id="indexDate" defaultValue={this.props.data.date}
                               onChange={this.datechange.bind(this)}/>
                    </label>
                    <label htmlFor="onlaydg" className="indexlabelBox label-onlydg">
                        只查询高铁/动车 <input id="onlaydg" type="checkbox" className="fr" onChange={this.onlyDg}/> <div className="onlydg-checkbox"></div>
                    </label>
                    <div className="submit" onClick={()=>this.submit()}>
                        查询
                    </div>
                    <div>
                        <span>首页</span>
                        <Link to="/myorder">我的订单</Link>
                    </div>
                </div>
            </div>
        );
    }

    datechange(event) {
        this.props.changedate(event.target.value);
    }
    onlyDg(e){
        if(e.target.checked){

        }else{

        }
    }
    submit() {
        window.location = '#/trainlist';
    }
}

export default connect(
    state => ({data: state.index}),
    {exchangestation, changedate}
)(Index)

