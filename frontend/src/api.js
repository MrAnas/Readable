import {fetchPostsRequest,fetchPostsSuccess,fetchPostsError} from './actions'
 
const API_ID = 'cbdf55d9'
const APP_KEY = 'f3298b01c012c4a65bb2b4cdb8b5068f'
const SERVER = 'http://localhost:3001'

const headers = {
  'Authorization': 'Anas'
}

export const fetchCategories = () => {
  const URL = `${SERVER}/categories`;
  
  fetch(URL, {headers})
  .then( response => response.json())
  .then((data) => data.categories)
}
