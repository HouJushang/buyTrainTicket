/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';
import {connect} from 'react-redux'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Loading from '../components/Loading';


class Main extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
    }
    render() {
        return (
            <div className="pageHtml">
                <ReactCSSTransitionGroup component="div" transitionName={this.props.animate.className} transitionEnterTimeout={340}
                                         transitionLeaveTimeout={340}>
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup component="div" transitionName={'animate-loading'} transitionEnterTimeout={180} transitionLeaveTimeout={180}>
                {this.props.data.isLoading ? <Loading /> : null}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    componentDidMount() {
    }
}
export default connect(
    state => ({data: state.loading, animate: state.changeanimate})
)(Main)
