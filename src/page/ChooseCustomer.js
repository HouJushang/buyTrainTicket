import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import {ajaxcustomerlist,choosecustomer} from '../actions/customer'

class ChooseCustomer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            chooseArr: this.props.customerData.chooseCustomer.slice(),
        }
    }

    render() {
        return (
            <div className="animatepage">
                <Header title='选择乘客' back={this.props.history.goBack}/>
                <ul>
                    {
                        this.props.customerData.customerList.map((object, i) => {
                            return <li key={i}>
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
                                        <input type="checkbox" value={object.id}
                                               checked={this.state.chooseArr.indexOf(object.id) > -1}
                                               onChange={this.checkboxChange.bind(this)}/>
                                    </dd>
                                </dl>
                            </li>
                        })
                    }
                </ul>
                <div onClick={()=>this.submit()}>确定</div>
                <div>添加乘客</div>
            </div>
        );
    }

    componentDidMount() {
        this.props.ajaxcustomerlist();
    }

    checkboxChange(e) {
        const newArr = this.state.chooseArr;
        const val = parseInt(e.target.value);
        if (e.target.checked) {
            newArr.push(val)
        } else {
            newArr.splice(newArr.indexOf(val), 1)
        }
        this.setState({chooseArr: newArr})
    }

    submit() {
        this.props.choosecustomer(this.state.chooseArr);
        window.history.go(-1);
    }
}

export default connect(
    state => ({customerData: state.customer}),
    {ajaxcustomerlist,choosecustomer}
)(ChooseCustomer)
