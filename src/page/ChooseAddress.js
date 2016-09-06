import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';

import {ajaxinitaddresslist} from '../actions/addresslist'
import {choosestaion} from '../actions/index'
import {iscroll, ReactIScroll, iscrollConfig} from '../utils/iscroll'

import searchImage from '../images/search.png'

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
            <div className="animatepage chooseAddress">
                <Header title={this.title} back={this.back}/>
                <div className="addressSearch">
                    <label className="searchBox">
                        <img src={searchImage} width='15'/>
                        <input type="text" placeholder="输入中文/拼音/首字母" onChange={(e)=>this.filter(e)}/>
                    </label>
                </div>
                <div className="addressListBody">
                    <ReactIScroll iScroll={iscroll} options={iscrollConfig()}>
                        <ul>
                            <li id={this.state.inputVal.length > 0 ? '' : 'hide'} className="filterCity">
                                <dl>
                                    {
                                        this.state.filterArr.map((object)=> {
                                            return <dd onClick={()=> this.submit(object, this.type)} dangerouslySetInnerHTML={{__html:object.cityName2}}>
                                            </dd>;
                                        })}
                                </dl>

                            </li>
                            <li id={!this.state.inputVal.length > 0 ? '' : 'hide'} className="hotCityBox">
                                <dl>
                                    <dt>
                                        热门城市
                                    </dt>
                                    {hotCity.map((object, i) => {
                                        return <dd onClick={()=> this.submit(object, this.type)} key={i}>
                                           <div>
                                               {object.cityName}
                                           </div>
                                        </dd>;
                                    })}
                                </dl>
                            </li>
                            <li id={!this.state.inputVal.length > 0 ? '' : 'hide'} className="allCityBox">
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
        setTimeout(()=>this.props.ajaxinitaddresslist(), 260)
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
