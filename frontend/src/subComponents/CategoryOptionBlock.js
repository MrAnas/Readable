import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { categoryAction } from '../actions'



class CategoryOptionBlock extends Component{


    selectCategoryMethod = (value) => {
        this.props.selectCategory({
            activityType:'selectedName',
            content:  value
        })
    };

    render(){

       // const { categoryList, updateCurrentlySeletedCategory, getCurrentlySeletedCategory } = this.props;

        const { category } = this.props;

        return(
            <Segment padded='very' style={{paddingBottom: "60px"}}>
                <Header textAlign='center' size='medium' color='teal'>Display by Category</Header>
                <Dropdown placeholder='Category' fluid search selection options={category.categoryTypes} value={category.selectedName}
                          onChange={(e, { value }) => {this.selectCategoryMethod(value)}}/>

                <Link to={`/${category.selectedName}`}>
                    <Button primary floated='right' style={{marginTop: "10px"}}>Apply</Button>
                </Link>
            </Segment>

        )
    }
}

function mapStateToProps({category}){
    return{
        category: category
    }
}

function mapDispatchToProps(dispatch){
    return {
        selectCategory: (data) => dispatch( categoryAction(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionBlock);
