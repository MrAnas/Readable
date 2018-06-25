import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Button, Form, Segment, Header } from 'semantic-ui-react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postNew, updatePost } from '../APIs/BlogpostAPI';
import { postAction } from '../actions'

class AddNew extends Component{

    state = {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: '',
        voteScore:1,
        deleted: false,
        commentCount: 0,
        home_redirect: false,
        validation: true
    };

    componentDidMount(){

        const { blog } = this.props;

        if(blog.selectedId !== null){
            let p = blog.post.filter(p => p.id === blog.selectedId);

            this.setState({ title:  p[0].title, body: p[0].body, author: p[0].author, category: p[0].category, id: p[0].id,
                            voteScore: p[0].voteScore, deleted: p[0].deleted, commentCount: p[0].commentCount});
        }


    }

    validator = () => {
        const { title, body, author, category } = this.state;

        if(!title || title.trim() === "")
            return false;
        if(!body || body.trim() === "")
            return false;
        if(!author || author.trim() === "")
            return false;
        if(!category || category.trim() === "")
            return false;
        return true;

    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {

        if(this.validator()){
            const { title, body, author, category, id, voteScore, commentCount, deleted } = this.state;
            const { postAction, blog } = this.props;

            if(blog.selectedId === null){

                let obj = {
                    title: title,
                    body: body,
                    author: author,
                    category: category,
                    timestamp: Date.now(),
                    id: Date.now().toString()
                };

                postNew(obj).then((res) => {

                    for(var key in res){
                        if(res.hasOwnProperty(key)){
                            obj[key] = res[key];
                        }
                    }

                    blog.post.push(obj);

                    postAction({
                        activityType: 'post',
                        content: blog.post
                    })

                    //this.setState({});

                });
            }
            else{

                let obj = {
                    title: title,
                    body: body,
                    author: author,
                    category: category,
                    timestamp: Date.now(),
                    id: id,
                    voteScore: voteScore,
                    commentCount: commentCount,
                    deleted:deleted
                };


                updatePost(obj, blog.selectedId).then((res) => {
                    let updatedPosts = blog.post.filter(p => p.id !== blog.selectedId);
                    updatedPosts.push(obj);
                    postAction({
                        activityType: 'post',
                        content: updatedPosts
                    });
                });
            }

            this.setState({ home_redirect: true });
        }
        else{
            this.setState({ validation: false });
        }



    }

    render(){

        const { reduxCategory, blog } = this.props;
        const { title, body, author, category, home_redirect, validation } = this.state;

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
                            <Segment padded='very'>

                                <Header textAlign='center' size='medium' color='blue'>Add New</Header>
                                <Form onSubmit={this.handleSubmit}>


                                    <Form.Field required>
                                        <label>Title</label>
                                        <Form.Input placeholder='Title' name='title' value={title} onChange={this.handleChange} />
                                    </Form.Field>

                                    {blog.selectedId === null && (
                                        <Form.Field required>
                                            <label>Author</label>
                                            <Form.Input placeholder='author' name='author' value={author} onChange={this.handleChange}/>
                                        </Form.Field>
                                    )}

                                    {blog.selectedId === null && (
                                        <Form.Field required>
                                            <Form.Select label='Category' options={reduxCategory.categoryTypes} placeholder='Category' name='category' value={category} onChange={this.handleChange}/>
                                        </Form.Field>
                                    )}

                                    <Form.Field required>
                                        <Form.TextArea label='Body' placeholder='body...' name='body' value={body} onChange={this.handleChange}/>
                                    </Form.Field>

                                    <Form.Button>Submit</Form.Button>
                                    {
                                        !validation && (
                                            <p>All fields must be filled!</p>
                                        )
                                    }
                                </Form>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {home_redirect && (
                    <Redirect to="/"/>
                )}

            </div>
        )
    }
}

function mapStateToProps({blog,category}){
    return{
        blog: blog,
        reduxCategory: category
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNew));
