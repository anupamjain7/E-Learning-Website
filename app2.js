const express = require("express")
const path = require("path")
const app = express()
const port = 2000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect("mongodb://localhost/contact", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("Application Run Succesfully")
})
const kittySchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String,
  phone: Number,
  address: String,
  desc: String,
})

const Kitten = mongoose.model("Kitten", kittySchema)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))

app.get("/", function (req, res) {
  res.render("E-learning")
})
app.get("/E-learning", function (req, res) {
  res.render("E-learning")
})
app.get("/python", function (req, res) {
  res.render("python")
})
app.get("/courses", function (req, res) {
  res.render("courses")
})
app.get("/contact", function (req, res) {
  res.render("contact", { qs: req.query })
})

app.get("/videos", function (req, res) {
  res
    .send([
      {
        url: "SdH8fI1aNZA",
      }
      
    ])
    .status(200)
})

app.post("/contact", urlencodedParser, (req, res) => {
  let myData = new Kitten(req.body)
  myData
    .save()
    .then(() => {
      res.render("contact-success", { data: req.body })
      console.log(req.body)
    })
    .catch(() => {
      res.status(400).send("Item was not saved to the database")
    })
})

app.listen(port, () => {
  // console.log(`The application started successfully on port ${port}`)
})
