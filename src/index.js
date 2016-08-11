import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route , browserHistory} from 'react-router'

import Main from './page/Main.js';
import Index from './page/Index.js';
import Choose from './page/Choose.js';

import './sass/main.sass'



// Render the main component into the dom
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="index" component={Index}></Route>
            <Route path="choose/:type" component={Choose}></Route>
        </Route>
    </Router>, document.getElementById('app'));
