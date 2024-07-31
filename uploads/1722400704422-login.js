app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const users = JSON.parse(fs.readFileSync('users.json'));
  
    const user = users.find(user => user.email === email);
  
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid email or password');
    }

    req.session.userId = user.id;
  
    res.redirect('/dashboard');
  });
  