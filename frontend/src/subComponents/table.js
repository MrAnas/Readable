import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import CtableRow from './component_list.js'


class TablePosts extends Component{

    render(){

        const { postList, columns } = this.props;



        return(
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                columns.map(column =>
                                    <TableHeaderColumn key={column.col}>{column.col}</TableHeaderColumn>
                                )
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            postList.map(post =>
                                <div key={post.id}>
                                    {
                                        columns.map(column =>
                                            <TableRowColumn>
                                                {post[column]}
                                            </TableRowColumn>
                                        )
                                    }
                                </div>

                            )
                        }
                    </TableBody>
                </Table>
            </div>

        )
    }
}

export default TablePosts