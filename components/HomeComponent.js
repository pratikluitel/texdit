import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import PostList from './PostListComponent'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state ={
            subreddits:[],
            files:[]
        }
    }

    componentDidMount(){
        const substring = this.state.subreddits.join('+')
        const subred = (this.state.subreddits.length !== 0? 'r/' : 'best')+substring
        fetch('https://www.reddit.com/'+subred+'.json')
        .then(res=>res.json())      
        .then((data) => {
        this.setState({ files: data.data.children })
      })
    .catch('cannot load subreddit information')
    }
    render(){
        return(
            <ScrollView>
                <PostList files = {this.state.files} 
                navigation={this.props.navigation}/>
            </ScrollView>
        )
    }
}