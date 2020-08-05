import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Card, Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import timeago from 'epoch-timeago'
import Markdown from 'react-native-markdown-display'
import { Loading } from './LoadingComponent'
import { baseurl } from '../shared/baseUrl'

var n_reply = 0
var max_reply_depth = 3

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
                                    <Markdown style={markdownStyle}>
                                        {file.data.body}
                                    </Markdown>
                                </View>
                                <View>
                                    <Text style={styles.timeAgoStyle}>
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
                                            color: '#bcbcbc',
                                        }}
                                    >
                                        {' '}
                                        •
                                    </Text>
                                    {file.data.replies != '' ? (
                                        <Text style={styles.postInfoText}>
                                            {' '}
                                            u/{file.data.author}
                                        </Text>
                                    ) : (
                                        <Text style={styles.postInfoText}>
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
                <Card containerStyle={styles.commentCardStyle}>
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
                        <Text style={{ fontSize: 13, color: '#bcbcbc' }}>
                            {' '}
                            •
                        </Text>
                        <Text style={styles.postInfoText}>
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
                        <Text
                            style={{
                                textAlign: 'right',
                                fontSize: 10,
                                color: 'white',
                            }}
                        >
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
            timeModalVisible: false,
            comments: {
                isLoading: true,
                errMess: null,
                comments: [],
            },
        }
    }
    _menu = null

    setMenuRef = (ref) => {
        this._menu = ref
    }

    hideMenu = () => {
        this._menu.hide()
    }

    showMenu = () => {
        this._menu.show()
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerTitle: (
                <>
                    <Text>Comments{this.state.filter == '' ? null : ':'} </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textTransform: 'capitalize',
                            color: 'gray',
                        }}
                    >
                        {this.state.filter == 'qa' ? 'Q&A' : this.state.filter}
                    </Text>
                </>
            ),
            headerRight: () => (
                <Menu
                    ref={this.setMenuRef}
                    disabledTextColor="#000000"
                    button={
                        <TouchableOpacity
                            style={styles.iconWrapper}
                            onPress={this.showMenu}
                        >
                            <Icon name="filter-list" size={26} color="white" />
                        </TouchableOpacity>
                    }
                >
                    <MenuItem disabled disabledTextColor="black">
                        Sort by:
                    </MenuItem>
                    <MenuDivider />
                    {Object.entries({
                        best: 'Best',
                        top: 'Top',
                        new: 'New',
                        old: 'Old',
                        qa: 'Q&A',
                        controversial: 'Controversial',
                    }).map((en) => {
                        // en is an array with 2 elements representing 1 key value pair for each iteration
                        return (
                            <MenuItem
                                onPress={() => {
                                    this.hideMenu()
                                    this.setState({
                                        ...this.state,
                                        filter: en[0],
                                        comments: {
                                            ...this.state.comments,
                                            isLoading: true,
                                        },
                                    })
                                }}
                                key={en[0]}
                            >
                                {en[1]}
                            </MenuItem>
                        )
                    })}
                </Menu>
            ),
            headerRightContainerStyle: {
                width: '15%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
        })
        fetch(
            baseurl +
                this.props.route.params.item.data.permalink +
                `.json?sort=${this.state.filter}`
        )
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

    componentDidUpdate(_, prevState) {
        //updates only if filter is changed
        if (this.state.filter != prevState.filter) {
            this.props.navigation.setOptions({
                headerTitle: (
                    <>
                        <Text>
                            Comments{this.state.filter == '' ? null : ':'}{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                textTransform: 'capitalize',
                                color: 'gray',
                            }}
                        >
                            {this.state.filter == 'qa'
                                ? 'Q&A'
                                : this.state.filter}
                        </Text>
                    </>
                ),
            })
            fetch(
                baseurl +
                    this.props.route.params.item.data.permalink +
                    `.json?sort=${this.state.filter}`
            )
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
    }

    render() {
        const item = this.props.route.params.item
        const image =
            typeof item.data.preview != 'undefined'
                ? item.data.preview.images[0].resolutions[
                      item.data.preview.images[0].resolutions.length - 1
                  ]
                : null
        const Post = () =>
            image != null ? ( //checking if the post has an image
                <Card
                    title={item.data.title}
                    titleStyle={styles.cardTitleStyle}
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
                            style={{
                                fontSize: 13,
                                color: '#bcbcbc',
                            }}
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
                            style={{
                                textAlign: 'left',
                            }}
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
                //for textposts
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
                            style={{
                                fontSize: 13,
                                color: '#bcbcbc',
                            }}
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
                            style={{
                                textAlign: 'left',
                            }}
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
            )
        return (
            <>
                {this.state.comments.isLoading ? (
                    <ScrollView>
                        <Post />
                        <Loading />
                    </ScrollView>
                ) : (
                    //after the comments have loaded.
                    <FlatList
                        ListHeaderComponent={Post}
                        // the data has only two elements, and the 1st element is of no use
                        //still using flatlist because indexing into the data caused an error
                        //the RenderPage function will then call another flatlist that actually renders
                        //the comments. No way to avoid this for now, but looking into it.
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
                )}
            </>
        )
    }
}

const markdownStyle = {
    body: { color: 'white' },
    heading1: { color: 'white' },
    code_block: { color: 'white' },
}

const styles = StyleSheet.create({
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },
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
    },
    timeAgoStyle: {
        fontSize: 13,
        color: '#8c8c8c',
        textAlign: 'right',
    },
    postInfoText: { fontSize: 13, color: '#8cb3d9' },
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
        borderBottomColor: '#b2b2b2',
        borderBottomWidth: 0.5,
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
    commentCardStyle: {
        backgroundColor: '#292929',
        borderColor: '#292929',
        marginHorizontal: 6,
        marginVertical: 6,
    },
})

export default Comments
