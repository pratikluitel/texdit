import React from 'react'
import {YellowBox} from 'react-native'
import Main from './components/MainComponent'
import {Loading} from './components/LoadingComponent'
import {ConfigureStore} from './redux/configureStore'
import {Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

const {persistor, store} = ConfigureStore();

export default class App extends React.Component {
  componentDidMount(){
    YellowBox.ignoreWarnings(['componentWillReceiveProps'])
    YellowBox.ignoreWarnings(['componentWillMount'])
  }
  render(){
    return (
        <Provider store ={store}>
          <PersistGate
          loading={<Loading/>}
          persistor={persistor}>
              <Main/>
          </PersistGate>
        </Provider>
    );
  }
}
