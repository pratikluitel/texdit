import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native'
import { Card, Icon } from 'react-native-elements'
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-display'
import { Loading } from './LoadingComponent'
import { baseurl } from '../shared/baseUrl'

var n_reply = 0
var max_reply_depth = 2

function RepliesList({ files, n_reply }) {
    n_reply = n_reply + 1
    return (
        <>
            {files.map((file) => {
                return (
                    <View
                        key={file.data.name}
                        style={{ marginLeft: n_reply * 5 }}
                    >
                        {file.kind != 'more' ? (
                            <>
                                <View style={styles.textComment}>
                                    <Markdown>{file.data.body}</Markdown>
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
                                        {timeago(file.data.created_utc * 1000)}
                                    </Text>
                                </View>
                                <View style={styles.statusRowComment}>
                                    <Icon
                                        name="arrow-up"
                                        type="feather"
                                        size={15}
                                        color="gray"
                                        style={{ textAlign: 'left' }}
                                    />
                                    <Text style={{ color: 'gray' }}>
                                        {' '}
                                        {file.data.score} points
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: '#4c4c4c',
                                        }}
                                    >
                                        {' '}
                                        •
                                    </Text>
                                    {file.data.replies != '' ? (
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                                marginHorizontal: 0,
                                            }}
                                        >
                                            {' '}
                                            u/{file.data.author}
                                        </Text>
                                    ) : (
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                            }}
                                        >
                                            {' '}
                                            u/{file.data.author}
                                        </Text>
                                    )}
                                </View>
                                {file.data.replies != '' &&
                                n_reply <= max_reply_depth ? (
                                    <RepliesList
                                        files={file.data.replies.data.children}
                                        n_reply={n_reply}
                                    />
                                ) : null}
                            </>
                        ) : null}
                    </View>
                )
            })}
        </>
    )
}

function RenderComment({ item, navigation }) {
    n_reply = 0
    return (
        <>
            {item.kind != 'more' ? (
                <Card style={styles.comment}>
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
                    <View style={styles.statusRowComment}>
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
                    {item.data.replies != '' ? (
                        <RepliesList
                            files={item.data.replies.data.children}
                            n_reply={n_reply}
                        />
                    ) : null}
                    <View>
                        <Text style={{ textAlign: 'right', fontSize: 10 }}>
                            {item.data.replies != ''
                                ? item.data.replies.data.children.length
                                : 0}{' '}
                            replies
                        </Text>
                    </View>
                </Card>
            ) : null}
        </>
    )
}

function RenderPage({ item, navigation }) {
    return (
        <>
            {item.data.dist != null ? null : (
                <>
                    {item.data.children.length != 0 ? (
                        <FlatList
                            data={item.data.children}
                            keyExtractor={(item) => item.data.name}
                            renderItem={({ item }) => (
                                <RenderComment
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    ) : null}
                </>
            )}
        </>
    )
}

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            comments: {
                isLoading: true,
                errMess: null,
                comments: [],
            },
        }
    }

    componentDidMount() {
        fetch(baseurl + this.props.route.params.item.data.permalink + '.json')
            .then(
                (response) => {
                    if (response.ok) {
                        return response
                    } else {
                        var error = new Error(
                            'Error ' +
                                response.status +
                                ': ' +
                                response.statusText
                        )
                        error.response = response
                        throw error
                    }
                },
                (error) => {
                    var errmess = new Error(error.message)
                    throw errmess
                }
            )
            .then((response) => response.json())
            .then((comments) =>
                this.setState({
                    ...this.state,
                    comments: {
                        errMess: null,
                        comments: comments,
                        isLoading: false,
                    },
                })
            )
            .catch((error) =>
                this.setState({
                    ...this.state,
                    comments: {
                        ...this.state.comments,
                        isLoading: false,
                        errMess: error,
                    },
                })
            )
    }

    render() {
        const item = this.props.route.params.item
        const image =
            typeof item.data.preview != 'undefined'
                ? item.data.preview.images[0].resolutions[
                      item.data.preview.images[0].resolutions.length - 1
                  ]
                : null
        return this.state.comments.isLoading ? (
            <ScrollView>
                {image != null ? (
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
                            uri: image.url.replace(/&amp;/g, '&'),
                        }}
                        imageStyle={{
                            resizeMode: 'cover',
                            width: '100%',
                            height:
                                (image.height / image.width) *
                                (Dimensions.get('window').width - 30),
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
                                style={{
                                    fontSize: 13,
                                    color: '#007aff',
                                }}
                            >
                                {item.data.subreddit_name_prefixed}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: '#4c4c4c',
                                }}
                            >
                                {' '}
                                •
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: '#007aff',
                                }}
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
                                style={{
                                    textAlign: 'left',
                                }}
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
                                style={{
                                    textAlign: 'left',
                                }}
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
                                style={{
                                    fontSize: 13,
                                    color: '#007aff',
                                }}
                            >
                                {item.data.subreddit_name_prefixed}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: '#4c4c4c',
                                }}
                            >
                                {' '}
                                •
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: '#007aff',
                                }}
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
                                style={{
                                    textAlign: 'left',
                                }}
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
                                style={{
                                    textAlign: 'left',
                                }}
                            />
                            <Text style={{ color: 'gray' }}>
                                {' '}
                                {item.data.num_comments} comments
                            </Text>
                        </View>
                    </Card>
                )}
                <Loading />
            </ScrollView>
        ) : (
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <>
                            {image != null ? (
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
                                        uri: image.url.replace(/&amp;/g, '&'),
                                    }}
                                    imageStyle={{
                                        resizeMode: 'cover',
                                        width: '100%',
                                        height:
                                            (image.height / image.width) *
                                            (Dimensions.get('window').width -
                                                30),
                                        marginBottom: 10,
                                    }}
                                >
                                    {item.data.selftext != '' ? (
                                        <View style={styles.selfText}>
                                            <Markdown>
                                                {item.data.selftext}
                                            </Markdown>
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
                                            {timeago(
                                                item.data.created_utc * 1000
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                            }}
                                        >
                                            {item.data.subreddit_name_prefixed}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#4c4c4c',
                                            }}
                                        >
                                            {' '}
                                            •
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                            }}
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
                                            style={{
                                                textAlign: 'left',
                                            }}
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
                                            style={{
                                                textAlign: 'left',
                                            }}
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
                                            <Markdown>
                                                {item.data.selftext}
                                            </Markdown>
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
                                            {timeago(
                                                item.data.created_utc * 1000
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.postInfo}>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                            }}
                                        >
                                            {item.data.subreddit_name_prefixed}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#4c4c4c',
                                            }}
                                        >
                                            {' '}
                                            •
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#007aff',
                                            }}
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
                                            style={{
                                                textAlign: 'left',
                                            }}
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
                                            style={{
                                                textAlign: 'left',
                                            }}
                                        />
                                        <Text style={{ color: 'gray' }}>
                                            {' '}
                                            {item.data.num_comments} comments
                                        </Text>
                                    </View>
                                </Card>
                            )}
                        </>
                    )
                }}
                data={this.state.comments.comments}
                renderItem={({ item }) => (
                    <RenderPage
                        item={item}
                        navigation={this.props.navigation}
                    />
                )}
                keyExtractor={(item) => {
                    return String(item.data.dist == null)
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {},
    selfText: {
        borderBottomColor: '#c5d2e0',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 10,
    },
    textComment: {},
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
    postInfo: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 5,
    },
    comment: {
        marginLeft: 20,
    },
})

export default Comments
