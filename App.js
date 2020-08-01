import React from 'react'
import { YellowBox } from 'react-native'
import Main from './components/MainComponent'

export default class App extends React.Component {
    componentDidMount() {
        YellowBox.ignoreWarnings(['componentWillReceiveProps'])
        YellowBox.ignoreWarnings(['componentWillMount'])
        YellowBox.ignoreWarnings(['VirtualizedLists'])
    }
    render() {
        return <Main />
    }
}
