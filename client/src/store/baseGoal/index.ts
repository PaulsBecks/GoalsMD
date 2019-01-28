const SET_BASE_GOAL = 'SET_BASE_GOAL'

const setBaseGoal = (data: object) => async (dispatch: Function) => {
  dispatch({ type: SET_BASE_GOAL, payload: data })
}

const baseGoalReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_BASE_GOAL:
      return action.payload
    default:
      return state
  }
}

export { setBaseGoal, baseGoalReducer }
