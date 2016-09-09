import React from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header.js';
import {ajaxinitmyorder} from '../actions/order'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'
import {popupMes} from '../actions/loading'


class MyOrder extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        this.state = {
            orderState: ['待处理', '已关闭', '未支付', '待出票', '已出票', '出票失败', '正在退票', '已退票', '退票失败']
        }
    }

    render() {
        return (
            <div className="animatepage myorderpage">
                <Header title="我的订单" />
                <div className="myorderBody">
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig()} onScroll={this.onScroll}>
                        <div>
                            <dl>
                                <dt>未支付订单</dt>
                                {this.props.data.notpayorderlist.map((item)=> {
                                    return <dd onClick={()=>this.goDetail(item.orderId,item.STATUS)}>
                                        <div className="oh ddTop">
                                            <div className="fl">
                                                {item.from_station_name} 去 {item.to_station_name}<br/>
                                                {item.train_date} {item.train_time}开<br/>
                                                {item.checi}
                                            </div>
                                            <div className="fr">
                                                <p><span>￥</span>{item.pay_amt}</p>
                                                {
                                                    [0, 1].indexOf(parseInt(item.STATUS)) > -1 ? <p className="close">
                                                        {this.state.orderState[item.STATUS]}
                                                    </p> : ''
                                                }
                                                {
                                                    item.STATUS == 2 ? <p className="yellow">
                                                        {this.state.orderState[item.STATUS]}
                                                    </p> : ''
                                                }
                                            </div>
                                        </div>
                                        <ul>
                                            {item.newpassengers.map((item2)=> {
                                                return <li>
                                                    {item2.passenger_name}
                                                    {item2.passenger_no.substring(0, 6) + "********" + item2.passenger_no.substring(item2.passenger_no.length - 4)}
                                                </li>
                                            })}
                                        </ul>
                                    </dd>
                                })}
                            </dl>
                            <dl>
                                <dt>已支付订单</dt>
                                {this.props.data.payorderlist.map((item)=> {
                                    return <dd onClick={()=>this.goDetail(item.orderId,item.STATUS)}>
                                        <div className="oh ddTop">
                                            <div className="fl">
                                                {item.from_station_name} 去 {item.to_station_name}<br/>
                                                {item.train_date} {item.train_time}开<br/>
                                                {item.checi}
                                            </div>
                                            <div className="fr">
                                                ￥{item.pay_amt}
                                                {
                                                    [3, 5, 6, 7].indexOf(parseInt(item.STATUS)) > -1 ?
                                                        <p className="close">
                                                            {this.state.orderState[item.STATUS]}
                                                        </p> : ''
                                                }
                                                {
                                                    item.STATUS == 4 ? <p className="green">
                                                        {this.state.orderState[item.STATUS]}
                                                    </p> : ''
                                                }
                                                {
                                                    item.STATUS == 5 || item.STATUS == 8 ? <p className="fail">
                                                        {this.state.orderState[item.STATUS]}
                                                    </p> : ''
                                                }
                                            </div>
                                        </div>
                                        <ul>
                                            {item.newpassengers.map((item2)=> {
                                                return <li>
                                                    {item2.passenger_name}
                                                    {item2.passenger_no.substring(0, 6) + "********" + item2.passenger_no.substring(item2.passenger_no.length - 4)}
                                                </li>
                                            })}
                                        </ul>
                                    </dd>
                                })}
                            </dl>
                        </div>
                    </ReactIScroll>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=>this.props.ajaxinitmyorder(), 260);
    }
    goDetail(orderNo,status) {
        if(status == 0 || status == 3 || status == 6){
            this.props.popupMes('该订单无法查看详情')
            return
        }
        this.props.history.pushState(null, `/orderDetail/${orderNo}`);
    }
    onScroll(e){
        alert(1);
    }
}

export default connect(
    state => ({data: state.myorder.list}), {ajaxinitmyorder,popupMes}
)(MyOrder)

