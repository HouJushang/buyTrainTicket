import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Header from '../components/Header.js';
import {ajaxinitmyorder} from '../actions/order'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'


class Index extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        console.log(this.props.data.list);
    }

    render() {
        return (
            <div className="animatepage myorderpage">
                <Header title="我的订单"/>
                <div className="myorderBody">
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig}>
                        <dl>
                            <dt>未支付订单</dt>
                            {this.props.data.list.notpayorderlist.map((item, i)=> {
                                return <dd key={i}>
                                    <div className="oh ddTop">
                                        <div className="fl">
                                            {item.from_station_name} 去 {item.to_station_name}<br/>
                                            {item.train_date} {item.train_time}开<br/>
                                            {item.checi}
                                        </div>
                                        <div className="fr">
                                            ￥{item.pay_amt}
                                            {item.STATUS}
                                        </div>
                                    </div>
                                    <ul>
                                        {item.newpassengers.map((item2)=>{
                                            return <li>
                                                    {item2.passenger_name}
                                                    {item2.passenger_no.substring(0,6)+"********"+item2.passenger_no.substring(item2.passenger_no.length-4)}
                                            </li>
                                        })}
                                    </ul>
                                </dd>
                            })}
                        </dl>
                    </ReactIScroll>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=>this.props.ajaxinitmyorder(), 260)
    }
}

export default connect(
    state => ({data: state.myorder}), {ajaxinitmyorder}
)(Index)

