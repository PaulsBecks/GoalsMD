import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { baseGoalReducer } from './baseGoal'
import { goalsReducer } from './goals'
import { fetchGoalsStatusReducer } from './fetchGoalStatus'
import { currentGoalReducer } from './currentGoal'

export default combineReducers({
  auth: authReducer,
  baseGoal: baseGoalReducer,
  goals: goalsReducer,
  fetchGoalsStatus: fetchGoalsStatusReducer,
  currentGoal: currentGoalReducer,
})
