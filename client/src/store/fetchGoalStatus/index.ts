const SET_FETCH_GOALS_STATUS = 'SET_FETCH_GOALS_STATUS'

const FETCH_GOAL_STATUSES = {
  NOT_FETCHED: 'NOT_FETCHED',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}
const setFetchGoalsStatus = (fetchGoalStatus: string) => (
  dispatch: Function
) => {
  return dispatch({ type: SET_FETCH_GOALS_STATUS, payload: fetchGoalStatus })
}

const fetchGoalsStatusReducer = (
  state = FETCH_GOAL_STATUSES.NOT_FETCHED,
  action: any
) => {
  switch (action.type) {
    case SET_FETCH_GOALS_STATUS:
      return action.payload
    default:
      return state
  }
}

export { setFetchGoalsStatus, fetchGoalsStatusReducer, FETCH_GOAL_STATUSES }
