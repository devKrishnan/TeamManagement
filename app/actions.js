export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const DELETE_MEMBER = 'DELETE_MEMBER'

export function addMember (memberInfo) {
  return { type: ADD_MEMBER, memberInfo }
}
export function editMember (memberInfo, index) {
  return { type: EDIT_MEMBER, memberInfo, index }
}
export function deleteMember (index) {
  return { type: DELETE_MEMBER, index }
}
