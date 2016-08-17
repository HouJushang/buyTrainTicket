import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';

import {exchangestation} from '../actions/index'


class Index extends React.Component {
    constructor({data, exchangestation}) {
        super();

        this.startName = data.startStation.cityName;
        this.endName = data.endStation.cityName;
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
                        {this.startName}
                    </Link>
                    <div onClick={()=>this.props.exchangestation()}>
                        <img src={checkImage} alt="" width={35} height={35}/>
                    </div>
                    <Link to={`/choose/endStation`} className="startStaion station">
                        {this.endName}
                    </Link>
                </div>
                <input type="date" className="date"/>
                <div className="submit">
                    查询
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({data: state.index}),
    {exchangestation}
)(Index)

