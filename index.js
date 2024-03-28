const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Data schema
const dataSchema = new mongoose.Schema({
  name: String,
  description: String
});
const Data = mongoose.model('Data', dataSchema);

// Routes CRUD
// Create
app.post('/data', (req, res) => {
  const newData = new Data(req.body);
  newData.save()
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Read
app.get('/data', (req, res) => {
  Data.find({}, (err, data) => {
    if (err) {
      res.status(500).send("Error fetching data");
    } else {
      res.json(data);
    }
  });
});

// Update
app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  Data.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedData => {
      res.json(updatedData);
    })
    .catch(err => {
      res.status(400).send("Unable to update data");
    });
});

// Delete
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  Data.findByIdAndDelete(id)
    .then(() => {
      res.send('Deleted');
    })
    .catch(err => {
      res.status(400).send("Unable to delete data");
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
