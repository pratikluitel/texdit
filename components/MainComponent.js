import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Saved from './SavedComponent'
import Settings from './SettingsComponent'
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
                                onPress={() => {}}
                            >
                                <Icon name="filter-list" size={26} />
                            </TouchableHighlight>
                        ),
                        headerRightContainerStyle: {
                            width: '15%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
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
                    <Drawer.Screen
                        name="Saved"
                        component={Com(Saved, 'Saved')}
                    />
                    <Drawer.Screen
                        name="Settings"
                        component={Com(Settings, 'Settings')}
                    />
                    {/*  A rate button 
                        and a share button */}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
