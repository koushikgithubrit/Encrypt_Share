app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/login');
    }
      const users = JSON.parse(fs.readFileSync('users.json'));
  
    const user = users.find(user => user.id === req.session.userId);
      res.send(`Welcome, ${user.firstname} ${user.lastname}! <a href="/logout">Logout</a>`);
  });
  