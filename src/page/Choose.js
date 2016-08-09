import React from 'react';

import Header from '../components/Header.js';


class ChooseComponent extends React.Component {
    render() {
        return (
            <div id="main">
                <Header/>
                {this.props.params.type}
                <ul>
                    {this.props.list.map(function (object, i) {
                        return <li>{i} {object.name} </li>;
                    })}
                </ul>
            </div>
        );
    }
}
ChooseComponent.defaultProps = {
    list: [
        {
            name: '北京',
            code: 111
        },
        {
            name: '上海',
            code: 111
        },
        {
            name: '厦门',
            code: 111
        }
    ]
};

export default ChooseComponent;
