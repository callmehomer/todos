const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
const path = require('path');

const app = express()
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pass = "password"

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: "8080",
        user: "root",
        password: pass,
        database: "todo"
    })
}

const conn = getConnection()

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/frontend/', (req, res) => {
    res.send(path.join('/frontend/index.html'));
    res.sendFile(path.join('/frontend/index.html'));

});

app.get('/get_todos', (req, res) => {
    const queryString = "SELECT * FROM todos WHERE complete = '0'"
    conn.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query @ /get_todo: " + err)
            return null
        }
        console.log("Getting data from database @ /get_todos")
        res.json(rows)
    })
})

app.post('/add_todo', (req, res) => {
    console.log(req.body)
    const todo = req.body.add_todo_input
    const queryString = "INSERT INTO todos (todo) VALUES (?)"
    conn.query(queryString, [todo], (err, row, fields) => {
        if (err) {
            console.log("Failed to insert @ /add_todo: " + todo + " " + err)
            return null
        }
        console.log("@/add_todo : " + todo + " added.")
        res.redirect('/')
    })
})

app.post('/complete_todo/:id', (req,res) => {
    const todo_id = req.params.id
    const queryString = "UPDATE todos SET complete ='1' WHERE todo_id = ?"
    conn.query(queryString, [todo_id], (err, rows, fields) => {
        if(err){
            console.log("Failed to complete todo @ /complete_todo: " + todo_id + " " + err)
            return null
        }
        console.log("@/complete_todo/ completing todo with id " + todo_id)
        res.redirect('/')
    })
})

app.listen(5500, () => {
    console.log('App running at http://localhost:5500')
})
