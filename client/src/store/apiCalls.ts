import axios from 'axios'
import { setUser } from './auth'
import { addSubGoal, setGoal, setGoals, GoalInterface } from './goals'
import { setFetchGoalsStatus, FETCH_GOAL_STATUSES } from './fetchGoalStatus'
import { setCurrentGoal } from './currentGoal'
import { setBaseGoal } from './baseGoal'

const fetchUser = () => async (dispatch: Function) => {
  const res = await axios.get('/api/current_user')
  if (res.data.user) dispatch(setUser(res.data.user))
}

const fetchGoals = () => async (dispatch: Function) => {
  setFetchGoalsStatus(FETCH_GOAL_STATUSES.PENDING)(dispatch)
  try {
    const res = await axios.get('/api/goals')
    const goals = res.data.goals
    dispatch(setGoals(goals))
    let rootGoals = goals.filter((goal: any) => goal.rootGoal)
    dispatch(setBaseGoal(rootGoals[0]))
    dispatch(setCurrentGoal(rootGoals[0]))
    dispatch(setFetchGoalsStatus(FETCH_GOAL_STATUSES.SUCCESS))
  } catch (e) {
    dispatch(setFetchGoalsStatus(FETCH_GOAL_STATUSES.FAILURE))
  }
}

const createGoal = (goal: GoalInterface) => async (dispatch: Function) => {
  const res = await axios.post('/api/goals', goal)
  dispatch(setGoal(res.data.goal))
  dispatch(addSubGoal({ _id: goal.parent, subGoal: res.data.goal }))
  dispatch(setCurrentGoal(res.data.goal))
}

const updateGoal = (goal: GoalInterface) => async (dispatch: Function) => {
  axios.put(`/api/goals/${goal._id}`, goal)
  dispatch(setGoal(goal))
}

export { fetchUser, fetchGoals, createGoal, updateGoal }
