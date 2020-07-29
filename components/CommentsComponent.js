import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native"
import { Card, Icon } from 'react-native-elements'
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-display'
import { Loading } from './LoadingComponent'
import {fetchComments} from '../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        comments: state.comments,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchComments: (permalink) => dispatch(fetchComments(permalink)),
})

var n_reply=0;
var max_replies=2;

function RepliesList({files, n_reply}){
    n_reply=n_reply+1
    return(
        <>
            {files.map((file) => {
                return(
                <View key={file.data.name}
                    style={{marginLeft:n_reply*5}}>
                    {file.kind!='more'?
                        <>
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
                                file.data.replies !='' && n_reply<=max_replies?
                                <RepliesList files={file.data.replies.data.children} n_reply={n_reply}/>:null
                            }
                        </>
                    :null}
                </View>
            )
            })}
        </>
    )
}

function RenderComment({item, navigation}){
    n_reply = 0;
    return(
        <>
        {item.kind!='more'?
            <Card
                style={styles.comment}>
                <View style={styles.textComment}>
                    <Markdown>{item.data.body}</Markdown>
                </View>
                <View>
                    <Text style={{fontSize: 10, fontStyle:'italic', color:'#4c4c4c', textAlign:'right'}}>  {timeago(item.data.created_utc*1000)}</Text>
                </View>
                <View style={styles.statusRowComment}>
                    <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                    <Text style={{color:'gray'}}> {item.data.score} points</Text>
                    <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                    <Text style={{fontSize: 13, color: '#007aff', marginHorizontal:0}}>  u/{item.data.author}</Text>
                </View>
                {
                item.data.replies !=''?
                <RepliesList files={item.data.replies.data.children} n_reply={n_reply}/>:null
                }
                <View>
                    <Text style={{textAlign:'right', fontSize: 10}}>{item.data.replies !=''? item.data.replies.data.children.length: 0} replies</Text>
                </View>
            </Card>
        :null}
        </>
    )
}

function RenderPage({item, navigation}){  
    const image = item.data.dist!=null?
                    (typeof(item.data.children[0].data.preview) != 'undefined' ? 
                    item.data.children[0].data.preview.images[0].resolutions
                    [item.data.children[0].data.preview.images[0].resolutions.length-1]
                    :null):null
    return(
        <>
            {item.data.dist!=null?
                <>
                   {
                        typeof(item.data.children[0].data.preview) != 'undefined' ? (
                            <Card
                                title={item.data.children[0].data.title}
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
                                    height:image.height/image.width*(Dimensions.get('window').width-30),
                                    marginBottom:10
                                }}
                                key={item.data.children[0].data.name}
                            >
                                {item.data.children[0].data.selftext!=""?
                                <View style={styles.selfText}>
                                    <Markdown>{item.data.children[0].data.selftext}</Markdown>
                                </View>
                                : null }
                                <View>
                                    <Text style={{fontSize: 13,marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(item.data.children[0].data.created_utc*1000)}</Text>
                                </View>
                                <View style={styles.postInfo}>
                                    <Text style={{fontSize: 13, color: '#007aff'}}>{item.data.children[0].data.subreddit_name_prefixed}</Text>
                                    <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                                    <Text style={{fontSize: 13, color: '#007aff'}}>  u/{item.data.children[0].data.author}</Text>
                                </View>
                                <View style={styles.statusRow}>
                                    <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                                    <Text style={{color:'gray'}}> {item.data.children[0].data.score} points  </Text>
                                    <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}
                                        />
                                    <Text style={{color:'gray'}}
                                        > {item.data.children[0].data.num_comments} comments</Text>
                                </View>
                            </Card>):(
                            <Card
                            title={item.data.children[0].data.title}
                            titleStyle={{
                                marginHorizontal:0, 
                                textAlign:'left',
                                fontSize: 18,
                                marginBottom:10
                            }}
                            dividerStyle={{
                                marginBottom:5
                            }}
                            key={item.data.children[0].data.name}
                            >
                            {item.data.children[0].data.selftext!=""?
                            <View style={styles.selfText}>
                                <Markdown>{item.data.children[0].data.selftext}</Markdown>
                            </View>
                            : null }
                            <View>
                                <Text style={{fontSize: 13, marginBottom:8, color:'#4c4c4c', textAlign:'right'}}>  {timeago(item.data.children[0].data.created_utc*1000)}</Text>
                            </View>
                            <View style={styles.postInfo}>
                                <Text style={{fontSize: 13, color: '#007aff'}}>{item.data.children[0].data.subreddit_name_prefixed}</Text>
                                <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                                <Text style={{fontSize: 13, color: '#007aff'}}>  u/{item.data.children[0].data.author}</Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                                <Text style={{color:'gray'}}> {item.data.children[0].data.score} points  </Text>
                                <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}/>
                                <Text style={{color:'gray'}}> {item.data.children[0].data.num_comments} comments</Text>
                            </View>
                        </Card>
                        )
                    }
                </>
                :
                <>
                    {
                        item.data.children.length !=0?
                        <FlatList
                            data={item.data.children}
                            keyExtractor={item=>item.data.name}
                            renderItem={({item})=><RenderComment item={item} navigation={navigation}/>}
                        />
                        :null
                    }
                </>
            }
        </>
    )
}

class Comments extends Component{

    componentDidMount(){
        this.props.fetchComments(this.props.route.params.permalink)
    }

    render(){
        return( 
            this.props.comments.isLoading?<Loading/>:
            <FlatList
                data={this.props.comments.comments}
                renderItem={({item})=><RenderPage item={item}
                                        navigation={this.props.navigation}/>}
                keyExtractor={item=>{
                   return( String(item.data.dist==null))
                }}/>
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