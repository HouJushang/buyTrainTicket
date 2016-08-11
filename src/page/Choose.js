import React from 'react';

import Header from '../components/Header.js';


class ChooseComponent extends React.Component {
    render() {
        return (
            <div id="main">
                <Header title="选择车站"/>
                {this.props.params.type}
                <ul>
                    {this.props.list.map(function (object, i) {
                        return <li key={i}>{object.name} </li>;
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
            id: 1
        },
        {
            name: '上海',
            id: 2
        },
        {
            name: '厦门',
            id: 3
        }
    ]
};

export default ChooseComponent;
