import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, List, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { LIST_TYPE_CATEGORY, LIST_TYPE_ALL, SORT_TYPE_VOTE_SCORE, SORT_TYPE_TIMESTAMP } from '../utils/ConstantTypes.js'
import { getComments, votePOST, deletePost } from "../APIs/BlogpostAPI";
import { postAction, commentAction } from '../actions'
import { Grid, Dropdown } from 'semantic-ui-react'

class ComponentList extends Component{

    convertEpochToDate = (epoch) => {
        return new Date(epoch).toDateString();
    }

    resetSelectedId = () => {
        const { postAction } = this.props;

        postAction({
            activityType: 'selectedId',
            content: null
        });
    }

    updateSelectedPOSTid = (post) => {
        const { postAction } = this.props;

        postAction({
            activityType: 'selectedId',
            content: post.id
        });
    }

    getPostList = (blog, listType, category) => {

        switch(listType) {
            case LIST_TYPE_CATEGORY:
                return blog.post.filter(post => post.category === category.selectedName).filter(post => post.deleted === false);
            default:
                return blog.post.filter(post => post.deleted === false);

        }
    };

    deletePostFunction = (id) => {
        const { blog, postAction, comment, addComments } = this.props;
        let temp = [];
        comment.map(p => {
            if(p.parentId === id)
                p.parentDeleted = true;
            temp.push(p);
        });

        addComments({
            activityType: 'comments',
            content: temp
        });

        console.log(id);

        deletePost(id).then((res) => {
            let p = blog.post.filter(p => p.id !== id);
            postAction({
                activityType: 'post',
                content: p
            });
        });
        this.setState({ home_redirect: true });

    };

    changeVoteScore = (action, postObject) => {

        let copy = Object.assign({}, postObject);
        if(action === '-'){
            votePOST(postObject.id, "downVote").then((res) => {
                if(res.status === 200){
                    copy.voteScore -=  1;
                    this.updateVote(copy);
                }
            })
        }
        else{
            votePOST(postObject.id, "upVote").then((res) => {
                if(res.status === 200){
                    copy.voteScore += 1;
                    this.updateVote(copy);
                }
            })
        }
    };

    updateVote = (copyPost) => {
        const { blog, postAction } = this.props;

        let p = blog.post.filter(p => p.id !== copyPost.id);
        p.push(copyPost);
        postAction({
            activityType: 'post',
            content: p
        });
    };

    handleClick = (post, event) => {
        const { postAction } = this.props;

        postAction({
            activityType: 'selectedId',
            content: post.id
        });

        this.callCommentsAPI(post.id);
    };

    callCommentsAPI(id){
        let { addComments, existingComment } = this.props;
        //let tempComment = existingComment;
        getComments(id).then((newComments) => {

            newComments.map(c => {
                existingComment = existingComment.filter(eComment => eComment.id !== c.id)
                existingComment.push(c);
            });

            addComments({
                activityType: 'comments',
                content: existingComment
            });
        })
    };

    sortBy = (value)=> {
        const { postAction, blog } = this.props;

        switch(value){
            case SORT_TYPE_VOTE_SCORE:
                postAction({
                    activityType: 'post',
                    content: blog.post.sort((a,b) => b.voteScore - a.voteScore)
                });
                break;
            case SORT_TYPE_TIMESTAMP:
                postAction({
                    activityType: 'post',
                    content: blog.post.sort((a,b) => b.timestamp - a.timestamp)
                });
                break;
            default:


        }
    };

    render(){

        const { blog, category, title, listType } = this.props;
        const sortyByList = [{text: SORT_TYPE_VOTE_SCORE, value:SORT_TYPE_VOTE_SCORE}, {text:SORT_TYPE_TIMESTAMP, value: SORT_TYPE_TIMESTAMP}];

        return(

            <Segment padded='very' style={{paddingBottom: "60px"}}>
                <Header textAlign='center' size='medium' color='blue'>{title}</Header>
                <List selection divided verticalAlign='middle'>

                    {
                        this.getPostList(blog, listType, category).map(post =>

                            <List.Item key={post.id} value={post.id} onClick={this.updateSelectedPOSTid.bind(this, post)}>
                                <List.Content>
                                    <List.Header>
                                        Title: {post.title}
                                    </List.Header>
                                    <List.Description>
                                        <List>
                                            <List.Item key={post.author}>
                                                Author: {post.author}
                                            </List.Item>
                                            <List.Item key={post.commentCount}>
                                                Comment Count: {post.commentCount}
                                            </List.Item>
                                            <List.Item key={post.category}>
                                                Category: {post.category}
                                            </List.Item>
                                            <List.Item key={post.timestamp}>
                                                Timestamp: { this.convertEpochToDate(post.timestamp)}
                                            </List.Item>
                                            <List.Item key={post.voteScore}>
                                                Vote Score: {post.voteScore}
                                                <Button size='mini' onClick={this.changeVoteScore.bind(this, '+', post)} floated="right" color="olive">+</Button>
                                                <Button size='mini' onClick={this.changeVoteScore.bind(this, '-', post)} floated="right" color="olive">-</Button>
                                            </List.Item>
                                            <List.Item>
                                                <Link to={`/${post.category}/${post.id}`}>
                                                    <Button onClick={this.handleClick.bind(this, post)} color='grey' floated='left' style={{marginTop: "10px"}}>Detail</Button>
                                                </Link>
                                                <Link to="/addNew/addNew/addNew">
                                                    <Button primary floated='left' style={{marginTop: "10px"}}>Update</Button>
                                                </Link>
                                                <Button  onClick={this.deletePostFunction.bind(this, post.id)} color='red' floated='left' style={{marginTop: "10px"}}>Delete</Button>
                                            </List.Item>
                                        </List>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    }

                </List>

                <Dropdown placeholder='Sort By' fluid search selection options={sortyByList}
                          onChange={(e, { value }) => {this.sortBy(value)}}/>

                <Link to="/addNew/addNew/addNew">
                    <Button onClick={this.resetSelectedId.bind(this)} primary floated='left' style={{marginTop: "10px"}}>Add New</Button>
                </Link>

            </Segment>



        )
    }
}

function mapStateToProps({blog, category, comment}){
    return{
        blog: blog,
        category: category,
        existingComment: comment.comments,
        comment:(blog.selectedId) ? comment.comments.filter(c => c.parentId === blog.selectedId) : [],
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) ),
        addComments: (data) => dispatch( commentAction(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
