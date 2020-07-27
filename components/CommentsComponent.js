import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Card, Icon } from 'react-native-elements'
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-display'
import { Loading } from './LoadingComponent'
import {fetchComments} from '../redux/ActionCreators'
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler'

const mapStateToProps = state => {
    return {
        comments: state.comments,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchComments: (permalink) => dispatch(fetchComments(permalink)),
})

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
                        <Markdown>{file.data.body}</Markdown>
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
                        <Markdown>{file.data.body}</Markdown>
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

function RenderPage({item}){  
    const post = item.data.dist!=null?item.data.children[0].data:null
    const image = item.data.dist!=null?
                    (typeof(post.preview) != 'undefined' ? 
                        post.preview.images[0].resolutions[post.preview.images[0].resolutions.length-1]
                    :null):null
    const innerWidth = item.data.dist!=null?Dimensions.get('window').width:null
    return(
        <>
            {item.data.dist!=null?
                <>
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
                                    <Markdown>{post.selftext}</Markdown>
                                </View>
                                : null }
                                <View>
                                    <Text style={{fontSize: 13,marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(post.created_utc*1000)}</Text>
                                </View>
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
                                <Markdown>{post.selftext}</Markdown>
                            </View>
                            : null }
                            <View>
                                <Text style={{fontSize: 13, marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(post.created_utc*1000)}</Text>
                            </View>
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
                    {/* {this.props.comments.isLoading?<Loading/>:
                        <>
                            {
                            this.props.comments.comments[1].data.children.length !=0?
                            <CommentList files = {this.props.comments.comments[1].data.children} 
                                navigation={this.props.navigation}/>
                                :null
                            }
                        </>
                    } */}
                </>
                :
                <></>
            }
        </>
    )
}

class Comments extends Component{

    componentDidMount(){
        this.props.fetchComments(this.props.route.params.file.permalink)
    }

    render(){

        
        return( 
            <FlatList
                data={this.props.comments.comments}
                renderItem={({item})=><RenderPage item={item}/>}
                keyExtractor={item=>{
                   return( String(item.data.dist==null))
                }}/>
            
                // <ScrollView>
                //     {
                //         typeof(post.preview) != 'undefined' ? (
                //             <Card
                //                 title={post.title}
                //                 titleStyle={{
                //                     marginHorizontal:15, 
                //                     textAlign:'left',
                //                     fontSize: 18,
                //                     marginBottom:10
                //                 }}
                //                 dividerStyle={{
                //                     marginBottom:5
                //                 }}
                //                 image={{
                //                     uri: image.url.replace(/&amp;/g,'&')
                //                 }}
                //                 imageStyle={{
                //                     resizeMode:'cover',
                //                     width: '100%',
                //                     height:image.height/image.width*(innerWidth-30),
                //                     marginBottom:10
                //                 }}
                //                 key={post.name}
                //             >
                //                 {post.selftext!=""?
                //                 <View style={styles.selfText}>
                //                     <Markdown>{post.selftext}</Markdown>
                //                 </View>
                //                 : null }
                //                 <View>
                //                     <Text style={{fontSize: 13,marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(post.created_utc*1000)}</Text>
                //                 </View>
                //                 <View style={styles.postInfo}>
                //                     <Text style={{fontSize: 13, color: '#007aff'}}>{post.subreddit_name_prefixed}</Text>
                //                     <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                //                     <Text style={{fontSize: 13, color: '#007aff'}}>  u/{post.author}</Text>
                //                 </View>
                //                 <View style={styles.statusRow}>
                //                     <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                //                     <Text style={{color:'gray'}}> {post.score} points  </Text>
                //                     <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}
                //                         />
                //                     <Text style={{color:'gray'}}
                //                         > {post.num_comments} comments</Text>
                //                 </View>
                //             </Card>):(
                //             <Card
                //             title={post.title}
                //             titleStyle={{
                //                 marginHorizontal:0, 
                //                 textAlign:'left',
                //                 fontSize: 18,
                //                 marginBottom:10
                //             }}
                //             dividerStyle={{
                //                 marginBottom:5
                //             }}
                //             key={post.name}
                //             >
                //             {post.selftext!=""?
                //             <View style={styles.selfText}>
                //                 <Markdown>{post.selftext}</Markdown>
                //             </View>
                //             : null }
                //             <View>
                //                 <Text style={{fontSize: 13, marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(post.created_utc*1000)}</Text>
                //             </View>
                //             <View style={styles.postInfo}>
                //                 <Text style={{fontSize: 13, color: '#007aff'}}>{post.subreddit_name_prefixed}</Text>
                //                 <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                //                 <Text style={{fontSize: 13, color: '#007aff'}}>  u/{post.author}</Text>
                //             </View>
                //             <View style={styles.statusRow}>
                //                 <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                //                 <Text style={{color:'gray'}}> {post.score} points  </Text>
                //                 <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}/>
                //                 <Text style={{color:'gray'}}> {post.num_comments} comments</Text>
                //             </View>
                //         </Card>
                //         )
                //     }
                //     {this.props.comments.isLoading?<Loading/>:
                //         <>
                //             {
                //             this.props.comments.comments[1].data.children.length !=0?
                //             <CommentList files = {this.props.comments.comments[1].data.children} 
                //                 navigation={this.props.navigation}/>
                //                 :null
                //             }
                //         </>
                //     }
                // </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);