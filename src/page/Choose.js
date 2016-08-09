import React from 'react';

import Header from '../components/Header.js';


class ChooseComponent extends React.Component {
    render() {
        return (
            <div id="main">
                <Header/>
                {this.props.params.type}
                <div className="chooseStaion">
                    <div className="startStaion station">
                    </div>
                    <div>
                    </div>
                    <div className="endStaion station">
                    </div>
                </div>
                <input type="date" className="date"/>
                <div className="submit">
                    查询
                </div>
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
