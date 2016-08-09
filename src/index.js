import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route , browserHistory} from 'react-router'

import Main from './page/Main';
import Choose from './page/Choose';


// Render the main component into the dom
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/index" component={Main}>
            {/*<Route path="about" component={About}/>*/}
            {/*<Route path="users" component={Users}>*/}
            {/*<Route path="/user/:userId" component={User}/>*/}
            {/*</Route>*/}
            {/*<Route path="*" component={NoMatch}/>*/}
        </Route>
        <Route path="/choose/:type" component={Choose}/>
    </Router>, document.getElementById('app'));
