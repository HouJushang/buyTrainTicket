import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
// import {ajaxcustomerlist, choosecustomer} from '../actions/customer'

class ChooseCustomer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }
    render() {
        return (
            <div className="animatepage">
                <Header title='选择乘客' back={this.props.history.goBack}/>

            </div>
        );
    }

    componentDidMount() {

    }
}

export default connect(
    state => ({customerData: state.customer}),
    // {ajaxcustomerlist, choosecustomer}
)(ChooseCustomer)
