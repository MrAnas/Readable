import { combineReducers } from 'redux'

import * as type from '../actions'


const intialBlogState = {
    post:[],
    selectedId: null
}

const initialCommentState = {
    comments: [],
    selectedId: null
}

const initialCategoryState = {
    categoryTypes: [],
    selectedName: null
}

function blog(state = intialBlogState, action) {

    const {activityType, content } = action;

    switch(action.type) {
        case type.POST_ACTION:
            return {
                ...state,
                [activityType]:content,
            };
        default:
            return state;
    }
}

function category(state = initialCategoryState, action) {

    const {activityType, content } = action;

    switch(action.type) {
        case type.CATEGORY_ACTION:
            return {
                ...state,
                [activityType]:content,
            };
        default:
            return state;
    }
}

function comment(state = initialCommentState, action) {

    const {activityType, content } = action;

    switch(action.type) {
        case type.COMMENT_ACTION:
            return {
                ...state,
                [activityType]:content,
            };
        default:
            return state;
    }
}

export default combineReducers({
    blog,category, comment
});