import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar,Menu, Icon } from 'semantic-ui-react'

class TopBar extends Component {

    render() {


        return (
            <div>
                <Sidebar as={Menu} animation='scale down' direction='top' visible={true} inverted>
                    <Menu.Item name='home'>
                        <Icon name='home' />
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </Sidebar>
            </div>

        )

    }
}

export default TopBar