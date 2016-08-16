import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux'


import Header from '../components/Header.js';

import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';

import { increase, decrease } from '../actions/index'


function Index({ number, increase, decrease }) {
    return (
        <div id="main">
            <Header title="首页"/>
            <img src={bannerImage} className="trainBanner"/>
            <div className="chooseStaion">
                <Link to={`/choose/startStaion`}
                      className="startStaion station">出发站</Link>
                <div>
                    <img src={checkImage} alt="" width={35} height={35}/>
                </div>
                <Link to={`/choose/endStaion`} className="startStaion station">重点站</Link>
            </div>
            <input type="date" className="date"/>
            <div className="submit">
                <button onClick={() => increase(1)}>Increase</button>
                查询{number}
                <button onClick={() => decrease(1)}>Decrease</button>
            </div>
        </div>
    );
}

export default connect(
    state => ({ number: state.index.number }),
    { increase, decrease }
)(Index)

