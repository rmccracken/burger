const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const exphbs = require("express-handlebars");
const port = process.env.PORT || 3000;

let app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const routes = require("./controllers/burger_controller.js"); 

app.use("/", routes);

app.listen(port);
