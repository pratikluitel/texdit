import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Saved from './SavedComponent'
import Settings from './SettingsComponent'
import Comments from './CommentsComponent'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Com= (Component, name)=> ({ navigation })=>{
    return(
        <Stack.Navigator>
            
            <Stack.Screen name={name} component={Component}
                options={{
                    headerLeft: ()=>(<Icon name='menu' size={26}
                    onPress={()=>navigation.toggleDrawer()}/>),
                    headerLeftContainerStyle: {
                        padding: 13
                    },
                    headerRight: ()=>(<Icon name='more-vert' size={26}
                    onPress={()=>{

                    }}/>),
                    headerRightContainerStyle:{
                        padding: 13
                    }
                }}/>
            {(name != 'Settings') ?
            <Stack.Screen name={'Comments'} component={Comments}
                options={{
                    headerRight: ()=>(<Icon name='more-vert' size={26}
                    onPress={()=>{

                    }}/>),
                    headerRightContainerStyle:{
                        padding: 13
                    }
                    
                }}/>: null
            }
        </Stack.Navigator>
    )
}

export default class Main extends Component{
    
    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Frontpage">
                    {/* Sign in button */}
                    <Drawer.Screen name="Frontpage" component={Com(Home,"Frontpage")} />
                    <Drawer.Screen name="Profile" component={Com(User,"Profile")} />
                    <Drawer.Screen name="Saved" component={Com(Saved,"Saved")} />
                    {/* A search button (goto sub)  */}
                    <Drawer.Screen name="Settings" component={Com(Settings,"Settings")} />
                    {/*  A rate button 
                        and a share button */}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}