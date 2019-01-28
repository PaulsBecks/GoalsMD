const passport = require('passport')

module.exports = app => {
  app.get('/auth/bitbucket', passport.authenticate('bitbucket'))

  app.get(
    '/auth/bitbucket/callback',
    passport.authenticate('bitbucket', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/')
    }
  )

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/auth/github', passport.authenticate('github'))

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    }
  )
}
