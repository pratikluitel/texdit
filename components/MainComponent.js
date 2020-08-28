import React, { Component } from 'react'
import {
    NavigationContainer,
    NavigationContext,
} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Comments from './CommentsComponent'
import Webview from './WebVIewComponent'
import '../shared/appInfo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Linking from 'expo-linking'
import appInfo from '../shared/appInfo'
import getAccessToken from '../shared/getAccessToken'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Com = (Component, name) => ({ navigation }) => {
    //return two stacked screens for each Component(some exceptions) for main feed and comments.
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={name}
                component={Component}
                options={{
                    cardStyle: { backgroundColor: '#474747' },
                    headerStyle: {
                        backgroundColor: '#202020',
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name="menu" size={26} color="white" />
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 12,
                        alignItems: 'center',
                    },
                    headerTitleContainerStyle: {
                        left: 60,
                    },
                    headerTintColor: 'white',
                }}
            />
            {name != 'Settings' || name != 'Webview' ? (
                <Stack.Screen
                    name={'Comments'}
                    component={Comments}
                    options={{
                        cardStyle: { backgroundColor: '#474747' },
                        headerStyle: {
                            backgroundColor: '#202020',
                        },
                        headerTitleStyle: {
                            color: 'white',
                        },
                        headerLeftContainerStyle: {
                            alignItems: 'center',
                        },
                        headerTitleContainerStyle: {
                            left: 60,
                        },
                        headerTintColor: 'white',
                    }}
                />
            ) : null}
        </Stack.Navigator>
    )
}

export default class Main extends Component {
    componentDidMount() {
        Linking.getInitialURL()
            .then((url) => {
                //the secret code comes embedded in the url of the redirect uri
                let { _, queryParams } = Linking.parse(url)
                if (queryParams.state === appInfo.state) {
                    appInfo.code = queryParams.code
                    getAccessToken()
                } else if (queryParams.error) {
                    throw new Error(queryParams.error)
                }
            })
            .catch((err) => {
                console.warn('Error:', err)
            })

        Linking.addEventListener('url', (e) => {
            console.log('Listener invoked')
            this._handleDeeplink(e.url)
        })
    }
    _handleDeeplink(url) {}
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Browse"
                    drawerStyle={{ backgroundColor: '#2c2c2c' }}
                    labelStyle={{ color: 'white' }}
                    drawerContentOptions={{
                        activeTintColor: '#aaaaaa',
                        inactiveTintColor: '#cccccc',
                    }}
                >
                    <Drawer.Screen
                        name="Login"
                        component={Com(Webview, 'Webview')}
                    />
                    <Drawer.Screen
                        name="Browse"
                        component={Com(Home, 'Frontpage')}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={Com(User, 'Profile')}
                    />

                    {/*  A rate button 
                        and a share button */}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
