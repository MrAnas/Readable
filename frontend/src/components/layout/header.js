import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {FETCH_CATEGORIES} from '../../store/types'
class Header extends Component{

    componentDidMount(){
    this.props.fetchCategories;
}

    render(){
        return(
            <div>
            {console.log(this.props.categories)}
<header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
          </div>
          <div className="col-4 text-center">
            <a className="blog-header-logo text-dark" href="#">Blogging About Redux</a>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="text-muted" href="#">
            </a>

          </div>
        </div>
        </header>
                <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
            {this.props.categories.map(category =>(
                <a className="p-2 text-muted" href="#">{category.name}</a>
            ))}
        </nav>
      </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
  })
  
  const mapDispatchToProps = (dispatch) => ({
      fetchCategories: dispatch({type:FETCH_CATEGORIES ,payload: axios({method:'get',headers:{"Authorization":"Anas"},url:'http://localhost:3001/categories'})}),
  })


export default connect(mapStateToProps,mapDispatchToProps)(Header)