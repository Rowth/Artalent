import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../Reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * Redux Setting
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 100000,
};

let middleware = [thunk, logger];
if (true) {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
const persistor = persistStore(store);

export {store, persistor};
