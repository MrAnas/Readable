export const POST_ACTION = 'POST_ACTION';
export const CATEGORY_ACTION = 'CATEGORY_ACTION';
export const COMMENT_ACTION = 'COMMENT_ACTION';


export function postAction({activityType, content }){
    return {
        type:POST_ACTION,
        activityType,
        content,
    }
}

export function categoryAction({activityType, content}){
    return {
        type:CATEGORY_ACTION,
        activityType,
        content,
    }
}


export function commentAction({activityType, content}){
    return {
        type:COMMENT_ACTION,
        activityType,
        content,
    }
}


