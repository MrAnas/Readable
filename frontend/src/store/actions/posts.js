import {FETCH_POSTS}  from '../types'

export const fetchPost = () => {
    return{
        type: FETCH_POSTS,
    }
}
