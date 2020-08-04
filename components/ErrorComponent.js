import React from 'react'
import { Card, Text } from 'react-native-elements'

export default function Error({ error }) {
    return (
        <Card
            title="Error"
            titleStyle={{
                marginHorizontal: 0,
                textAlign: 'left',
                fontSize: 18,
                marginBottom: 10,
                color: 'white',
            }}
            containerStyle={{
                backgroundColor: '#474747',
                borderColor: '#474747',
                marginHorizontal: 0,
                marginVertical: 0,
            }}
        >
            <Text style={{ color: 'white' }}>
                Page cannot be found, are you sure? {error.error}{' '}
                {error.message}
            </Text>
        </Card>
    )
}
