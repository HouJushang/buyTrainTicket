//lib
// import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'

//redux
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk';


//page
import Main from './page/Main.js'
import Index from './page/Index.js'
import Choose from './page/Choose.js'
import TrainList from './page/TrainList.js'
import TrainDetail from './page/TrainDetail.js'
import SubmitOrder from './page/SubmitOrder.js'
import ChooseCustomer from './page/ChooseCustomer.js'

//dev
import Dev from './components/DevTools'

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
    Dev.instrument(),
    applyMiddleware(thunk)
)
const history = syncHistoryWithStore(hashHistory, store)


// ReactDOM.render(
//     <Provider store={store}>
//         <div className="pageContainer">
//             <Router history={history}>
//                 <Route path="/" component={Main}>
//                     <Route path="index" component={Index}></Route>
//                     <Route path="choose/:type" component={Choose}></Route>
//                     <Route path="trainlist" component={TrainList}></Route>
//                     <Route path="traindetail/:traincode" component={TrainDetail}></Route>
//
//                 </Route>
//             </Router>
//         </div>
//     </Provider>
//     , document.getElementById('app'));
// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <div className="pageContainer">
            <Router history={history}>
                <Route path="/" component={Main}>
                    <Route path="index" component={Index}></Route>
                    <Route path="choose/:type" component={Choose}></Route>
                    <Route path="trainlist" component={TrainList}></Route>
                    <Route path="traindetail/:traincode" component={TrainDetail}></Route>
                    <Route path="ordersubmit/:type" component={SubmitOrder}></Route>
                    <Route path="choosecustomer" component={ChooseCustomer}></Route>
                </Route>
            </Router>
        </div>
    </Provider>
    , document.getElementById('app'));

