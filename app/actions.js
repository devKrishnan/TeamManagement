export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const SHOW_ALL_MEMBERS = 'SHOW_ALL_MEMBERS'
export const DELETE_MEMBER = 'DELETE_MEMBER'


export function addMember(memberInfo) {
  return { type: ADD_MEMBER, memberInfo }
}
export function editMember(memberInfo) {
  return { type: EDIT_MEMBER, memberInfo }
}
export function deleteMember(memberId) {
  return { type: DELETE_MEMBER, memberId }
}
export function showMembers() {
  return { type: SHOW_ALL_MEMBERS, memberInfo }
}
