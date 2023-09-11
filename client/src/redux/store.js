import {createStore, applyMiddleware} from "redux"
import {reducer} from "./reducer"
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
// createStore recibe 0 reducer y 1 configuraciones
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;