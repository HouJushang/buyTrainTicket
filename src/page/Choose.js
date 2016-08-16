import React from 'react';
import { connect } from 'react-redux'


import Header from '../components/Header.js';




function Choose({data}) {
    return (
        <div id="main">
            <Header title="选择车站"/>
            {/*{this.props.params.type}*/}

            <ul>
                {data.list.map(function (object, i) {
                    return <li key={i}>{object.name} </li>;
                })}
            </ul>
        </div>
    );
}

export default connect(
    state => ({ data: state.addresslist }),
)(Choose)
