/**
 * Created by hfcb on 16/8/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {changepagetype} from '../actions/changeAnimate'
import {pageback} from '../actions/changeAnimate'


class Header extends React.Component {

    render() {
        return (
            <header>
                <span className="backBtn" onClick={this.props.pageback}>
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
    {changepagetype,pageback}
)(Header)
