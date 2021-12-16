const express = require('express')
const pug = require('pug')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

db = low(adapter)

const app = express()

const port = 3001

// Set some defaults
db.defaults({ users: [] }).write();

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.render('index', {
    
  })
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  })
})

app.get('/users/search', (req, res) => {
  
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })

  res.render('users/index', {
    input: req.query.q,
    users: matchedUser
  })
})

app.get('/users/create', (req, res) => {
  res.render('users/create')
})

app.post('/users/create', (req, res) => {
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})