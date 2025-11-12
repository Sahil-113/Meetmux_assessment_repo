const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
let users = [];
let id = 1;
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: id++, name, email };
  users.push(user);
  res.status(201).json(user);
});

test('should create user', async () => {
  const res = await request(app).post('/users').send({ name: 'John', email: 'john@mail.com' });
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe('John');
});
