const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const TodoModel = require('./Modules/userModule');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post('/add', (req, res) => {
  const { task , description } = req.body;

  TodoModel.create({ task ,description })
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.status(200).json(result)) // return the actual result
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update route
app.put('/update/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndUpdate(id, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete route (use DELETE method)
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task , description } = req.body;

  TodoModel.findByIdAndUpdate(id, { task ,description })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
