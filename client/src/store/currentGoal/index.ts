const SET_CURRENT_GOAL = 'SET_CURRENT_GOAL'

const setCurrentGoal = (data: object) => (dispatch: Function) => {
  return dispatch({ type: SET_CURRENT_GOAL, payload: data })
}

const currentGoalReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_CURRENT_GOAL:
      return action.payload
    default:
      return state
  }
}

export { setCurrentGoal, currentGoalReducer }
