import {combineReducers} from 'redux'
import postReducer from './postReducer'
import categoryReducer from './categoryReducer'

const RootReducer = combineReducers({
    posts: postReducer,
    categories: categoryReducer
    // Later
})

export default RootReducer;