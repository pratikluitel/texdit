import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import { Card, Icon } from 'react-native-elements';

export default function PostList ({files}){
    return (
        <>
            {files.map((file) => (
                <Card
                    title={file.data.title}
                    titleStyle={{marginHorizontal:10}}
                    key={file.data.name}
                    >
                    {file.data.selftext!=""?
                    <View style={styles.selfText}>
                        <Text style={{ marginHorizontal:10}}>{file.data.selftext}</Text>
                    </View>
                    : null }
                    <View style={styles.statusRow}>
                        <Icon name='arrow-up' type='feather' size={15} style={{textAlign:'left'}}/>
                        <Text> {file.data.score} points  </Text>
                        <Icon name='comment-o' type='font-awesome' size={15} style={{textAlign:'left'}}/>
                        <Text> {file.data.num_comments} comments</Text>
                    </View>
                </Card>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    card:{
        
    },
    selfText:{
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1, 
        paddingBottom:15,
        marginBottom:10
    },
    statusRow:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center'
    }
})