const express = require('express')
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors')
var AuthUtils = require('./AuthUtils');

const db = new sqlite3.Database('./testdb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {

  const authUtils = new AuthUtils();
  if (!authUtils.validateString(req.body.login) || !authUtils.validateString(req.body.password)) {
    res.send("Invalid data")
    return
  }

  const stmt = db.prepare("SELECT * FROM users WHERE login = ? AND password = ?");
  
  stmt.get([req.body.login, req.body.password], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (row) {
      res.status(200).send("User found")
    } else {
      res.status(404).send("User not found");

    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})