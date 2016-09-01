import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Header from '../components/Header.js';
import {ajaxinitmyorder} from '../actions/order'
import {iscroll,ReactIScroll,iscrollConfig} from '../utils/iscroll'


class Index extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        console.log(this.props.data.list);
    }

    render() {
        return (
            <div className="animatepage indexPage">
                <Header title="我的订单"/>
                <ReactIScroll iScroll={iscroll} options={iscrollConfig}>
                <dl>
                    <dt>未支付订单</dt>
                    {this.props.data.list.notpayorderlist.map((item, i)=> {
                        return <dd key={i}>
                            {item.from_station_name} 去 {item.to_station_name}<br/>
                            {item.pay_amt}<br/>
                            {item.train_date} {item.train_time}开<br/>
                            {item.checi}
                            {item.passenger_name}
                            {item.passenger_no}
                        </dd>
                    })}
                </dl>
                </ReactIScroll>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=>this.props.ajaxinitmyorder(), 400)
    }
}

export default connect(
    state => ({data: state.myorder}), {ajaxinitmyorder}
)(Index)

