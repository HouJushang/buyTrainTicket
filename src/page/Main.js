/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ReactCSSTransitionGroup component="div" transitionName="changepage" >
                {this.props.children}
            </ReactCSSTransitionGroup>
        );
    }
}

export default Main;
