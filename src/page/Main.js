/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Loading from '../components/Loading';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="changepage">
                    {this.props.children}
                </ReactCSSTransitionGroup>
                <Loading />
            </div>
        );
    }
}

export default Main;
