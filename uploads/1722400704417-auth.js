function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next(); 
    } else {
      res.redirect('/login'); 
    }
  }
  
  app.get('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/login');
  });
  