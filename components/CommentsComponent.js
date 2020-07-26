import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card, Icon } from 'react-native-elements';
import timeago from 'epoch-timeago'

var n_reply=0;

function RepliesList({files, n_reply}){
    n_reply=n_reply+1
    files.pop()
    return(
        <>
            {files.map((file) => (
                <View
                key={file.data.name}
                style={{marginLeft:n_reply*5}}>
                    <View style={styles.textComment}>
                        <Text style={{ marginHorizontal:0, color:'#4c4c4c'}}>{file.data.body}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 10, fontStyle:'italic', color:'#4c4c4c', textAlign:'right'}}>  {timeago(file.data.created_utc*1000)}</Text>
                    </View>
                    <View style={styles.statusRowComment}>
                        <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                        <Text style={{color:'gray'}}> {file.data.score} points</Text>
                        <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                        {file.data.replies !=''?<Text style={{fontSize: 13, color: '#007aff', marginHorizontal:0}}>  u/{file.data.author}</Text>
                        :<Text style={{fontSize: 13, color: '#007aff'}}>  u/{file.data.author}</Text>}
                    </View>
                    {
                    file.data.replies !='' && n_reply<=5?
                    <RepliesList files={file.data.replies.data.children} n_reply={n_reply}/>:null
                    }
                </View>
            ))}
        </>
    )
}

function CommentList({files}){
    files.pop()
    return(
        <>
            {
            files.map((file) =>{ n_reply = 0; 
                return(
                <Card
                key={file.data.name}
                style={styles.comment}>
                    <View style={styles.textComment}>
                        <Text style={{ marginHorizontal:0, color:'#4c4c4c'}}>{file.data.body}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 10, fontStyle:'italic', color:'#4c4c4c', textAlign:'right'}}>  {timeago(file.data.created_utc*1000)}</Text>
                    </View>
                    <View style={styles.statusRowComment}>
                        <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                        <Text style={{color:'gray'}}> {file.data.score} points</Text>
                        <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                        <Text style={{fontSize: 13, color: '#007aff', marginHorizontal:0}}>  u/{file.data.author}</Text>
                    </View>
                    {
                    file.data.replies !=''?
                    <RepliesList files={file.data.replies.data.children} n_reply={n_reply}/>:null
                    }
                    <View>
                        <Text style={{textAlign:'right', fontSize: 10}}>{file.data.replies !=''? file.data.replies.data.children.length: 0} replies</Text>
                    </View>
                </Card>
            )})}
        </>
    )
}

export default class Comments extends Component{

    constructor(props){
        super(props);
        this.state = {
            files:[],
            permalink:''
        }
    }

    componentDidMount(){
        fetch('https://www.reddit.com'+this.props.route.params.file.permalink+'.json')
        .then(res=>res.json())      
        .then((data) => {
        this.setState({ files: data[1].data.children })
      })
    .catch('cannot load comments')
    }

    render(){
        const post = this.props.route.params.file
        const image = typeof(post.preview) != 'undefined' ? post.preview.images[0].resolutions[post.preview.images[0].resolutions.length-1]:null
        const innerWidth = Dimensions.get('window').width ;
        return( <ScrollView>
                    {
                        typeof(post.preview) != 'undefined' ? (
                            <Card
                                title={post.title}
                                titleStyle={{
                                    marginHorizontal:15, 
                                    textAlign:'left',
                                    fontSize: 18,
                                    marginBottom:10
                                }}
                                dividerStyle={{
                                    marginBottom:5
                                }}
                                image={{
                                    uri: image.url.replace(/&amp;/g,'&')
                                }}
                                imageStyle={{
                                    resizeMode:'cover',
                                    width: '100%',
                                    height:image.height/image.width*(innerWidth-30),
                                    marginBottom:10
                                }}
                                key={post.name}
                            >
                                {post.selftext!=""?
                                <View style={styles.selfText}>
                                    <Text style={{ marginHorizontal:10, color:'#4c4c4c'}}>{post.selftext}</Text>
                                </View>
                                : null }
                                <View style={styles.postInfo}>
                                    <Text style={{fontSize: 13, color: '#007aff'}}>{post.subreddit_name_prefixed}</Text>
                                    <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                                    <Text style={{fontSize: 13, color: '#007aff'}}>  u/{post.author}</Text>
                                </View>
                                <View style={styles.statusRow}>
                                    <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                                    <Text style={{color:'gray'}}> {post.score} points  </Text>
                                    <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}
                                        />
                                    <Text style={{color:'gray'}}
                                        > {post.num_comments} comments</Text>
                                </View>
                            </Card>):(
                            <Card
                            title={post.title}
                            titleStyle={{
                                marginHorizontal:0, 
                                textAlign:'left',
                                fontSize: 18,
                                marginBottom:10
                            }}
                            dividerStyle={{
                                marginBottom:5
                            }}
                            key={post.name}
                            >
                            {post.selftext!=""?
                            <View style={styles.selfText}>
                                <Text style={{ marginHorizontal:10, color:'#4c4c4c'}}>{post.selftext}</Text>
                            </View>
                            : null }
                            <View style={styles.postInfo}>
                                <Text style={{fontSize: 13, color: '#007aff'}}>{post.subreddit_name_prefixed}</Text>
                                <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                                <Text style={{fontSize: 13, color: '#007aff'}}>  u/{post.author}</Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                                <Text style={{color:'gray'}}> {post.score} points  </Text>
                                <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}/>
                                <Text style={{color:'gray'}}> {post.num_comments} comments</Text>
                            </View>
                        </Card>
                        )

                    }
                    {
                    this.state.files.length !=0?
                    <CommentList files = {this.state.files} 
                        navigation={this.props.navigation}/>:null
                    }
                </ScrollView>
        )
            }
}

const styles = StyleSheet.create({
    card:{
        
    },
    selfText:{
        borderBottomColor: '#c5d2e0',
        borderBottomWidth: 1, 
        paddingVertical:10,
        marginBottom:10
    },
    textComment:{
        paddingBottom:8
    },
    statusRow:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center'
    },
    statusRowComment:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center',
        borderBottomColor: '#c5d2e0',
        borderBottomWidth: 1,
        marginVertical: 8,
        paddingBottom:8
    },
    postInfo:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 5
    },
    comment:{
        marginLeft:20
    }
})