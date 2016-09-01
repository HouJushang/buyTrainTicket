import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';

import {ajaxinitaddresslist} from '../actions/addresslist'
import {choosestaion} from '../actions/index'


class Choose extends React.Component {
    constructor(data,ajaxinitaddresslist,choosestaion) {
        super();

        this.data = data;
    }
    componentWillMount() {
        this.type = this.props.params.type;
        if(this.type=='startStation'){
            this.title = '选择出发车站';
        }else{
            this.title = '选择终点车站';
        }
        this.back = this.props.history.goBack;
    }
    render() {
        return (
            <div className="animatepage">
                <Header title={this.title} back={this.back}/>
                <ul>
                    {this.props.data.addressList.map((object, i) => {
                        return <li onClick={()=> this.submit(object, this.type)} key={i}>
                            {object.cityName}
                        </li>;
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        setTimeout(()=>this.props.ajaxinitaddresslist(),400)
    }
    submit(obj, type) {
        this.props.choosestaion(obj, type);
    }
}

export default connect(
    state => ({data: state.addresslist}),
    {ajaxinitaddresslist, choosestaion}
)(Choose)
