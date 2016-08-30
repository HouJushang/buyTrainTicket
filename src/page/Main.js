/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';
import {connect} from 'react-redux'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Loading from '../components/Loading';
// import {openloading } from '../actions/loading'


class Main extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="pageHtml">
                <ReactCSSTransitionGroup component="div"  transitionName="changePageAnimate"  transitionEnterTimeout={400}  transitionLeaveTimeout={400}>
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>
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
