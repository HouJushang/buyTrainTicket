import React from 'react';
import {connect} from 'react-redux'


import Header from '../components/Header.js';
import Loading from '../components/Loading.js';

import {ajaxinittrainlist} from '../actions/trainlist'


class TrainList extends React.Component {
    constructor({data, indexData, ajaxinittrainlist}) {
        super();
        this.title = '车次列表'

    }

    componentWillMount() {
        this.back = this.props.history.goBack;
    }

    render() {
        return (
            <div id="main">
                <Header title={this.title} back={this.back}/>
                {!this.props.data.trainListisLoading ? <Loading /> : null }
                <ul>
                    {this.props.data.trainList.map((object, i) => {
                        return <li onClick={()=> this.submit(object, this.type)} key={i}>
                            {object.from_station_name}
                        </li>;
                    })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.props.ajaxinittrainlist({
            from: this.props.indexData.startStation.code,
            to: this.props.indexData.endStation.code,
            date: this.props.indexData.date
        })
    }
}

export default connect(
    state => ({data: state.trainlist, indexData: state.index}),
    {ajaxinittrainlist}
)(TrainList)
