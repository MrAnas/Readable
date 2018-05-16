import React from 'react';
import Comment from './Comment';

export default class Post extends React.Component {
    state = {title: "",author: "",body:"",date:"",vote:"",category:""}
    render(){
        return(
            <div>
                <h1>Title: {this.state.title}</h1>
                <h2>By: {this.state.author}</h2>
                
                <p>{this.state.body}</p>
                <p>Date: {this.state.date}</p>
                <p>Rating: {this.state.rate} / 5</p>
                <p>Category: {this.state.category}</p>
                <h3>Comments</h3>
                <Comment />
            </div>
        )
    }
}