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
    // Log the error details for better debugging
    console.error('Error details:', err.message);
    console.error('Error code:', err.code);
    console.error('Error stack:', err.stack);
  });



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

if (process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname ,"/todolist/dist")));
  app.get("/*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"todolist","dist","index.html"))
  });
}
const Port = process.env.PORT || 5000 ;

app.listen( Port , () => {
  console.log(`Server running on port ${Port}`);
});