import * as React from 'react'

import { Linking } from 'react-native'
import '../shared/appInfo'

export default class App extends React.Component {
    render() {
        const openLink = async () =>
            await Linking.openURL(
                `https://www.reddit.com/api/v1/authorize?client_id=${info.clientId}&response_type=${info.responseType}&state=${info.state}&redirect_uri=${info.redirectUri}&duration=${info.duration}&scope=${info.scope}`
            )
        return openLink()
    }
}
