import { createStore, applyMiddleware,combineReducers } from 'redux';
import {Login} from '../reducer/loginreducer';





var rootReducer = combineReducers({Login});




var store = createStore(rootReducer);




export default store;
