import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loading = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator
                size="large"
                color="black"
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    backgroundColor: 'white',
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
})
