const mongoose = require('mongoose')
const User = mongoose.model('users')
const Goal = mongoose.model('goals')

module.exports = app => {
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send({ user: req.user }).end()
  })

  app.get('/api/goals', async (req, res) => {
    const goals = await Goal.find({ createdBy: req.user }).exec()
    res.send({ goals: goals }).end()
  })

  app.post('/api/goals', async (req, res) => {
    const goal = await Goal.create({ ...req.body.subGoal, createdBy: req.user })
    const parent = await Goal.findOne({ _id: req.body.parent }).exec()
    parent.subGoals.push(goal)
    parent.save()
    res.send({ goal: goal }).end()
  })

  app.put('/api/goals/:goalId', (req, res) => {
    console.log(req)
    Goal.findOneAndUpdate(
      { _id: req.body._id },
      { ...req.body },
      { upsert: false },
      function(err, doc) {
        if (err) return res.send(500, { error: err })
        return res.send('succesfully saved')
      }
    ).exec()
  })
}
