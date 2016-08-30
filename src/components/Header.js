/**
 * Created by hfcb on 16/8/9.
 */
import React from 'react';
import {connect} from 'react-redux'
import {changepagetype} from '../actions/changeAnimate'

class Header extends React.Component {
    back(){
        this.props.changepagetype('left');
        window.history.go(-1);
    }
    render() {
        return (
            <header>
                <span onClick={this.back.bind(this)}>
                    返回
                </span>
                {this.props.title}
            </header>
        );
    }
}

Header.defaultProps = {
    title: '头部默认标题',
};
export default connect(
    state => ({changeanimate: state.changeanimate}),
    {changepagetype}
)(Header)
