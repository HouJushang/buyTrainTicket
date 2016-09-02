import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Header from '../components/Header.js';
import timeTominute from '../utils/timeTominute.js'
import {ajaxcustomerlist, choosecustomer} from '../actions/customer'
import {submitorder} from '../actions/order'
import getNativePhone from '../native/getPhone'
import dataToweek from '../utils/dateToWeek'
import arrowImage from '../images/bigArrow.png'
import warmImage from '../images/warm-icon.png'
import addCustomerImage from '../images/addCustom.png'


class SubmitOrder extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.ticket = this.props.trainDetailData.ticketinfo[this.props.params.type];
        this.chooseArr = this.props.customerData.chooseCustomer.slice();
        this.phoneNo = getNativePhone();
        this.detail = this.props.trainDetailData;
    }

    render() {
        return (
            <div className="animatepage submitOrderPage">
                <Header title='确定订单' back={this.props.history.goBack}/>
                <dl className="submitHeader">
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
                <div className="infoShow tr pr10 f12">
                    <img src={warmImage} width={15} className="vm mr5"/>取票、退票、改签说明 >>
                </div>
                <dl className="ticketInfo">
                    <dd>
                        座位类型
                    </dd>
                    <dd>
                        <p>{this.ticket.ticket_name}</p>
                        <p>
                            <span>￥</span>{this.ticket.ticket_price}
                        </p>
                    </dd>
                    <dd></dd>
                </dl>
                <dl className="customerM">
                    <dt>
                        <img src={addCustomerImage} width='16'/>
                        <Link to={`/choosecustomer`}>添加乘客</Link>
                    </dt>
                        {
                            this.props.customerData.customerList.map((object, i) => {
                                if (this.chooseArr.indexOf(object.id) > -1) {
                                    return <dd key={i}>
                                        <dl>
                                            <dd onClick={(e)=>this.delCustomer(object.id)}>
                                                删除
                                            </dd>
                                            <dd>
                                                <p>
                                                    <span>{object.passengerName}</span>
                                                    <span>{object.passportName}</span>
                                                </p>
                                                <p>
                                                    <span>
                                                        {object.ticketTypeName}
                                                    </span>
                                                    <span>
                                                        {object.passportNo}
                                                    </span>
                                                </p>
                                            </dd>
                                        </dl>
                                    </dd>
                                }
                            })
                        }
                </dl>
                <div>
                    联系人 <input type="text" onChange={(e)=>this.nameChange(e)}/><br/>
                    手机号码: <span>{this.phoneNo}</span>
                </div>
                <div>
                    温馨提示:火车票无法保证100%出票，如出票失败将短信通知，退款将退回到您的付款账户，请您谅解。
                </div>

                <div>
                    共{this.chooseArr.length}人 总计{this.chooseArr.length * this.ticket.ticket_price}钱 <span
                    onClick={()=>this.submit()}>确认下单</span>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.customerData.customerList.length > 0) {
            setTimeout(()=>this.props.ajaxcustomerlist(), 400)
        }

    }

    delCustomer(e) {
        var itemIndex = this.chooseArr.indexOf(e);
        this.chooseArr.splice(itemIndex, 1);
        this.props.choosecustomer(this.chooseArr);
    }

    nameChange(e) {
        this.name = e.target.value
    }

    submit() {
        //todo 验证是否选择乘客 length>0
        //todo 判断联系人是否是空
        var passengers = [];
        this.chooseArr.forEach((item) => {
            passengers.push({
                id: item,
                price: this.ticket.ticket_price,
                seat_type: this.ticket.ticket_type
            })
        })
        var parm = {
            arrive_time: this.detail.arrive_time,
            checi: this.detail.train_code,
            contact_name: this.name,
            contact_phone: this.phoneNo,
            from_station_code: this.detail.from_station_code,
            from_station_name: this.detail.from_station_name,
            mobile: this.phoneNo,
            passengers: passengers,
            pay_amt: this.chooseArr.length * this.ticket.ticket_price,
            run_time_minute: this.detail.run_time_minute,
            ticket_type: this.ticket.ticket_type,
            to_station_code: this.detail.to_station_code,
            to_station_name: this.detail.to_station_name,
            train_date: this.props.indexData.date,
            train_time: this.detail.start_time,
        }
        //todo 订单成功,提示信息内容,然后跳转我的订单页面
        this.props.submitorder(parm);
    }
}

export default connect(
    state => ({trainDetailData: state.traindetail, indexData: state.index, customerData: state.customer}),
    {ajaxcustomerlist, choosecustomer, submitorder}
)(SubmitOrder)
