import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Header from '../components/Header.js';
// import {ajaxinitaddresslist} from '../actions/addresslist'
// import {choosestaion} from '../actions/index'
import timeTominute from '../utils/timeTominute.js'


class SubmitOrder extends React.Component {
    constructor() {
        super();
        // this.props.params.type;
    }

    componentWillMount() {
        this.ticket = this.props.trainDetailData.ticketinfo[this.props.params.type];
        console.log(this.ticket);
    }

    render() {
        return (
            <div id="main">
                <Header title='确定订单' back={this.props.history.goBack}/>
                <div>
                    开始时间{this.props.trainDetailData.start_time}<br/>
                    车次{this.props.trainDetailData.train_code}<br/>
                    出发站{this.props.trainDetailData.from_station_name}<br/>
                    到达站{this.props.trainDetailData.to_station_name}<br/>
                    到达时间:{this.props.trainDetailData.arrive_time}<br/>
                    运行时间: {timeTominute(this.props.trainDetailData.run_time_minute)}<br/>
                    出发日期: {this.props.indexData.date}<br/>
                    到达日期: {this.props.trainDetailData.to_station_date}<br/>
                    <div>
                        取票退票说明
                    </div>
                    <div>
                       作为类型: {this.ticket.ticket_name} 单价 ${this.ticket.ticket_price} 数量: {this.ticket.ticket_num}
                    </div>
                    <div>
                        <Link to={`/choosecustomer`}>添加乘客</Link>
                    </div>
                    <div>
                        联系人 <input type="text"/><br/>
                        手机号码: <input type="text"/>
                    </div>
                    <div>
                        温馨提示:火车票无法保证100%出票，如出票失败将短信通知，退款将退回到您的付款账户，请您谅解。
                    </div>
                </div>
                <div>
                    共0人 总计钱 <span>确认下单</span>
                </div>
            </div>
        );
    }

    componentDidMount() {

    }

    submit(obj, type) {

    }
}

export default connect(
    state => ({trainDetailData: state.traindetail, indexData: state.index,}),
    // {ajaxinitaddresslist, choosestaion}
)(SubmitOrder)
