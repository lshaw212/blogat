import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Setting up localstorage with State
const persistConfig = {
  key: 'root',
  storage
}

// Combining with the rootreducer to use in CreateStore
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export function configureStore(){
  const store = createStore(
    // persistedReducer,
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}