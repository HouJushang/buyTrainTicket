import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import {ajaxcustomerlist} from '../actions/customer'


class ChooseCustomer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            chooseArr: this.props.customerData.chooseCustomer
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
            </div>
        );
    }

    componentDidMount() {
        this.props.ajaxcustomerlist();
    }

    checkboxChange(e) {
        const newArr = this.state.chooseArr;
        if (e.target.checked) {
            newArr.push(e.target.value)
        } else {
            newArr.splice(newArr.indexOf(e.target.value), 1)
        }
        this.setState({chooseArr: newArr})
    }

    submit(obj, type) {
    }
}

export default connect(
    state => ({customerData: state.customer}),
    {ajaxcustomerlist}
)(ChooseCustomer)
