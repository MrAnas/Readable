import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';
import ComponentList from '../subComponents/component_list.js';
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { LIST_TYPE_CATEGORY } from '../utils/ConstantTypes.js'


class CategoryList extends Component{


    render(){

        const { category } = this.props;

        let titleDisplay = (category.selectedName === null)? 'Category Type Not Selected': `Category Type: ${category.selectedName} Posts`;

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ComponentList title={titleDisplay} listType={LIST_TYPE_CATEGORY}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Link to="/">
                            <Button icon floated='left'>
                                <Icon name='arrow left' />
                            </Button>
                        </Link>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}


function mapStateToProps({category}){
    return{
        category: category
    }
}


export default connect(mapStateToProps)(CategoryList);