const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const TodoModel = require('./Modules/userModule');

app.use(cors());
app.use(express.json());

require('dotenv').config();  

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    console.error('Error details:', err.message);
    console.error('Error code:', err.code);
    console.error('Error stack:', err.stack);
  });

app.post('/add', (req, res) => {
  const { task, description } = req.body;
  TodoModel.create({ task, description })
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update route
app.put('/update/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndUpdate(id, { done: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Delete route
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Edit route
app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task, description } = req.body;

  TodoModel.findByIdAndUpdate(id, { task, description }, { new: true })  // Adding { new: true } to return the updated document
    .then(result => {
      if (!result) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../todolist/build')));

  // Handle all routes with index.html from React
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../todolist/build/index.html'));
  });
}

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
