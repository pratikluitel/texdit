import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import PostList from './PostListComponent'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state ={
            files:[]
        }
    }
    componentDidMount(){
        fetch('https://www.reddit.com/hot.json')
        .then(res=>res.json())      
        .then((data) => {
        this.setState({ files: data.data.children })
      })
    .catch('cannot load subreddit information')
    }
    render(){
        return(
            <ScrollView>
                <PostList files = {this.state.files}/>
            </ScrollView>
        )
    }
}