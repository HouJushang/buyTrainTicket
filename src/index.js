//lib
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

//redux
import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'


//page
import Main from './page/Main.js';
import Index from './page/Index.js';
import Choose from './page/Choose.js';

//style
import './sass/main.sass'

//reducers
import * as reducers from './reducers/main.js'

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const store = createStore(
    reducer,
)
const history = syncHistoryWithStore(browserHistory, store)




// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={Main}>
                    <Route path="index" component={Index}></Route>
                    <Route path="choose/:type" component={Choose}></Route>
                </Route>
            </Router>
        </div>
    </Provider>, document.getElementById('app'));
