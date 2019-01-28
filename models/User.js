const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  bitbucketId: String,
  githubId: String,
})

mongoose.model('users', userSchema)
