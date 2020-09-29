import 'fontsource-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import {theme} from './my-theme';
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
