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

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            tempuser: '',
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
                this.state.user == '' ? 'User' : 'u/' + this.state.user,
            headerRight: () => (
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
            ),
            headerRightContainerStyle: {
                width: '15%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
        })
        const user =
            (this.state.user.length !== 0 ? '/user/' : '') + this.state.user
        console.log(baseurl + user + '.json?limit=1000')
        fetch(baseurl + user + '.json?limit=1000')
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
        if (this.state.user !== prevState.user) {
            this.props.navigation.setOptions({
                headerTitle:
                    this.state.user.length == 0
                        ? 'User'
                        : 'u/' + this.state.user,
            })
            const substring = this.state.user
            const user =
                (this.state.user.length !== 0 ? '/user/' : '') + substring
            fetch(baseurl + user + '.json?limit=1000')
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
                                    onChangeText={(tempuser) =>
                                        this.setState({
                                            ...this.state,
                                            tempuser: tempuser,
                                        })
                                    }
                                    value={this.state.tempuser}
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
                                                user: this.state.tempuser,
                                                tempuser: '',
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

export default User
