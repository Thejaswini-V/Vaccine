const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const port = 5000; // Set your desired port

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); // Add this line to parse JSON requests

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vaccine',
});

connection.connect();

// Define a route to fetch data from MySQL
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM centres';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.put('/api/update/:SerialNumber', (req, res) => {
  const SerialNumber = req.params.SerialNumber;

  const query = 'UPDATE centres SET Slot = Slot + 1 WHERE SerialNumber = ?';

  connection.query(query, [SerialNumber], (error, results) => {
    if (error) {
      console.error('Error updating data in the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});
app.put('/api/decupdate/:SerialNumber', (req, res) => {
  const SerialNumber = req.params.SerialNumber;

  const query = 'UPDATE centres SET Slot = Slot - 1 WHERE SerialNumber = ?';

  connection.query(query, [SerialNumber], (error, results) => {
    if (error) {
      console.error('Error updating data in the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});
app.put('/api/delupdate/:SerialNumber', (req, res) => {
  const SerialNumber = req.params.SerialNumber;

  const query = 'DELETE from centres WHERE SerialNumber = ?';

  connection.query(query, [SerialNumber], (error, results) => {
    if (error) {
      console.error('Error updating data in the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});
app.post('/api/addcentre', (req, res) => {
  const {LocationName, CentreName, GovtOrPrivate, Address, Slot } = req.body;

  const query = 'INSERT INTO centres (LocationName, CentreName, GovtOrPrivate, Address, Slot) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [LocationName, CentreName, GovtOrPrivate, Address, Slot], (error, results) => {
    if (error) {
      console.error('Error adding data to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Centre added successfully' });
    }
  });
});

app.post('/api/AdminLogin', (req, res) => {
  const { email, password } = req.body;

  // Perform authentication logic here (compare with stored admin credentials)
  if (email === "admin@gmail.com" && password === "admin@123") {
    // Generate a token for successful authentication
    const token = jwt.sign({ email }, 'admin@123', { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log("hello");
// Close the MySQL connection when the server shuts down
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

