import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import Loading from '../components/Loading.js';

import {initaddresslist, ajaxinitaddresslist} from '../actions/addresslist'



class Choose extends React.Component{
    constructor({data, initaddresslist, ajaxinitaddresslist}){
        super();
    }

    render() {
        return (
            <div id="main">
                <Header title="选择车站"/>
                {this.props.params.type}
                {!this.props.data.isLoading ? <Loading /> : null }
                <ul>
                    {this.props.data.list.map(function (object, i) {
                        return <li key={i}>{object.cityName} </li>;
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount(){
        if(!this.props.data.isLoading){
            this.props.ajaxinitaddresslist();
        }
    }
}

export default connect(
    state => ({data: state.addresslist}),
    {initaddresslist, ajaxinitaddresslist}
)(Choose)
