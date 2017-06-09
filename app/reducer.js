import { ADD_MEMBER, EDIT_MEMBER, DELETE_MEMBER } from './actions'
import { combineReducers } from 'redux'

const initialState = {
  members: []
}

const members = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return [
        ...state,
        action.memberInfo
      ]
    case EDIT_MEMBER:
      return state.map((member, index) => {
        if (index === action.index) {
          return Object.assign({}, member, action.memberInfo)
        }
        return member
      })
    case DELETE_MEMBER:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({ members })
export default rootReducer
