import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import CategoryList from './views/categoryView.js';
import AddNew from './views/addNew.js';
import PostDetail from './views/postView.js';
import MainList from './views/rootView.js';
import * as BlogPostAPI from './APIs/BlogpostAPI';
import TopBar from './views/topMenuBar';
import { postAction, categoryAction, commentAction } from './actions'
import { connect } from 'react-redux';
import { callCommentsAPI } from './subComponents/component_list.js'


class App extends Component {

    componentDidMount(){

        const { addPost, selectCategory, location, addComments } = this.props;
        let { existingComment } = this. props;

        const paths = location.pathname.split('/').filter( p => p.length > 0 );

        BlogPostAPI.getAllPosts().then((posts) => {

            addPost({
                activityType: 'post',
                content: posts
            });

        });

        BlogPostAPI.getCategories().then((categories) => {
            categories.categories.map(cat => cat.text = cat.name);
            categories.categories.map(cat => cat.value = cat.name);
            selectCategory({
                activityType:'categoryTypes',
                content:  categories.categories
            })

        });

        if(paths.length === 2){

            console.log(paths);

            //get current POST
            addPost({
                activityType: 'selectedId',
                content: paths[1]
            });

            //get POST's comments
            BlogPostAPI.getComments(paths[1]).then((newComments) => {

                newComments.map(c => {
                    existingComment = existingComment.filter(eComment => eComment.id !== c.id)
                    existingComment.push(c);
                });

                addComments({
                    activityType: 'comments',
                    content: existingComment
                });
            });

        }
        else if(paths.length === 1 ){

            selectCategory({
                activityType:'selectedName',
                content:  paths[0]
            });

        }

    };

    render() {

    return (
        <div className="App">

            <header>
                <TopBar/>
            </header>

            <div id="content-wrapper" className="mui--text-center">
                <Route exact path="/" render={( { history }) => (
                    <MainList />
                )}/>
                <Route exact path="/addNew/addNew/addNew"  render={( { history } ) => (
                    <AddNew />
                )}/>

                <Route exact path="/:category" render={( { history } ) => (
                    <CategoryList />
                )}/>

                <Route exact path="/:category/:post_id" render={( { history } ) => (
                    <PostDetail />
                )}/>

            </div>

        </div>


    );
    }
}

function mapStateToProps({blog,category, comment}){
    return{
        blog: blog,
        category: category,
        existingComment: comment.comments
    }
}

function mapDispatchToProps(dispatch){
    return {
        addPost: (data) => dispatch( postAction(data) ),
        selectCategory: (data) => dispatch( categoryAction(data) ),
        addComments: (data) => dispatch( commentAction(data) )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
