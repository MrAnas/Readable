import React, { Component } from 'react';
import {FETCH_POSTS} from './store/types'
import {connect} from 'react-redux'
import Header from './components/layout/header'
import axios from 'axios'
import {timestampToDate} from './util';

class App extends Component {

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = "Anas";
    this.props.fetchPost;
  }

  render() {
    let posts = this.props.posts;
    return (
      <div>
      <div className="App container">
      <Header/>

        
      <div className="container">
        <div className="card">
          <div className="card-heading">
            <h4 className="card-title">Posts List </h4>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>View</th>  
            </thead>
            <tbody>
              {this.props.posts.map((post,index)=>(
                <tr>
                    
                <td>{index}</td>
                <td>{post.title}</td>
                <td>{timestampToDate(post.timestamp)}</td>
                <td><button className="btn btn-primary">View</button></td>
                </tr>

              ))}
            </tbody>
          </table>
          
        </div>
      </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  posts: state.posts
})

const mapDispatchToProps = (dispatch) => ({
    fetchPost: dispatch({type:FETCH_POSTS ,payload: axios({method:'get',headers:{"Authorization":"Anas"},url:'http://localhost:3001/posts'})})
})
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
