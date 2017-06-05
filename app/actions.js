export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const DELETE_MEMBER = 'DELETE_MEMBER'


export function addMember(memberInfo) {
  memberInfo.uniqueId = generateUUID()
  return { type: ADD_MEMBER, memberInfo }
}
export function editMember(memberInfo, index) {
  return { type: EDIT_MEMBER, memberInfo, index }
}
export function deleteMember(index) {
  return { type: DELETE_MEMBER, index }
}

//https://stackoverflow.com/a/8809472/189006
function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
