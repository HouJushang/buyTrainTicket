import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';

import {exchangestation, changedate} from '../actions/index'





class Index extends React.Component {
    constructor({data, exchangestation, changedate}) {
        super();
        this.startStation = data.startStation;
        this.endStation = data.endStation;
        this.date = data.date;
        this.onChange = this.datechange.bind(this);

    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="main">
                <Header title="首页"/>
                <img src={bannerImage} className="trainBanner"/>
                <div className="chooseStaion">
                    <Link to={`/choose/startStation`}
                          className="startStaion station">
                        {this.startStation.cityName}
                    </Link>
                    <div onClick={()=>this.props.exchangestation()}>
                        <img src={checkImage} alt="" width={35} height={35}/>
                    </div>
                    <Link to={`/choose/endStation`} className="startStaion station">
                        {this.endStation.cityName}
                    </Link>
                </div>
                <input type="date" className="date" defaultValue={this.date} onChange={this.onChange}/>
                <div className="submit" onClick={()=>this.submit()}>
                    查询
                </div>
            </div>
        );
    }

    datechange(event) {
        this.props.changedate(event.target.value);
    }

    submit() {
        console.log(1111,this.props.data.date, this.startStation, this.endStation);
    }
}

export default connect(
    state => ({data: state.index}),
    {exchangestation, changedate}
)(Index)

