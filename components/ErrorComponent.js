import React from 'react'
import { Card, Text } from 'react-native-elements'

export default function Error({ error }) {
    return (
        <Card title="Error">
            <Text>
                Page cannot be found, are you sure? {error.error}{' '}
                {error.message}
            </Text>
        </Card>
    )
}
