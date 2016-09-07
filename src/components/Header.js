/**
 * Created by hfcb on 16/8/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {changepagetype} from '../actions/changeAnimate'
import {browserHistory} from 'react-router'


class Header extends React.Component {
    back(){
        this.props.changepagetype('left');
        browserHistory.goBack();
        setTimeout(()=>{
            this.props.changepagetype('right')
        },100)
    }
    render() {
        return (
            <header>
                <span className="backBtn" onClick={()=>this.back()}>
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
