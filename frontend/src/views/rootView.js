import React, { Component } from 'react';
import ComponentList from '../subComponents/component_list.js'
import CategoryOptionBlock from '../subComponents/CategoryOptionBlock.js'
import { Grid } from 'semantic-ui-react'
import { LIST_TYPE_ALL } from '../utils/ConstantTypes.js'
import { connect } from 'react-redux'
import { postAction } from '../actions'

class MainList extends Component{


    componentDidMount(){
        this.init();
    }

    init = () => {
        const { postAction } = this.props;
        postAction({
            activityType: 'selectedId',
            content: null
        });
    }

    render(){

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ComponentList title={"All Posts"} listType={LIST_TYPE_ALL}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}>
                            <CategoryOptionBlock />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        postAction: (data) => dispatch( postAction(data) )
    }
}

export default connect(null, mapDispatchToProps) (MainList);