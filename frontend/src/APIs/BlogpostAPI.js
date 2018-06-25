const api = "http://localhost:3001"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic NDQyMWU3OGM4Zjk1NmE0ZTAyMTZjNjJmMjhiOTFkZmU6NjhlMTZmZjM5MDhiZTcxOWIzZGEwMjA4OTljMzM3ZTg='
}


export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())


export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())


export const postNew = (data) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res.json())

export const updatePost = (data, id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res.json())

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())


export const postNewComment = (data) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res.json())

export const updateComment = (data, id)=>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res.json())

export const votePOST = (id, data) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res)


export const voteCOMMENTS = (id, data) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
    }).then(res => res)

export const deleteComments = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res)