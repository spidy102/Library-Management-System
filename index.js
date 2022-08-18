const mysql = require("mysql")
const dotenv = require("dotenv").config()
const path = require("path")

const express = require("express")

const app = express()
const cors = require("cors")

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
})

connection.connect((err) => {
  if (err) throw err
  console.log("Connected successfully to server!")
})

global.db = connection

app.use(express.json())
app.use(cors())
app.use(express.static("client/build"))
app.use("/api/v1", require("./routes"))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

// PORT for this Web Application
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}
