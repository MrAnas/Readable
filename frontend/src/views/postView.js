import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Button, List, Segment, Header, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import { deletePost, postNewComment, updateComment, votePOST, voteCOMMENTS, deleteComments } from '../APIs/BlogpostAPI';
import { postAction, commentAction } from '../actions';

class PostDetail extends Component{

    state = {
        home_redirect: false,
        addCommentMode: false,
        updateCommentMode: false,
        updateCommentObj : null,
        validation: false,
        commentFields_author: '',
        commentFields_comment: ''
    };

    commentDelete = (comment) => {

        const { allComments, addComments, blog } = this.props;

        deleteComments(comment.id).then((res) => {

            const deletedComment = allComments.filter(c => c.id !== comment.id);
            addComments({
                activityType: 'comments',
                content: deletedComment
            });

            let updatePost = blog.post.filter(p => p.id === blog.selectedId);
            updatePost[0].commentCount -= 1;
            let otherPosts = blog.post.filter(p => p.id !== blog.selectedId);
            otherPosts.push(updatePost[0]);

            postAction({
                activityType: 'post',
                content: otherPosts
            });


        });

    };

    commentUpdate = ( comment ) => {
        this.setState({ updateCommentMode: true, commentFields_author: comment.author, commentFields_comment: comment.body, updateCommentObj: comment  });
    };

