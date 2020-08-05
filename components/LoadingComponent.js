import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loading = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator
                size="small"
                color="black"
                style={styles.loadingButtonSize}
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
    loadingButtonSize: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'white',
    },
})
