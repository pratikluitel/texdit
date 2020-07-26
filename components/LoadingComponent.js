import React from 'react'
import { ActivityIndicator, StyleSheet, View} from 'react-native'

const styles= StyleSheet.create({
    loadingView:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'white'
    }
});

export const Loading = ()=>{
    return(
        <View style={styles.loadingView}>
            <ActivityIndicator size="large"/>
        </View>
    )
}