import React from 'react'
import {Text, ScrollView} from 'react-native'
import { Card, Icon } from 'react-native-elements';

export default function PostList ({files}){
    return (
        <>
            {files.map((file) => (
                <Card
                    title={file.data.title}
                    key={file.data.name}>
                    {file.data.selftext!=""?<Text>{file.data.selftext}</Text>:null}
                    <Text style={{textAlign:'center'}}>{file.data.score} points, {file.data.num_comments} comments</Text>
                </Card>
            ))}
        </>
    );
}