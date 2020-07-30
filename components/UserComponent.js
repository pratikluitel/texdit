import React, { Component } from 'react'
import PostList from './PostListComponent'
import { Loading } from './LoadingComponent'
import { fetchPosts } from '../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        posts: state.posts,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPosts: (subreddits) => dispatch(fetchPosts(subreddits)),
})

class User extends Component{

    componentDidMount(){
        const substring = this.props.route.params.subreddits[0]
        const subred = (this.props.route.params.subreddits.length !== 0? '/user/' : '')+substring
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

export default connect(mapStateToProps, mapDispatchToProps)(User);