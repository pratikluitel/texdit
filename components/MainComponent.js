import React, { Component } from 'react'
import { TextInput, Modal, View, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon, Card } from 'react-native-elements'
import Home from './HomeComponent'
import User from './UserComponent'
import Saved from './SavedComponent'
import Settings from './SettingsComponent'
import Comments from './CommentsComponent'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Com= (Component, name, toggleModal ,subreddits)=> ({ navigation })=>{
    return(
        <Stack.Navigator>
            {(name == 'Frontpage' || name=='Profile') ?
            <Stack.Screen name={subreddits.length == 0?name:(name == 'Frontpage'?'r/':'u/')+subreddits[0]} 
                component={Component} initialParams={{subreddits:subreddits}}
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
            subreddits:[],
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
                    <Drawer.Navigator initialRouteName="Browse">
                        {/* Sign in button */}
                        <Drawer.Screen name="Browse" component={Com(Home,"Frontpage",this.toggleModal, this.state.subreddits)} />
                        <Drawer.Screen name="Profile" component={Com(User,"Profile",this.toggleModal, this.state.subreddits)} />
                        <Drawer.Screen name="Saved" component={Com(Saved,"Saved")} />
                        <Drawer.Screen name="Settings" component={Com(Settings,"Settings")} />
                        {/*  A rate button 
                            and a share button */}
                    </Drawer.Navigator>
                </NavigationContainer>
                <Modal 
                transparent
                visible={this.state.modalVisible}
                >
                    <View style={styles.modal}>
                        <Card
                        style={styles.modalView}>
                            <View
                            style={styles.textBox}>
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
                                    color='gray'
                                    onPress={()=>{
                                        this.setState({subreddits: this.state.subtext.length==0?[]:[this.state.subtext], subtext:''})
                                        this.toggleModal();
                                        }}/>
                                <Button 
                                    title='cancel'
                                    style={styles.openButton}
                                    color='gray'
                                    onPress={this.toggleModal}/>
                            </View>
                        </Card>
                    </View>
                </Modal>
            </>
        )
    }
}


const styles = StyleSheet.create({
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'        
    },
    modalView: {
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: "center"
    },
    openButton: {
      padding: 10,
      margin: 10
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    textBox:{
        alignSelf: "center",
        width:'80%',
        marginBottom:15,
        borderBottomColor:'black',
        borderBottomWidth:1
    }
  });
  