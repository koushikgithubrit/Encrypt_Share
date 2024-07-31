const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/register', (req, res) => {
  const userData = req.body;

  let users = JSON.parse(fs.readFileSync('users.json'));

  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    return res.status(400).send('Email already registered');
  }

  userData.id = Date.now().toString();

  users.push(userData);

  fs.writeFileSync('users.json', JSON.stringify(users));

  res.send('User registered successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
