import React, { Component } from 'react'
import {
    Text,
    TextInput,
    Modal,
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import { Icon, Card } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import PostList from './PostListComponent'
import { Loading } from './LoadingComponent'
import { baseurl } from '../shared/baseUrl'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            tempuser: '',
            filter: '',
            time: '',
            modalVisible: false,
            timeModalVisible: false,
            posts: {
                isLoading: true,
                errMess: null,
                posts: [],
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

    toggleModal = () => {
        this.setState({ ...this.state, modalVisible: !this.state.modalVisible })
    }
    toggleTimeModal = () => {
        this.setState({
            ...this.state,
            timeModalVisible: !this.state.timeModalVisible,
        })
    }

    renderFilter() {
        return (
            <>
                <Menu
                    ref={this.setMenuRef}
                    disabledTextColor="#000000"
                    button={
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: 'center',
                            }}
                            onPress={this.showMenu}
                        >
                            <Icon name="filter-list" size={26} color="white" />
                        </TouchableHighlight>
                    }
                >
                    <MenuItem onPress={() => {}} disabled>
                        Sort by:
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        onPress={() => {
                            this.hideMenu()
                            this.setState({
                                ...this.state,
                                filter: 'best',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                        }}
                    >
                        Best
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.toggleTimeModal()
                            this.hideMenu()
                        }}
                    >
                        Top
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.hideMenu()
                            this.setState({
                                ...this.state,
                                filter: 'new',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                        }}
                    >
                        New
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.hideMenu()
                            this.setState({
                                ...this.state,
                                filter: 'hot',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                        }}
                    >
                        Hot
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.hideMenu()
                            this.setState({
                                ...this.state,
                                filter: 'rising',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                        }}
                    >
                        Rising
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.hideMenu()
                            this.setState({
                                ...this.state,
                                filter: 'controversial',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                        }}
                    >
                        Controversial
                    </MenuItem>
                </Menu>
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
                    <Icon name="search" size={26} color="white" />
                </TouchableHighlight>
            </>
        )
    }

    componentDidMount() {
        this.mounted = true
        this.props.navigation.setOptions({
            headerTitle: (
                <>
                    {this.state.user == '' ? (
                        <Text>User{this.state.filter == '' ? null : ':'} </Text>
                    ) : (
                        <Text>
                            u/{this.state.user}
                            {this.state.filter == '' ? null : ':'}{' '}
                        </Text>
                    )}
                    <Text
                        style={{
                            fontSize: 16,
                            textTransform: 'capitalize',
                            color: 'gray',
                        }}
                    >
                        {this.state.filter}
                    </Text>
                </>
            ),
            headerRight: () => this.renderFilter(),
            headerRightContainerStyle: {
                width: '30%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
        })
        const user = '/user/' + this.state.user
        fetch(
            baseurl +
                user +
                `.json?limit=1000&sort=${this.state.filter}&t=${this.state.time}`
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

    componentDidUpdate(_, prevState) {
        if (
            this.state.user !== prevState.user ||
            this.state.filter != prevState.filter ||
            this.state.time != prevState.time
        ) {
            this.props.navigation.setOptions({
                headerTitle: (
                    <>
                        {this.state.user == '' ? (
                            <Text>
                                User{this.state.filter == '' ? null : ':'}{' '}
                            </Text>
                        ) : (
                            <Text>
                                u/{this.state.user}
                                {this.state.filter == '' ? null : ':'}{' '}
                            </Text>
                        )}
                        <Text
                            style={{
                                fontSize: 16,
                                textTransform: 'capitalize',
                                color: 'gray',
                            }}
                        >
                            {this.state.filter}
                        </Text>
                    </>
                ),
            })
            const substring = this.state.user
            const user = '/user/' + substring
            fetch(
                baseurl +
                    user +
                    `.json?limit=1000&sort=${this.state.filter}&t=${this.state.time}`
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
                                                filter: '',
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
                <Modal transparent visible={this.state.timeModalVisible}>
                    <View style={styles.timeModal}>
                        <Card>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            filter: 'top',
                                            time: 'hour',
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>Hour</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            filter: 'top',
                                            time: 'day',
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>Day</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            filter: 'top',
                                            time: 'week',
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>Week</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            filter: 'top',
                                            time: 'month',
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>Month</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                            filter: 'top',
                                            time: 'year',
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>Year</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            filter: 'top',
                                            time: 'all',
                                            posts: {
                                                ...this.state.posts,
                                                isLoading: true,
                                            },
                                        },
                                        () => this.toggleTimeModal()
                                    )
                                }}
                            >
                                <View style={styles.timeModalOptions}>
                                    <Text>All Time</Text>
                                </View>
                            </TouchableHighlight>
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
    timeModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    timeModalOptions: {
        padding: 20,
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
