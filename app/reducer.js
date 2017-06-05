import {ADD_MEMBER} from './actions'
import { combineReducers } from 'redux'

const initialState = {
  members: 0
}

const members = (state = initialState, action) => {
  debugger
  switch (action.type) {
    case ADD_MEMBER:
      return [
          ...state,
            action.memberInfo
        ]
    default:
      return state
  }
}

const rootReducer = combineReducers({ members })
export default rootReducer
