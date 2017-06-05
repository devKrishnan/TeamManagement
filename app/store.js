import rootReducer from './reducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
function configureStore() {
  let store = createStore(rootReducer)
  return store
}

export const store = configureStore()
