import {createStore, applyMiddleware} from 'redux'
import RootReducer from './reducers'
import {FETCH_POSTS,POSTS_SUCCESS} from './types'
import axios from 'axios';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'


const middleaware = applyMiddleware(promise(),thunk);
const store = createStore(
    RootReducer,
    middleaware
)
// store.dispatch({
//     type: 'FETCH_'
// })

// store.dispatch((dispatch) => {
//     dispatch({type: FETCH_POSTS})
//     axios.defaults.headers.common['Authorization'] = "Anas";
//     axios.get("http://localhost:3001/categories/")
//     .then((response=>{
//         dispatch({type: POSTS_SUCCESS, payload: response.data});
//     }))
// })


export default store;