/**
 * Created by hfcb on 16/8/9.
 */
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <span onClick={this.props.back}>
                    返回
                </span>
                {this.props.title}
            </header>
        );
    }
}

Header.defaultProps = {
    title: '头部默认标题',
    back (){
        alert(1);
    }
};
export default Header
