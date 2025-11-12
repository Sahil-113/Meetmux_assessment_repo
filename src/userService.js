const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let userId = 1;

app.post('/users', (req,w,res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  const newUser = { id: userId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(5000, () => console.log('User Service running on port 5000'));
