import * as React from 'react';
import { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/rootReducer';
import AppNavigator from './src/navigators/AppNavigatior'
import MyAlert from './src/MyAlert'

const store = createStore(rootReducer, applyMiddleware(thunk));



export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MyAlert>
                    <AppNavigator />
                </MyAlert>
            </Provider>
        );
    }
}