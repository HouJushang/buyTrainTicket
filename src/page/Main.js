/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';
import {connect} from 'react-redux'

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Loading from '../components/Loading';
import {openloading } from '../actions/loading'


class Main extends React.Component {
    constructor(data,openloading) {
        super();
    }

    render() {
        return (
            <div>
                {this.props.children}
                {this.props.data.isLoading ? <Loading /> : null}
            </div>
        );
    }

    componentDidMount() {
    }
}
export default connect(
    state => ({data: state.loading})
)(Main)
