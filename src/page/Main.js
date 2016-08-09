import React from 'react';
import {Link} from 'react-router'

import Header from '../components/Header.js';

import '../sass/main.sass'

import bannerImage from '../images/trainBanner.png';
import checkImage from '../images/train_trans.png';


class MainComponent extends React.Component {
    render() {
        return (
            <div id="main">
                <Header/>
                <img src={bannerImage} className="trainBanner"/>
                <div className="chooseStaion">
                    <Link to={`/choose/startStaion`} className="startStaion station">{this.props.startStaion.name}</Link>
                    <div>
                        <img src={checkImage} alt="" width={35} height={35}/>
                    </div>
                    <Link to={`/choose/endStaion`} className="startStaion station">{this.props.endStaion.name}</Link>
                </div>
                <input type="date" className="date"/>
                <div className="submit">
                    查询
                </div>
            </div>
        );
    }
}

MainComponent.defaultProps = {
    startStaion: {
        name: '北京',
        code: 122
    },
    endStaion: {
        name: '上海',
        code: 222
    }
};

export default MainComponent;
