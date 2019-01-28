const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const GitHubStrategy = require('passport-github').Strategy
const GoogleStrategie = require('passport-google-oauth20')
const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy

const User = mongoose.model('users')
const Goal = mongoose.model('goals')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

const userLoginProcess = async (id, done) => {
  try {
    let user = await User.findOne(id)
    if (!user) {
      user = await new User(id).save()
      await new Goal({
        createdBy: user,
        rootGoal: true,
      }).save()
    }
    done(null, user)
  } catch (err) {
    done(err, null)
  }
}

passport.use(
  new BitbucketStrategy(
    {
      clientID: keys.bitbucketClientID,
      clientSecret: keys.bitbucketSecret,
      callbackURL: '/auth/bitbucket/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      userLoginProcess({ bitbucketId: profile.id }, done)
    }
  )
)

passport.use(
  new GoogleStrategie(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      userLoginProcess({ googleId: profile.id }, done)
    }
  )
)

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubSecret,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      userLoginProcess({ githubId: profile.id }, done)
    }
  )
)
