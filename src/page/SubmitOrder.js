import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Header from '../components/Header.js';
import timeTominute from '../utils/timeTominute.js'
import {ajaxcustomerlist, choosecustomer} from '../actions/customer'
import {submitorder} from '../actions/order'
import getNativePhone from '../native/getPhone'


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
            <div className="animatepage">
                <Header title='确定订单' back={this.props.history.goBack}/>
                <div>
                    开始时间{this.detail.start_time}<br/>
                    车次{this.detail.train_code}<br/>
                    出发站{this.detail.from_station_name}<br/>
                    到达站{this.detail.to_station_name}<br/>
                    到达时间:{this.detail.arrive_time}<br/>
                    运行时间: {timeTominute(this.detail.run_time_minute)}<br/>
                    出发日期: {this.props.indexData.date}<br/>
                    到达日期: {this.detail.to_station_date}<br/>
                    <div>
                        取票退票说明
                    </div>
                    <div>
                        作为类型: {this.ticket.ticket_name} 单价 ${this.ticket.ticket_price} 数量: {this.ticket.ticket_num}
                    </div>
                    <ul>
                        {
                            this.props.customerData.customerList.map((object, i) => {
                                if (this.chooseArr.indexOf(object.id) > -1) {
                                    return <li key={i}>
                                        <dl>
                                            <dd onClick={(e)=>this.delCustomer(object.id)}>
                                                删除
                                            </dd>
                                            <dd>
                                                {object.passengerName}
                                            </dd>
                                            <dd>
                                                {object.passportName}
                                            </dd>
                                            <dd>
                                                {object.ticketTypeName}
                                            </dd>
                                            <dd>
                                                {object.passportNo}
                                            </dd>
                                        </dl>
                                    </li>
                                }
                            })
                        }
                    </ul>
                    <div>
                        <Link to={`/choosecustomer`}>添加乘客</Link>
                    </div>
                    <div>
                        联系人 <input type="text" onChange={(e)=>this.nameChange(e)}/><br/>
                        手机号码: <span>{this.phoneNo}</span>
                    </div>
                    <div>
                        温馨提示:火车票无法保证100%出票，如出票失败将短信通知，退款将退回到您的付款账户，请您谅解。
                    </div>
                </div>
                <div>
                    共{this.chooseArr.length}人 总计{this.chooseArr.length * this.ticket.ticket_price}钱 <span
                    onClick={()=>this.submit()}>确认下单</span>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if(!this.props.customerData.customerList.length>0){
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
    {ajaxcustomerlist, choosecustomer,submitorder}
)(SubmitOrder)
