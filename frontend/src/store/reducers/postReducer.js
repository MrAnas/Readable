
const posts = (state = [],action) => {
    
    switch(action.type){
        case 'FETCH_POSTS_PENDING':
            return []
        
        case "FETCH_POSTS_FULFILLED":
            return action.payload.data;
        
        default:
            return state;
    }
}

export default posts;