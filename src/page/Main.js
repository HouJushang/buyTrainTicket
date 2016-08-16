/**
 * Created by hfcb on 16/8/10.
 */
import React from 'react';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Main;
