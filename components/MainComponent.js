import React, { Component } from 'react'
import { TextInput, Modal, View, Text, Button, StyleSheet } from 'react-native'
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

const Com= (Component, name, toggleModal)=> ({ navigation })=>{
    return(
        <Stack.Navigator>
            {(name == 'Frontpage') ?
            <Stack.Screen name={name} component={Component}
            options={{
                headerLeft: ()=>(<Icon name='menu' size={26}
                onPress={()=>navigation.toggleDrawer()}/>),
                headerLeftContainerStyle: {
                    padding: 13
                },
                headerRight: ()=>(<Icon name='search' size={26}
                onPress={()=>{
                    toggleModal()
                }}/>),
                headerRightContainerStyle:{
                    padding: 13
                }
            }}/>: <Stack.Screen name={name} component={Component}
            options={{
                headerLeft: ()=>(<Icon name='menu' size={26}
                onPress={()=>navigation.toggleDrawer()}/>),
                headerLeftContainerStyle: {
                    padding: 13
                }
            }}/>
            }
            {(name != 'Settings') ?
            <Stack.Screen name={'Comments'} component={Comments}
                />: null
            }
        </Stack.Navigator>
    )
}

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            subtext: '',
            modalVisible: false
        }
    }
    
    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    
    render(){
        return(
            <>
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Frontpage">
                        {/* Sign in button */}
                        <Drawer.Screen name="Frontpage" component={Com(Home,"Frontpage", this.toggleModal)} />
                        <Drawer.Screen name="Profile" component={Com(User,"Profile")} />
                        <Drawer.Screen name="Saved" component={Com(Saved,"Saved")} />
                        {/* A search button (goto sub)  */}
                        <Drawer.Screen name="Settings" component={Com(Settings,"Settings")} />
                        {/*  A rate button 
                            and a share button */}
                    </Drawer.Navigator>
                </NavigationContainer>
                <Modal visible={this.state.modalVisible}>
                    <View
                    style={styles.modalView}>
                        <Text style={styles.textStyle}>Type the subreddit you want to navigate to</Text>
                        <View
                        style={{height: 50,width:160,padding: 10, margin:10, borderBottomColor:'black',borderWidth:1}}>
                            <TextInput
                            onChangeText={(subtext)=>this.setState({subtext:subtext})}
                            value={this.state.subtext}
                            />
                        </View>
                       <View
                       style={{ flexDirection: 'row'}}>
                        <Button 
                            title='go'
                            style={styles.openButton}
                            onPress={()=>{this.toggleModal();}}/>
                        <Button 
                            title='cancel'
                            style={styles.openButton}
                            onPress={this.toggleModal}/>
                       </View>
                        
                    </View>
                </Modal>

            </>
        )
    }
}


const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor:'white',
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 10
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    }
  });
  