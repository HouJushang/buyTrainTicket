import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Header from '../components/Header.js';
import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';
import dataToweek from '../utils/dateToWeek'
import {exchangestation, changedate} from '../actions/index'
import {typesubmit} from '../actions/trainlist'
import buyIcon from '../images/pay_icon.png'
import myOrder from '../images/gary_order_icon.png'

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            animate: false,
            canExchangestation: true
        }
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
                        <span onClick={()=>this.exchangestation()}>
                        <img className={this.state.animate ? 'animateImage' : ''} src={checkImage} alt="" width={43}
                             height={43}/>
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
                        只查询高铁/动车 <input id="onlaydg" type="checkbox" className="fr" onChange={(e)=>this.onlyDg(e)}/>
                        <div className="vcheckbox"></div>
                    </label>
                </div>
                <div className="okBtn mt15" onClick={()=>this.submit()}>
                    查询
                </div>
                <div className="indexFooter">
                    <a>
                        <img src={buyIcon} height={18} className="mt5 mb3"/>
                        <p className="fct">首页</p>
                    </a>
                    <Link to="/myorder">
                        <img src={myOrder} height={21} className="mt5"/>
                        <p>我的订单</p>
                    </Link>
                </div>
            </div>
        );
    }

    datechange(event) {
        this.props.changedate(event.target.value);
    }

    exchangestation() {
        this.setState({
            animate: true,
            canExchangestation: false
        })
        if (this.state.canExchangestation) {
            this.props.exchangestation();
            setTimeout(()=> {
                this.setState({
                    animate: false,
                    canExchangestation: true
                })
            }, 1000)
        }
    }

    onlyDg(e) {
        if (e.target.checked) {
            this.props.typesubmit(['D', 'G']);
        } else {
            this.props.typesubmit([]);
        }
    }

    submit() {
        window.location = '#/trainlist';
    }
}
export default connect(
    state => ({data: state.index}),
    {exchangestation, changedate, typesubmit}
)(Index)

