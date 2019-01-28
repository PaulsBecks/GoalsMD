import { GoalInterface, GoalsInterface } from '../store/goals'

interface Ratio {
  total: number
  finished: number
}

const getGoalFinishedRation = (
  goal: GoalInterface,
  goals: GoalsInterface
): Ratio => {
  const ownRatio = { total: 1, finished: goal.finished ? 1 : 0 }
  if (goal.subGoals.length === 0) return ownRatio
  return goal.subGoals.reduce(({ total, finished }, goalId) => {
    const goalRatio = getGoalFinishedRation(goals[goalId], goals)
    return {
      total: total + goalRatio.total,
      finished: finished + goalRatio.finished,
    }
  }, ownRatio)
}

export default getGoalFinishedRation
