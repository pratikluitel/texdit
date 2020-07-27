import React, {Component} from 'react'
import PostList from './PostListComponent'
import {Loading } from './LoadingComponent'
import {fetchPosts} from '../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        posts: state.posts,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPosts: (subreddits) => dispatch(fetchPosts(subreddits)),
})

class Home extends Component{

    constructor(props){
        super(props)
        this.state ={
            subreddits:['cricket']
        }
    }

    componentDidMount(){
        const substring = this.state.subreddits.join('+')
        const subred = (this.state.subreddits.length !== 0? '/r/' : '/best')+substring
        this.props.fetchPosts(subred)
    }

    render(){
        return(
            this.props.posts.isLoading?
            <Loading/>:
            <PostList posts = {this.props.posts.posts} 
            navigation={this.props.navigation}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);