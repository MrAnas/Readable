
const categories = (state = [],action) => {
    
    switch(action.type){
        case 'FETCH_CATEGORIES_PENDING':
            return []
        
        case "FETCH_CATEGORIES_FULFILLED":
        console.log(action.type)
            return action.payload.data.categories;
        
        default:
            return state;
    }
}

export default categories;