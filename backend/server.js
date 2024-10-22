const express = require('express')
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors')

const db = new sqlite3.Database('./testdb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', cors(), (req, res) => {
  let query = `SELECT * FROM users WHERE login = '${req.body.login}' AND password = '${req.body.password}'`

  db.get(query, (err, row) => {
    if (err) {
      console.error(err.message);
    }

    if (row) {
      res.send("User found")
    } else {
      res.send("User not found")
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})