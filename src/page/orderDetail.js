import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import {ajaxorderdetail} from '../actions/order.js'

class orderDetail extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="animatepage orderDetailPage">
                <Header title='订单详情'/>
                <p className="buyInfo">
                    席位已成功锁定，请您在29分钟内进行网上支付，否则席位将自动
                    释放给其他旅客。
                    付款成功后，请在开车前到售票窗口换取纸质车票。
                </p>
                <div className="orderDetailBox">
                    <p className="orderNo">
                        订单号:{this.props.orderDetail.ordernumber}
                    </p>
                    <div className="orderInfo">
                        <dl className="stationDetail">
                            <dd>
                                {this.props.orderDetail.from_station_name}<br/>
                                {this.props.orderDetail.train_time}<br/>
                                {this.props.orderDetail.train_date}
                            </dd>
                            <dd>
                                {this.props.orderDetail.checi}<br/>
                                {this.props.orderDetail.run_times}
                            </dd>
                            <dd>
                                {this.props.orderDetail.to_station_name}<br/>
                                {this.props.orderDetail.arrive_time}<br/>
                                {this.props.orderDetail.arrive_date}
                            </dd>

                        </dl>
                        <div className="personalList">
                            <ul>
                                {
                                    this.props.orderDetail.passengers.map((item)=> {
                                        return <li>
                                            <div className="fl">
                                                {item.passengersename} <span
                                                className="f10 fch">{item.piaotypename}</span><br/>
                                                <span className="f14 fch lh22">{item.passportseno}</span>
                                            </div>
                                            <div className="fr">
                                                {item.zwname} <span className="fcy f10">¥</span><span
                                                className="fcy">{item.price} 元</span><br/>
                                                <span className="f10 fch lh22">{item.cxin}</span>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                            总计：¥{this.props.orderDetail.orderamount}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=> {
            this.props.ajaxorderdetail(this.props.params.orderId)
        }, 260)
    }
}
export default connect(
    state => ({orderDetail: state.myorder.orderDetail}),
    {ajaxorderdetail}
)(orderDetail)
