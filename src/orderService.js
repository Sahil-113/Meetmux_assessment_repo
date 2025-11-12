const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let orders = [];
let orderId = 1;

app.post('/orders', async (req, res) => {
  const { userId, product, amount } = req.body;
  if (!userId || !product || !amount) return res.status(400).json({ error: 'Missing fields' });

  try {
    const userRes = await axios.get(`http://localhost:5000/users/${userId}`);
    const user = userRes.data;

    const newOrder = { id: orderId++, userId, product, amount };
    orders.push(newOrder);
    res.status(201).json({ message: 'Order created', user, order: newOrder });
  } catch (err) {
    res.status(404).json({ error: 'User not found, order not created' });
  }
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.listen(5001, () => console.log('Order Service running on port 5001'));
