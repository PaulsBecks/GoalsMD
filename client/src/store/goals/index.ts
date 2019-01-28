const SET_GOAL = 'SET_GOAL'
const SET_GOALS = 'SET_GOALS'
const ADD_SUB_GOAL = 'ADD_SUB_GOAL'

const _ = require('lodash')

export interface GoalInterface {
  text: string
  _id: string
  subGoals: Array<string>
  parent: string
  finished: boolean
}

export interface GoalsInterface {
  [name: string]: GoalInterface
}

const setGoal = (data: object) => async (dispatch: Function) => {
  dispatch({ type: SET_GOAL, payload: data })
}

const setGoals = (data: object) => async (dispatch: Function) => {
  dispatch({ type: SET_GOALS, payload: data })
}

const addSubGoal = (data: object) => async (dispatch: Function) => {
  dispatch({ type: ADD_SUB_GOAL, payload: data })
}

const goalsReducer = (state: GoalsInterface = {}, action: any) => {
  switch (action.type) {
    case SET_GOAL:
      const goal = _.keyBy([action.payload], '_id')
      return { ...state, ...goal }
    case SET_GOALS:
      const goals = _.keyBy(action.payload, '_id')
      return { ...state, ...goals }
    case ADD_SUB_GOAL:
      let parentGoal = { ...state[action.payload._id] }
      parentGoal.subGoals.push(action.payload.subGoal._id)
      const goalWithNewSubGoal = _.keyBy([parentGoal], '_id')
      return { ...state, ...goalWithNewSubGoal }
    default:
      return state
  }
}

export { setGoal, setGoals, addSubGoal, goalsReducer }
