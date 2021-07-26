const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        name:"Ilya Kostin",
        title: "Weather"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        name:"Ilya Kostin",
        title: "About Me"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
       helpfulInfo: "Some helpful information",
       title: "Help",
       name: "Ilya Kostin"
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide a address term",
        })
    }
   // console.log("privet")
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
         }
       // console.log("glitch")
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastData,
                address
            })
        })  
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
      title: "404",
      name: "Ilya Kostin",
      errorMessage: "Help article not found",
    })
})

app.get("*", (req, res) => {
    res.render("404", {
      title: "404",
      name: "Ilya Kostin",
      errorMessage: "Page not found",
      })
})


app.listen(port, () => {
    console.log("Server is up on port " + port);
})