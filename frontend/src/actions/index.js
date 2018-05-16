export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"


// Add Post
export function addPost({}){
    return {
        type: ADD_POST,

    }
}
// Edit Post
export function editPost({}){
    return {
        type: EDIT_POST,
        
    }
}

// Delete Post
export function deletePost({}){
    return {
        type: DELETE_POST,
        
    }
}

// Add Comment
export function addComment({}){
    return {
        type: ADD_COMMENT,
        
    }
}

// Edit Comment
export function editComment({}){
    return {
        type: EDIT_COMMENT,
        
    }
}

// Edit Comment
export function deleteComment({}){
    return {
        type: DELETE_COMMENT,
        
    }
}