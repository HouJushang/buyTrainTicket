import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux'


import Header from '../components/Header.js';

import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';

import { increase, decrease } from '../actions/index'


function Index({ data, increase, decrease }) {
    return (
        <div id="main">
            <Header title="首页"/>
            <img src={bannerImage} className="trainBanner"/>
            <div className="chooseStaion">
                <Link to={`/choose/startStaion`}
                      className="startStaion station">
                    {data.startStaion.cityName}
                </Link>
                <div>
                    <img src={checkImage} alt="" width={35} height={35}/>
                </div>
                <Link to={`/choose/endStaion`} className="startStaion station">
                    {data.endStation.cityName}
                </Link>
            </div>
            <input type="date" className="date"/>
            <div className="submit">
                <button onClick={() => increase(1)}>Increase</button>
                查询{data.number}
                <button onClick={() => decrease(1)}>Decrease</button>
            </div>
        </div>
    );
}

export default connect(
    state => ({ data: state.index }),
    { increase, decrease }
)(Index)

