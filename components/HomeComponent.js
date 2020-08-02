import React, { Component } from 'react'
import {
    TextInput,
    Modal,
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
    Text,
} from 'react-native'
import { Icon, Card } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
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
            filter: '',
            time: '',
            timeModalVisible: false,
            posts: {
                isLoading: true,
                errMess: null,
                posts: [],
            },
        }
    }
    _menu = null
    _menuTime = null

    setMenuRef = (ref) => {
        this._menu = ref
    }

    hideMenu = () => {
        this._menu.hide()
    }

    showMenu = () => {
        this._menu.show()
    }

    setMenuTimeRef = (ref) => {
        this._menuTime = ref
    }

    hideMenuTime = () => {
        this._menuTime.hide()
    }

    showMenuTime = () => {
        this._menuTime.show()
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
                        this.state.subreddits.length != 0 ||
                        this.state.filter.length != 0
                            ? this.setState({
                                  ...this.state,
                                  filter: '',
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
                <Menu
                    ref={this.setMenuRef}
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
                            <Icon name="filter-list" size={26} />
                        </TouchableHighlight>
                    }
                >
                    <MenuItem onPress={() => {}} disabled>
                        Sort by:
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                filter: 'best',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                            this.hideMenu()
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
                            this.setState({
                                ...this.state,
                                filter: 'new',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                            this.hideMenu()
                        }}
                    >
                        New
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                filter: 'hot',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                            this.hideMenu()
                        }}
                    >
                        Hot
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                filter: 'rising',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                            this.hideMenu()
                        }}
                    >
                        Rising
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                filter: 'controversial',
                                posts: {
                                    ...this.state.posts,
                                    isLoading: true,
                                },
                            })
                            this.hideMenu()
                            this.toggleTimeModal()
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
                    <Icon name="search" size={26} />
                </TouchableHighlight>
            </>
        )
    }

    componentDidMount() {
        this.mounted = true
        this.props.navigation.setOptions({
            headerTitle: (
                <>
                    {this.state.subreddits.length == 0 ? (
                        <Text>
                            Frontpage{this.state.filter == '' ? null : ':'}{' '}
                        </Text>
                    ) : (
                        <Text>
                            r/{this.state.subreddits[0]}
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
                width: '45%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
        })
        const substring = this.state.subreddits.join('+')
        const subred =
            this.state.subreddits.length !== 0 ? '/r/' + substring : ''

        fetch(
            baseurl +
                subred +
                `/${this.state.filter}/.json?limit=1000&sort=${this.state.filter}&t=${this.state.time}`
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
            this.state.subreddits[0] !== prevState.subreddits[0] ||
            this.state.filter != prevState.filter ||
            this.state.time != prevState.time
        ) {
            this.props.navigation.setOptions({
                headerTitle: (
                    <>
                        {this.state.subreddits.length == 0 ? (
                            <Text>
                                Frontpage{this.state.filter == '' ? null : ':'}{' '}
                            </Text>
                        ) : (
                            <Text>
                                r/{this.state.subreddits[0]}
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
            })

            const substring = this.state.subreddits.join('+')
            const subred =
                this.state.subreddits.length !== 0 ? '/r/' + substring : ''
            fetch(
                baseurl +
                    subred +
                    `/${this.state.filter}/.json?limit=1000&sort=${this.state.filter}&t=${this.state.time}`
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

export default Home
