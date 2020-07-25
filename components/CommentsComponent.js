import React from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card, Icon } from 'react-native-elements';

export default function Comments(props){
    const post = props.route.params.file
    console.log(post)
    return( <ScrollView>
                {
                    !post.is_self ? (
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
                                uri:post.thumbnail
                            }}
                            imageStyle={{
                                height:post.thumbnail_height,
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
            </ScrollView>
    )
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