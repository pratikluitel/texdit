import React, { Component } from 'react'
import PostList from './PostListComponent'
import { Loading } from './LoadingComponent'
import {baseurl} from '../shared/baseUrl'

class Home extends Component{

    static navigationOptions = {
        headerRight: ()=>(<Icon name='search' size={26}
            onPress={()=>{
                toggleModal()
            }}
            />)
    }

    constructor(props){
        super(props)
        this.state={
            posts: {
                isLoading: true,
                errMess: null,
                posts:[]
            }
        }
    }

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    componentDidMount(){
        this.mounted = true;
        const substring = this.props.route.params.subreddits.join('+')
        const subred = (this.props.route.params.subreddits.length !== 0? '/r/' : '/best')+substring
        fetch(baseurl + subred+'.json?limit=1000')
        .then(response => {
            if (response.ok) {
            return response
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error
            }
        },
        error => {
            var errmess = new Error(error.message)
            throw errmess
        })
        .then(response => response.json())
        .then(posts => {
            if (this.mounted) 
                this.setState({
                    ...this.state, 
                    posts:{ 
                        errMess:null, posts: posts, isLoading: false 
                    }
                })
        })
        .catch(error => {
            if (this.mounted) 
                this.setState({ 
                    ...this.state, 
                    posts:{
                        ...this.state.posts ,isLoading: false, errMess:error 
                    }
                })
        })
    }

    render(){
        return(
            this.state.posts.isLoading?
            <Loading/>:
            <PostList posts = {this.state.posts.posts} 
            navigation={this.props.navigation}/>
        )
    }

    componentWillUnmount(){
        this.mounted = false
    }
}

export default Home;