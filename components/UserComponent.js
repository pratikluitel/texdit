import React, { Component } from 'react'
import {
    Text,
    TextInput,
    Modal,
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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
                    <MenuItem
                        onPress={() => {
                            this.toggleTimeModal()
                            this.hideMenu()
                        }}
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
                        return (
                            <MenuItem
                                key={en[0]}
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
        //updates only if subreddit, filter or filter time is changed
        if (
            this.state.user !== prevState.user ||
            this.state.filter != prevState.filter ||
            this.state.time != prevState.time
        ) {
            //set header
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
                            {Object.entries({
                                hour: 'Hour',
                                day: 'Day',
                                week: 'Week',
                                month: 'Month',
                                year: 'Year',
                                all: 'All Time',
                            }).map((en) => {
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

export default User
