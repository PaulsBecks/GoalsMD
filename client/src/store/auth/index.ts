const SET_USER = 'SET_USER'

export interface UserInterface {
  token: String
}

const setUser = (user: UserInterface) => (dispatch: Function) => {
  return dispatch({
    type: SET_USER,
    user,
  })
}

const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export { SET_USER, setUser, authReducer }
