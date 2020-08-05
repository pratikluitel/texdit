import React, { Component } from 'react'
import {
    TextInput,
    Modal,
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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
    //methods and variables for filtering
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
                <TouchableOpacity
                    style={styles.iconWrapper}
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
                    <Icon name="home" size={26} color="white" />
                </TouchableOpacity>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <TouchableOpacity
                            style={styles.iconWrapper}
                            onPress={this.showMenu}
                        >
                            <Icon name="filter-list" size={26} color="white" />
                        </TouchableOpacity>
                    }
                    style={{ backgroundColor: '#2f2f2f' }}
                >
                    <MenuItem disabled disabledTextColor="white">
                        Sort by:
                    </MenuItem>
                    <MenuDivider color="white" />
                    <MenuItem
                        onPress={() => {
                            this.toggleTimeModal()
                            this.hideMenu()
                        }}
                        textStyle={{ color: 'white' }}
                    >
                        Top
                    </MenuItem>

                    {Object.entries({
                        best: 'Best',
                        new: 'New',
                        hot: 'Hot',
                        rising: 'Rising',
                        controversial: 'Controversial',
                    }).map((en) => {
                        // en is an array with 2 elements representing 1 key value pair for each iteration
                        return (
                            <MenuItem
                                key={en[0]}
                                textStyle={{ color: 'white' }}
                                onPress={() => {
                                    this.setState({
                                        ...this.state,
                                        filter: en[0],
                                        posts: {
                                            ...this.state.posts,
                                            isLoading: true,
                                        },
                                    })
                                    this.hideMenu()
                                }}
                            >
                                {en[1]}
                            </MenuItem>
                        )
                    })}
                </Menu>
                <TouchableOpacity
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={styles.iconWrapper}
                    onPress={() => {
                        this.toggleModal()
                    }}
                >
                    <Icon name="search" size={26} color="white" />
                </TouchableOpacity>
            </>
        )
    }

    componentDidMount() {
        this.mounted = true
        //set header
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
        //updates only if subreddit, filter or filter time is changed
        if (
            this.state.subreddits[0] !== prevState.subreddits[0] ||
            this.state.filter != prevState.filter ||
            this.state.time != prevState.time
        ) {
            //set header
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
                            {Object.entries({
                                hour: 'Hour',
                                day: 'Day',
                                week: 'Week',
                                month: 'Month',
                                year: 'Year',
                                all: 'All Time',
                            }).map((en) => {
                                // en is an array with 2 elements representing 1 key value pair for each iteration
                                return (
                                    <TouchableHighlight
                                        key={en[0]}
                                        activeOpacity={0.6}
                                        underlayColor="#DDDDDD"
                                        onPress={() => {
                                            this.setState(
                                                {
                                                    ...this.state,
                                                    filter: 'top',
                                                    time: en[0],
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
                                            <Text>{en[1]}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })}
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
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
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
