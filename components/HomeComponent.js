import React, { Component } from 'react'
import {
    TextInput,
    Modal,
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import { Icon, Card } from 'react-native-elements'
import PostList from './PostListComponent'
import { Loading } from './LoadingComponent'
import { baseurl } from '../shared/baseUrl'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            tempsub: '',
            modalVisible: false,
            posts: {
                isLoading: true,
                errMess: null,
                posts: [],
            },
        }
    }

    toggleModal = () => {
        this.setState({ ...this.state, modalVisible: !this.state.modalVisible })
    }

    componentDidMount() {
        this.mounted = true
        this.props.navigation.setOptions({
            headerTitle:
                this.state.subreddits.length == 0
                    ? 'Frontpage'
                    : 'r/' + this.state.subreddits[0],
            headerRight: () => (
                <>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            this.state.subreddits.length != 0
                                ? this.setState({
                                      ...this.state,
                                      posts: {
                                          ...this.state.posts,
                                          isLoading: true,
                                      },
                                      subreddits: [],
                                  })
                                : null
                        }}
                    >
                        <Icon name="home" size={26} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}
                        onPress={() => {}}
                    >
                        <Icon name="filter-list" size={26} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            this.toggleModal()
                        }}
                    >
                        <Icon name="search" size={26} />
                    </TouchableHighlight>
                </>
            ),
            headerRightContainerStyle: {
                width: '45%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
        })
        const substring = this.state.subreddits.join('+')
        const subred =
            (this.state.subreddits.length !== 0 ? '/r/' : '/best') + substring
        fetch(baseurl + subred + '.json?limit=1000')
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
            .then((posts) => {
                if (this.mounted)
                    this.setState({
                        ...this.state,
                        posts: {
                            errMess: null,
                            posts: posts,
                            isLoading: false,
                        },
                    })
            })
            .catch((error) => {
                if (this.mounted)
                    this.setState({
                        ...this.state,
                        posts: {
                            ...this.state.posts,
                            isLoading: false,
                            errMess: error,
                        },
                    })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.subreddits[0] !== prevState.subreddits[0]) {
            this.props.navigation.setOptions({
                headerTitle:
                    this.state.subreddits.length == 0
                        ? 'Frontpage'
                        : 'r/' + this.state.subreddits[0],
            })
            const substring = this.state.subreddits.join('+')
            const subred =
                (this.state.subreddits.length !== 0 ? '/r/' : '/best') +
                substring
            fetch(baseurl + subred + '.json?limit=1000')
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
                .then((posts) => {
                    if (this.mounted)
                        this.setState({
                            ...this.state,
                            posts: {
                                errMess: null,
                                posts: posts,
                                isLoading: false,
                            },
                        })
                })
                .catch((error) => {
                    if (this.mounted)
                        this.setState({
                            ...this.state,
                            posts: {
                                ...this.state.posts,
                                isLoading: false,
                                errMess: error,
                            },
                        })
                })
        }
    }

    render() {
        return (
            <>
                {this.state.posts.isLoading ? (
                    <Loading />
                ) : (
                    <PostList
                        posts={this.state.posts.posts}
                        navigation={this.props.navigation}
                    />
                )}
                <Modal transparent visible={this.state.modalVisible}>
                    <View style={styles.modal}>
                        <Card style={styles.modalView}>
                            <View style={styles.textBox}>
                                <TextInput
                                    onChangeText={(tempsub) =>
                                        this.setState({
                                            ...this.state,
                                            tempsub: tempsub,
                                        })
                                    }
                                    value={this.state.tempsub}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    title="search"
                                    style={styles.openButton}
                                    color="gray"
                                    onPress={() =>
                                        this.setState(
                                            {
                                                ...this.state,
                                                subreddits:
                                                    this.state.tempsub.length ==
                                                    0
                                                        ? []
                                                        : [this.state.tempsub],
                                                tempsub: '',
                                                posts: {
                                                    ...this.state.posts,
                                                    isLoading: true,
                                                },
                                            },
                                            () => this.toggleModal()
                                        )
                                    }
                                />
                                <Button
                                    title="cancel"
                                    style={styles.openButton}
                                    color="gray"
                                    onPress={this.toggleModal}
                                />
                            </View>
                        </Card>
                    </View>
                </Modal>
            </>
        )
    }

    componentWillUnmount() {
        this.mounted = false
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    openButton: {
        padding: 10,
        margin: 10,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textBox: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
})

export default Home
