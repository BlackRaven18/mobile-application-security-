const fs = require('fs');
const https = require('https');
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

const privateKey = fs.readFileSync('certificate/private.key', 'utf8');
const certificate = fs.readFileSync('certificate/cert.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};
//...

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000

https.createServer(credentials, app)
  .listen(443, () => {
    console.log('HTTPS server is running on https://localhost');
  });

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
      res.status(200).json({"message": "Success"});
    } else {
      res.status(401).json({"message": "Unauthorized"});
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})