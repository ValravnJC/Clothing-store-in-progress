import logger from 'redux-logger';
import {compose, createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';


const loggerMiddleware = (store) => (next) => (action) => {
    console.log(action);
    if (!action.type){
        return next(action);
    }
    
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);
    console.log('nextState: ', store.getState());
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
//root-reducer
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer,undefined, composedEnhancers);

export const persistor = persistStore(store);