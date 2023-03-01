import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { accountReducers } from './account/reducers'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setAuthToken } from '../helpers';
import { usersReducers } from './users/reducers';
import { alertReducer } from './alert/reducers';
import { notificationReducer } from './notification/reducers';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['account']
}

const rootReducer = combineReducers({
	account: accountReducers,
	users: usersReducers,
	alert: alertReducer,
	notification: notificationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	
	return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
}

const store = configureStore();
const persistedStore = persistStore(store);

let currentState = store.getState() as AppState;

store.subscribe(() => {
	let previousState = currentState;
	currentState = store.getState() as AppState;
	if (previousState.account.token !== currentState.account.token) {
		const token = currentState.account.token;
		if (token) {
			setAuthToken(token);
		}
	}
})

export { store, persistedStore };
