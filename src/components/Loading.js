/**
 * Created by hfcb on 16/8/9.
 */
import React from 'react';
import {connect} from 'react-redux'

class Loading extends React.Component {
    constructor({data}) {
        super();
    }

    render() {
        return (
            <div className="loading">
                <div>{this.props.data.loadingFont}</div>
            </div>
        );
    }
}
export default connect(
    state => ({data: state.loading})
)(Loading)
