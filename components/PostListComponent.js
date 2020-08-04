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
            {/* We can render both comments and posts in user profiles */}
            {item.kind != 't1' ? ( //t1 represents comments, t3 represents link posts
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Comments', {
                            item: item,
                        })
                    }}
                >
                    {item.data.thumbnail_height != null ? (
                        <Card
                            title={item.data.title}
                            titleStyle={styles.cardTitleStyle}
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
                            containerStyle={styles.card}
                        >
                            {item.data.selftext != '' ? (
                                <View style={styles.selfText}>
                                    <Markdown
                                        style={{
                                            body: { color: 'white' },
                                            heading1: { color: 'white' },
                                            code_block: { color: 'white' },
                                        }}
                                    >
                                        {item.data.selftext}
                                    </Markdown>
                                </View>
                            ) : null}
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.timeAgoStyle}>
                                    {' '}
                                    {timeago(item.data.created_utc * 1000)}
                                </Text>
                            </View>
                            <View style={styles.postInfo}>
                                <Text style={styles.postInfoText}>
                                    {item.data.subreddit_name_prefixed}
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#bcbcbc' }}
                                >
                                    {' '}
                                    •
                                </Text>
                                <Text style={styles.postInfoText}>
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
                                    {item.data.score} points{'   '}
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
                            titleStyle={styles.cardTitleStyleTextPost}
                            dividerStyle={{
                                marginBottom: 10,
                            }}
                            containerStyle={styles.card}
                        >
                            {item.data.selftext != '' ? (
                                <View style={styles.selfText}>
                                    <Markdown style={markdownStyle}>
                                        {item.data.selftext}
                                    </Markdown>
                                </View>
                            ) : null}
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.timeAgoStyle}>
                                    {' '}
                                    {timeago(item.data.created_utc * 1000)}
                                </Text>
                            </View>
                            <View style={styles.postInfo}>
                                <Text style={styles.postInfoText}>
                                    {item.data.subreddit_name_prefixed}
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: '#bcbcbc' }}
                                >
                                    {' '}
                                    •
                                </Text>
                                <Text style={styles.postInfoText}>
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
                                    {item.data.score} points{'   '}
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
                    titleStyle={styles.cardTitleStyleTextPost}
                    containerStyle={styles.card}
                >
                    <View>
                        <Text style={styles.postInfoText}>
                            {item.data.subreddit_name_prefixed}
                        </Text>
                    </View>
                    <View style={styles.textComment}>
                        <Markdown style={markdownStyle}>
                            {item.data.body}
                        </Markdown>
                    </View>
                    <View>
                        <Text style={styles.timeAgoStyle}>
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
                        <Text style={{ fontSize: 13, color: '#bcbcbc' }}>
                            {' '}
                            •
                        </Text>
                        <Text style={styles.postInfoText}>
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

const markdownStyle = {
    body: { color: 'white' },
    heading1: { color: 'white' },
    code_block: { color: 'white' },
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#292929',
        borderColor: '#292929',
        borderRadius: 5,
        marginHorizontal: 6,
        marginVertical: 6,
    },
    cardTitleStyle: {
        marginHorizontal: 15,
        textAlign: 'left',
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
    cardTitleStyleTextPost: {
        marginHorizontal: 1,
        textAlign: 'left',
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
    selfText: {
        borderBottomColor: '#b2b2b2',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: -15,
    },
    timeAgoStyle: {
        fontSize: 13,
        color: '#8c8c8c',
        textAlign: 'right',
    },
    postInfo: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 5,
    },
    postInfoText: { fontSize: 13, color: '#8cb3d9' },
    statusRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
