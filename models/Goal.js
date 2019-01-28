const mongoose = require('mongoose')
const { Schema } = mongoose

const goalSchema = new Schema({
  text: {
    type: Schema.Types.String,
    default: '# I want to fly to the moon! :rocket:\n Enter your code here.',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  subGoals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'parentGoal' }],
  rootGoal: { type: Schema.Types.Boolean, default: false },
  finished: { type: Schema.Types.Boolean, default: false },
})

mongoose.model('goals', goalSchema)
