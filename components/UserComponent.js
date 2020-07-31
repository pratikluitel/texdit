import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import PostList from './PostListComponent'
import { Loading } from './LoadingComponent'
import { baseurl } from '../shared/baseUrl'

class User extends Component{

    constructor(props){
        super(props)
        this.state = {
            user:'',
            modalVisible: false,
            posts: {
                isLoading: true,
                errMess: null,
                posts:[]
            }
        }
    }

    toggleModal = () => {
        this.setState({ ...this.state, modalVisible: !this.state.modalVisible });
    }

    componentDidMount(){ 
        this.props.navigation.setOptions({
            headerTitle: this.state.user.length == 0?'User':'u/'+this.state.user,
            headerRight: ()=>(<Icon name='search' size={26}
                onPress={()=>{
                    this.toggleModal()
                }}
            />),
            headerRightContainerStyle:{
                padding: 13
            }
        })
        const substring = this.state.user
        const user = (this.state.user.length !== 0? '/user/' : '')+substring
        fetch(baseurl + user+'.json?limit=1000')
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
                this.setState({ ...this.state, 
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

export default User;