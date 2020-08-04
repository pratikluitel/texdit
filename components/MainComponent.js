import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Comments from './CommentsComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Com = (Component, name) => ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={name}
                component={Component}
                options={{
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
            {name != 'Settings' ? (
                <Stack.Screen
                    name={'Comments'}
                    component={Comments}
                    options={{
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
                    {/* Sign in button */}
                    <Drawer.Screen
                        name="Browse"
                        component={Com(Home, 'Frontpage')}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={Com(User, 'Profile')}
                    />
                    {/* Saved
                    and Settings
                    /> */}
                    {/*  A rate button 
                        and a share button */}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
