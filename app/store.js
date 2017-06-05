import rootReducer from './reducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
export default function configureStore() {
  let store = createStore(rootReducer)
  return store
}
