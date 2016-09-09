import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import {ajaxorderdetail} from '../actions/order.js'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'
import fetch from  '../utils/fetch'
import {pageback} from '../actions/changeAnimate'


class orderDetail extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            orderState: ['待处理', '已关闭', '未支付', '待出票', '已出票', '出票失败', '正在退票', '已退票', '退票失败']
        }
    }

    render() {
        return (
            <div className="animatepage orderDetailPage">
                <Header title='订单详情'/>
                <div className="orderDetailBody" id={this.props.orderDetail.status == 2 ? 0 : 'bottom0'}>
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig()}>
                        <section>
                            {
                                this.props.orderDetail.status == 2 ? <p className="buyInfo">
                                    席位已成功锁定，请您在{this.props.orderDetail.hintpaytime}分钟内进行网上支付，否则席位将自动释放给其他旅客。付款成功后，请在开车前到售票窗口换取纸质车票。
                                </p> : ''
                            }

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
                                        总计：¥{this.props.orderDetail.orderamount} {this.state.orderState[this.props.orderDetail.status]}
                                    </div>
                                </div>
                            </div>
                            {
                                this.props.orderDetail.status == 2 ?  <div className="orderCancel" onClick={()=>this.cancelOrder()}>
                                    取消订单
                                </div> : ''
                            }
                            {
                                this.props.orderDetail.status == 24 ?  <div className="orderCancel" onClick={()=>this.backTicket()}>
                                    退票
                                </div> : ''
                            }
                            <div className="buyInfo2">
                                请在{this.props.orderDetail.hintpaytime}分钟内完成网上支付，逾期未支付，系统将取消本次交易。在完成支付或者取消该清单之前，您将无法购买其他车票。<br/>
                                改签后新票票价低于原票价的，票价差额按银行规定时限退回原银行卡。
                            </div>
                        </section>
                    </ReactIScroll>
                </div>
                {
                    this.props.orderDetail.status == 2 ?  <div className="nowPay">
                        去支付
                    </div> : ''
                }
            </div>

        );
    }
    cancelOrder(){
        var pageBack =  this.props.pageback;
        this.props.fetch({
            url: 'cancelTicketOrder',
            data: {
                orderId: this.props.params.orderId
            },
            font: '正在取消订单...',
            success: function () {
                pageBack();
            }
        })
    }
    backTicket(){
        alert(1);
    }
    componentDidMount() {
        setTimeout(()=> {
            this.props.ajaxorderdetail(this.props.params.orderId)
        }, 260)
    }
}
export default connect(
    state => ({orderDetail: state.myorder.orderDetail}),
    {ajaxorderdetail,fetch,pageback}
)(orderDetail)
