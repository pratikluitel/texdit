import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Icon } from 'react-native-elements';
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-renderer';

export default function PostList ({posts, navigation}){
    files = posts.data.children
    return (
        <>
            {files.map((file) => (
                <TouchableOpacity
                onPress={()=>{navigation.push('Comments',{file: file.data})}}
                key={file.data.name}>
                {
                !file.data.is_self ? (
                <Card
                    title={file.data.title}
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
                        uri:file.data.thumbnail
                    }}
                    imageStyle={{
                        height:file.data.thumbnail_height,
                        marginBottom:10
                    }}
                >
                    {file.data.selftext!=""?
                    <View style={styles.selfText}>
                        <Markdown>{file.data.selftext}</Markdown>
                    </View>
                    : null }
                    <View style={{marginBottom:5}}>
                        <Text style={{fontSize: 13, color:'#4c4c4c', textAlign:'right'}}>  {timeago(file.data.created_utc*1000)}</Text>
                    </View>
                    <View style={styles.postInfo}>
                        <Text style={{fontSize: 13, color: '#007aff'}}>{file.data.subreddit_name_prefixed}</Text>
                        <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                        <Text style={{fontSize: 13, color: '#007aff'}}>  u/{file.data.author}</Text>                    
                    </View>
                    <View style={styles.statusRow}>
                        <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                        <Text style={{color:'gray'}}> {file.data.score} points  </Text>
                        <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}
                            />
                        <Text style={{color:'gray'}}
                            > {file.data.num_comments} comments</Text>
                    </View>
                </Card>):(
                <Card
                    title={file.data.title}
                    titleStyle={{
                        marginHorizontal:0, 
                        textAlign:'left',
                        fontSize: 18,
                        marginBottom:10
                    }}
                    dividerStyle={{
                        marginBottom:5
                    }}
                >
                {file.data.selftext!=""?
                <View style={styles.selfText}>
                    <Markdown>{file.data.selftext}</Markdown>
                </View>
                : null }
                <View style={{marginBottom:5}}>
                    <Text style={{fontSize: 13, color:'#4c4c4c', textAlign:'right'}}>  {timeago(file.data.created_utc*1000)}</Text>
                </View>
                <View style={styles.postInfo}>
                    <Text style={{fontSize: 13, color: '#007aff'}}>{file.data.subreddit_name_prefixed}</Text>
                    <Text style={{fontSize: 13, color:'#4c4c4c'}}>  •</Text>
                    <Text style={{fontSize: 13, color: '#007aff'}}>  u/{file.data.author}</Text>
                </View>
                <View style={styles.statusRow}>
                    <Icon name='arrow-up' type='feather' size={15} color='gray' style={{textAlign:'left'}}/>
                    <Text style={{color:'gray'}}> {file.data.score} points  </Text>
                    <Icon name='comment-o' type='font-awesome' size={15} color='gray' style={{textAlign:'left'}}
                    />
                    <Text style={{color:'gray'}}
                    > {file.data.num_comments} comments</Text>
                </View>
            </Card>
                )
            }</TouchableOpacity>
            ))}
        </>
    );
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
    statusRow:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center'
    },
    postInfo:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 5
    }
})