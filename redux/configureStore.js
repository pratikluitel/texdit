import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { comments } from './comments'
import { posts } from './posts'

export const ConfigureStore = () => {
    
    const config={
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config,{
            posts,
            comments,
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return {persistor, store}
}