    validator = () => {
        const { commentFields_author, commentFields_comment } = this.state;

        if(!commentFields_comment || commentFields_comment.trim() === "")
            return false;
        if(!commentFields_author || commentFields_author.trim() === "")
            return false;
        return true;

    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });


    commentSubmit = () => {

        if(this.validator()){
            const { commentFields_author, commentFields_comment, updateCommentObj, updateCommentMode } = this.state;
            const { blog, addComments, allComments } = this.props;

            let commentObj = null;
            if(updateCommentMode){
                commentObj = {
                    timestamp: Date.now(),
                    body: commentFields_comment
                }

                updateComment(commentObj, updateCommentObj.id).then((res) => {

                    console.log(res);
                    res.body = commentFields_comment;

                    const udpatedCommentList = allComments.filter(c => c.id !== updateCommentObj.id);
                    udpatedCommentList.push(res);

                    addComments({
                        activityType: 'comments',
                        content: udpatedCommentList
                    });

                    this.setState({ updateCommentMode: false, commentFields_author: '', commentFields_comment: '', updateCommentObj: null  });

                })
            }
            else{
                commentObj = {
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    body: commentFields_comment,
                    author: commentFields_author,
                    parentId: blog.selectedId
                }
                postNewComment(Object.assign({}, commentObj)).then((res) => {

                    for(var key in res){
                        if(res.hasOwnProperty(key)){
                            commentObj[key] = res[key];
                        }
                    };

                    allComments.push(commentObj);

                    addComments({
                        activityType: 'comments',
                        content: allComments
                    });

                    //update blog post object by incrementing the comment count.
                    let updatePost = blog.post.filter(p => p.id === blog.selectedId);
                    updatePost[0].commentCount += 1;
                    let otherPosts = blog.post.filter(p => p.id !== blog.selectedId);
                    otherPosts.push(updatePost[0]);


                    // let t = blog.post.map(post => {
                    //     if(post.id === blog.selectedId)
                    //         post.commentCount = post.commentCount + 1;
                    // });

                    postAction({
                        activityType: 'post',
                        content: otherPosts
                    });

                    this.setState({ addCommentMode: false, commentFields_author: '', commentFields_comment: ''  });

                });
            }


        }else{
            this.setState({ validation: false });
        }
    };

    convertEpochToDate = (epoch) => {
        return new Date(epoch).toDateString();
    };

    addCommentMode = () => {
        this.setState({ addCommentMode: true });
    };

    deletePostFunction = (e) => {
        const { blog, postAction, comment, addComments } = this.props;
        let temp = [];
        comment.map(p => {
            if(p.parentId === blog.selectedId)
                p.parentDeleted = true;
            temp.push(p);
        });

        addComments({
            activityType: 'comments',
            content: temp
        });

        deletePost(blog.selectedId).then((res) => {
            let p = blog.post.filter(p => p.id !== blog.selectedId);
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

    changeCommentVoteScore = (action, commentObject) => {
        let copy = Object.assign({}, commentObject);

        if(action === '-'){
            voteCOMMENTS(commentObject.id, "downVote").then((res) => {
                if(res.status === 200){
                    copy.voteScore -=  1;
                    this.updateCommentVote(copy);
                }
            })
        }
        else{
            voteCOMMENTS(commentObject.id, "upVote").then((res) => {
                if(res.status === 200){
                    copy.voteScore += 1;
                    this.updateCommentVote(copy);
                }
            })
        }
    };

    updateCommentVote = (copy) => {
        const { comment, addComments } = this.props;

        let p = comment.filter(p => p.id !== copy.id);
        p.push(copy);
        addComments({
            activityType: 'comments',
            content: p
        });
    };



    render(){

        let { blog, comment } = this.props;
        let post = (blog.selectedId) ? blog.post.filter(p => p.id === blog.selectedId) : [];
        console.log(post);
        const { home_redirect, addCommentMode, updateCommentMode, validation, commentFields_comment, commentFields_author } = this.state;

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Link to="/">
                                <Button icon floated='right'>
                                    <Icon name='arrow left' />
                                </Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={12}>

                            {post[0] && (
                                <Segment padded='very' style={{paddingBottom: "60px"}}>

                                    <Header textAlign='center' size='medium' color='blue'>{post[0].title}</Header>

                                    <List divided verticalAlign='middle'>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Author
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].author}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Category
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].category}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    VoteScore
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].voteScore}
                                                    <Button size='mini' onClick={this.changeVoteScore.bind(this, '+', post[0])} floated="right" color="olive">+</Button>
                                                    <Button size='mini' onClick={this.changeVoteScore.bind(this, '-', post[0])} floated="right" color="olive">-</Button>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Date/Time
                                                </List.Header>
                                                <List.Description>
                                                    {this.convertEpochToDate(post[0].timestamp)}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Content
                                                </List.Header>
                                                <List.Description>
                                                    {post[0].body}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                    </List>

                                    <Link to="/addNew/addNew/addNew">
                                        <Button primary floated='left' style={{marginTop: "10px"}}>Update</Button>
                                    </Link>
                                    <Button  onClick={this.deletePostFunction} color='red' floated='left' style={{marginTop: "10px"}}>Delete</Button>

                                </Segment>
                            )}

                            {post[0] && (
                                <Segment padded='very' style={{paddingBottom: "60px"}}>
                                    <Header size='medium' color='blue'> {post[0].commentCount} Comments</Header>

                                    { post[0].commentCount > 0 && (
                                        <Segment>
                                            <List divided verticalAlign='middle'>
                                                {
                                                    comment.map( c =>
                                                        <List.Item key={c.id}>
                                                            <List.Content>
                                                                <List.Header>
                                                                    author: {c.author}
                                                                </List.Header>
                                                                <List.Description>
                                                                    <List>
                                                                        <List.Item key={c.voteScore}>
                                                                            voteScore: {c.voteScore}
                                                                            <Button size='mini' onClick={this.changeCommentVoteScore.bind(this, '+', c)} floated="right" color="olive">+</Button>
                                                                            <Button size='mini' onClick={this.changeCommentVoteScore.bind(this, '-', c)} floated="right" color="olive">-</Button>
                                                                        </List.Item>
                                                                        <List.Item key={c.body}>
                                                                            Comments:: {c.body}
                                                                        </List.Item>
                                                                    </List>
                                                                    <Button size='mini' onClick={this.commentDelete.bind(this, c)} floated="left" color="google plus">Delete</Button>
                                                                    <Button size='mini' onClick={this.commentUpdate.bind(this, c)} floated="left" color="instagram">Update</Button>
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                    )
                                                }
                                            </List>
                                        </Segment>
                                    )}


                                    <Button primary onClick={this.addCommentMode} floated='left' style={{marginTop: "10px"}}>Add Comment</Button>

                                    { addCommentMode && (
                                        <Segment>
                                            <Form onSubmit={this.commentSubmit}>
                                                <Form.Field required>
                                                    <Form.Input label='author' placeholder='author' name='commentFields_author' value={commentFields_author} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Field required>
                                                    <Form.TextArea label='comment' placeholder='comment...' name='commentFields_comment' value={commentFields_comment} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Button>Submit</Form.Button>

                                                {
                                                    validation && (
                                                        <p>All fields must be filled!</p>
                                                    )
                                                }

                                            </Form>
                                        </Segment>
                                    )}

                                    { updateCommentMode && (
                                        <Segment>
                                            <Form onSubmit={this.commentSubmit}>
                                                <Form.Field disabled>
                                                    <Form.Input label='author' placeholder='author' name='commentFields_author' value={commentFields_author} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Field required>
                                                    <Form.TextArea label='comment' placeholder='comment...' name='commentFields_comment' value={commentFields_comment} onChange={this.handleChange}/>
                                                </Form.Field>
                                                <Form.Button>Submit</Form.Button>

                                                {
                                                    validation && (
                                                        <p>Field must be filled!</p>
                                                    )
                                                }

                                            </Form>
                                        </Segment>
                                    )}

                                </Segment>
                            )}

                            {!post[0] && (
                                <Segment padded='very'>
                                    <Header textAlign='center' size='medium' color='blue'>Blog is either deleted or doesn't exist.</Header>
                                </Segment>
                            )}

                            {home_redirect && (
                                <Redirect to="/"/>
                            )}


                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}



function mapStateToProps({blog, comment}){
    return{
        comment:(blog.selectedId) ? comment.comments.filter(c => c.parentId === blog.selectedId) : [],
        blog: blog,
        allComments: comment.comments
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) ),
        addComments: (data) => dispatch( commentAction(data) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);