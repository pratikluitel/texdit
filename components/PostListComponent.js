import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { Card, Icon } from 'react-native-elements'
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-display'
import Error from './ErrorComponent'

const RenderItem = ({ item, navigation }) => {
    return (
        <>
            {item.kind != 't1' ? (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Comments', {
                            permalink: item.data.permalink,
                        })
                    }}
                >
                    {item.data.thumbnail_height != null ? (
                        <Card
                            title={item.data.title}
                            titleStyle={{
                                marginHorizontal: 15,
                                textAlign: 'left',
                                fontSize: 18,
                                marginBottom: 10,
                            }}
                            dividerStyle={{
                                marginBottom: 5,
                            }}
                            image={{
                                uri: item.data.thumbnail,
                            }}
                            imageStyle={{
                                height: item.data.thumbnail_height,
                                marginBottom: 5,
                            }}
                        >
                            {item.data.selftext != '' ? (
                                <View style={styles.selfText}>
                                    <Markdown>{item.data.selftext}</Markdown>
                                </View>
                            ) : null}
                            <View style={{ marginBottom: 5 }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#4c4c4c',
                                        textAlign: 'right',
                                    }}
                                >
                                    {' '}
                                    {timeago(item.data.created_utc * 1000)}
                                </Text>
                            </View>
                            <View style={styles.postInfo}>
                                <Text
                                    style={{ fontSize: 13, color: '#007aff' }}
                                >
                                    {item.data.subreddit_name_prefixed}
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#4c4c4c' }}
                                >
                                    {' '}
                                    •
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#007aff' }}
                                >
                                    {' '}
                                    u/{item.data.author}
                                </Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Icon
                                    name="arrow-up"
                                    type="feather"
                                    size={15}
                                    color="gray"
                                    style={{ textAlign: 'left' }}
                                />
                                <Text style={{ color: 'gray' }}>
                                    {' '}
                                    {item.data.score} points{' '}
                                </Text>
                                <Icon
                                    name="comment-o"
                                    type="font-awesome"
                                    size={15}
                                    color="gray"
                                    style={{ textAlign: 'left' }}
                                />
                                <Text style={{ color: 'gray' }}>
                                    {' '}
                                    {item.data.num_comments} comments
                                </Text>
                            </View>
                        </Card>
                    ) : (
                        <Card
                            title={item.data.title}
                            titleStyle={{
                                marginHorizontal: 0,
                                textAlign: 'left',
                                fontSize: 18,
                                marginBottom: 10,
                            }}
                            dividerStyle={{
                                marginBottom: 10,
                            }}
                        >
                            {item.data.selftext != '' ? (
                                <View style={styles.selfText}>
                                    <Markdown>{item.data.selftext}</Markdown>
                                </View>
                            ) : null}
                            <View style={{ marginBottom: 5 }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#4c4c4c',
                                        textAlign: 'right',
                                    }}
                                >
                                    {' '}
                                    {timeago(item.data.created_utc * 1000)}
                                </Text>
                            </View>
                            <View style={styles.postInfo}>
                                <Text
                                    style={{ fontSize: 13, color: '#007aff' }}
                                >
                                    {item.data.subreddit_name_prefixed}
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#4c4c4c' }}
                                >
                                    {' '}
                                    •
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#007aff' }}
                                >
                                    {' '}
                                    u/{item.data.author}
                                </Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Icon
                                    name="arrow-up"
                                    type="feather"
                                    size={15}
                                    color="gray"
                                    style={{ textAlign: 'left' }}
                                />
                                <Text style={{ color: 'gray' }}>
                                    {' '}
                                    {item.data.score} points{' '}
                                </Text>
                                <Icon
                                    name="comment-o"
                                    type="font-awesome"
                                    size={15}
                                    color="gray"
                                    style={{ textAlign: 'left' }}
                                />
                                <Text style={{ color: 'gray' }}>
                                    {' '}
                                    {item.data.num_comments} comments
                                </Text>
                            </View>
                        </Card>
                    )}
                </TouchableOpacity>
            ) : (
                <Card
                    title={item.data.link_title}
                    titleStyle={{
                        marginHorizontal: 0,
                        textAlign: 'left',
                        fontSize: 14,
                    }}
                    style={styles.comment}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#007aff',
                                marginHorizontal: 0,
                            }}
                        >
                            {item.data.subreddit_name_prefixed}
                        </Text>
                    </View>
                    <View style={styles.textComment}>
                        <Markdown>{item.data.body}</Markdown>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 10,
                                fontStyle: 'italic',
                                color: '#4c4c4c',
                                textAlign: 'right',
                            }}
                        >
                            {' '}
                            {timeago(item.data.created_utc * 1000)}
                        </Text>
                    </View>
                    <View style={styles.statusRowUser}>
                        <Icon
                            name="arrow-up"
                            type="feather"
                            size={15}
                            color="gray"
                            style={{ textAlign: 'left' }}
                        />
                        <Text style={{ color: 'gray' }}>
                            {' '}
                            {item.data.score} points
                        </Text>
                        <Text style={{ fontSize: 13, color: '#4c4c4c' }}>
                            {' '}
                            •
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#007aff',
                                marginHorizontal: 0,
                            }}
                        >
                            {' '}
                            u/{item.data.author}
                        </Text>
                    </View>
                </Card>
            )}
        </>
    )
}

function RenderList({ posts, navigation }) {
    return (
        <FlatList
            data={posts.data.children}
            renderItem={({ item }) => (
                <RenderItem item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.data.name}
        />
    )
}
export default function PostList({ posts, navigation }) {
    return typeof posts.data != 'undefined' ? (
        <RenderList posts={posts} navigation={navigation} />
    ) : (
        <Error error={posts} />
    )
}

const styles = StyleSheet.create({
    card: {},
    selfText: {
        borderBottomColor: '#c5d2e0',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: -15,
    },
    statusRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postInfo: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 5,
    },
    statusRowComment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#c5d2e0',
        borderBottomWidth: 1,
        marginVertical: 8,
        paddingBottom: 8,
    },
    statusRowUser: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
})
