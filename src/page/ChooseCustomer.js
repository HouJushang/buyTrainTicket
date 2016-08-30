import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import {ajaxcustomerlist} from '../actions/customer'
import timeTominute from '../utils/timeTominute.js'


class ChooseCustomer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="main">
                <Header title='选择乘客' back={this.props.history.goBack}/>
                <ul>
                    {
                        this.props.customerData.customerList.map((object, i) => {
                            return <li>
                                <dl>
                                    <dd>
                                        编辑
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
                                    <dd>
                                        <input type="checkbox"/>
                                    </dd>
                                </dl>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.props.ajaxcustomerlist()
    }

    submit(obj, type) {
    }
}

export default connect(
    state => ({customerData: state.customer}),
    {ajaxcustomerlist}
)(ChooseCustomer)
