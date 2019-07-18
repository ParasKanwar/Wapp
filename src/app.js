const path = require("path");
const hbs = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
//defining paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../Template/views");
const partialPaths = path.join(__dirname, "../Template/partials");
//setup handel bars into express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPaths);
//setup static directory to serve.
app.use(express.static(publicDirectoryPath));

//setting routes for aur apps
app.get("", (req, res) => {
  res.render("index", {
    title: `Weather`,
    Name: "Paras"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    Name: "Paras"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    Name: "Paras",
    Home: "Home"
  });
});

app.get("/index", (req, res) => {
  res.render("index", {
    title: `Weather`,
    Name: "Paras"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send({ error: "Must provide Address" });
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) res.send({ error });
      else {
        forecast(latitude, longitude, (error, { body } = {}) => {
          if (error) res.send({ error });
          else {
            res.send({
              weather_details: body.currently,
              Location: location
            });
          }
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404_page", {
    title: "404 Error",
    Name: "Paras Kanwar",
    Error: "Content you've Searched Does not Exist"
  });
});
app.get("*", (req, res) => {
  res.render("404_page", {
    title: "404",
    Name: "Paras Kanwar",
    Error: "Page Can not Be found !!"
  });
});
//starting our server
app.listen(port, () => {
  console.log("Server Started " + port);
});
