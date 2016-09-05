import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';

import {ajaxinitaddresslist} from '../actions/addresslist'
import {choosestaion} from '../actions/index'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'

class Choose extends React.Component {
    constructor(data, ajaxinitaddresslist, choosestaion) {
        super();
        this.data = data;
    }

    componentWillMount() {
        this.type = this.props.params.type;
        if (this.type == 'startStation') {
            this.title = '选择出发车站';
        } else {
            this.title = '选择终点车站';
        }
        this.back = this.props.history.goBack;

        this.state = {
            filterArr: [],
            inputVal: ''
        }
    }

    render() {
        var hotCity = this.props.data.addressList.filter((item)=> {
            if (item.hotspot == 1) {
                return true;
            }
        })
        return (
            <div className="animatepage">
                <Header title={this.title} back={this.back}/>
                <input type="text" placeholder="输入中文/拼音/首字母" onChange={(e)=>this.filter(e)}/>
                <div className="addressListBody">
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig()}>
                        <ul>
                            <li id={this.state.inputVal.length > 0 ? '' : 'hide'}>
                                <dl>
                                    <dt>
                                        搜索结果
                                    </dt>
                                    {
                                        this.state.filterArr.map((object)=> {
                                            return <dd onClick={()=> this.submit(object, this.type)}>
                                                {object.cityName2}
                                            </dd>;
                                        })}
                                </dl>
                            </li>
                            <li id={!this.state.inputVal.length > 0 ? '' : 'hide'}>
                                <dl>
                                    <dt>
                                        热门城市
                                    </dt>
                                    {hotCity.map((object, i) => {
                                        return <dd onClick={()=> this.submit(object, this.type)} key={i}>
                                            {object.cityName}
                                        </dd>;
                                    })}
                                </dl>
                            </li>
                            <li id={!this.state.inputVal.length > 0 ? '' : 'hide'}>
                                <dl>
                                    <dt>所有城市</dt>
                                    {this.props.data.addressList.map((object, i) => {
                                        return <dd onClick={()=> this.submit(object, this.type)} key={i}>
                                            {object.cityName}
                                        </dd>;
                                    })}
                                </dl>
                            </li>
                        </ul>
                    </ReactIScroll>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=>this.props.ajaxinitaddresslist(), 400)
    }

    filter(e) {

        var val = e.target.value.toLowerCase();
        var newArr = [];
        clearTimeout(this.timer);
        this.timer = setTimeout(()=> {
            this.props.data.addressList.forEach((item)=> {
                if (item.cityName.indexOf(val) > -1 || item.firstLetter.indexOf(val) > -1 || item.spellLetter.indexOf(val) > -1) {
                    var cityIndex = item.cityName.indexOf(val);
                    if (cityIndex > -1) {
                        let leftCityName = item.cityName.substring(0, cityIndex);
                        let rightCityName = item.cityName.substring(cityIndex + val.length);
                        let cityName2 = leftCityName + "<span>" + val + "</span>" + rightCityName;
                        item.cityName2 = cityName2
                    }
                    newArr.push(item);
                }
            })
            this.setState({
                filterArr: newArr,
                inputVal: val
            })
        }, 300)

    }

    submit(obj, type) {
        this.props.choosestaion(obj, type);
    }
}

export default connect(
    state => ({data: state.addresslist}),
    {ajaxinitaddresslist, choosestaion}
)(Choose)
