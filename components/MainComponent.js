import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Comments from './CommentsComponent'
import {
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native-gesture-handler'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Com = (Component, name) => ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={name}
                component={Component}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name="menu" size={26} />
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 12,
                        alignItems: 'center',
                    },
                    headerTitleContainerStyle: {
                        left: 60,
                    },
                }}
            />
            {name != 'Settings' ? (
                <Stack.Screen
                    name={'Comments'}
                    component={Comments}
                    options={{
                        headerLeftContainerStyle: {
                            alignItems: 'center',
                        },
                        headerTitleContainerStyle: {
                            left: 60,
                        },
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
                <Drawer.Navigator initialRouteName="Browse">
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
