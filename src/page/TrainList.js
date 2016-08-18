import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import Loading from '../components/Loading.js';

import {ajaxinitaddresslist} from '../actions/addresslist'
import {choosestaion} from '../actions/index'


class Choose extends React.Component {
    constructor({data, ajaxinitaddresslist, choosestaion}) {
        super();
    }
    componentWillMount() {
        this.type = this.props.params.type;
        if(this.type=='startStation'){
            this.title = '选择出发车站';
        }else{
            this.title = '选择终点车站';
        }
    }
    render() {
        return (
            <div id="main">
                <Header title={this.title}/>
                {!this.props.data.isLoading ? <Loading /> : null }
                <ul>
                    {this.props.data.list.map((object, i) => {
                        return <li onClick={()=> this.submit(object, this.type)} key={i}>
                            {object.cityName}
                        </li>;
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        if (!this.props.data.isLoading) {
            this.props.ajaxinitaddresslist();
        }
    }
    submit(obj, type) {
        this.props.choosestaion(obj, type);
    }
}

export default connect(
    state => ({data: state.addresslist}),
    {ajaxinitaddresslist, choosestaion}
)(Choose)