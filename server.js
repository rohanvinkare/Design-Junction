require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.Atlas_String);

const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));


//auth route
const authRoute = require("./routes/auth-routes.js");
app.use("/api", authRoute);

//admin route
const adminRoute = require("./routes/admin-routes.js");
app.use("/api/admin", adminRoute);

//category route
const commonRoute = require("./routes/common-routes.js");
app.use("/api", commonRoute);

//template route
const template = require("./routes/template-router.js")
app.use("/api", template);



// handling permissions for all routes
//express.Router()  --->  it is imp to add without this we will not get routes for that file 

const authMiddleware = require("./middlewares/auth-middleware.js");
const { onlyAdminAccess } = require("./middlewares/admin-middleware.js");
const routerController = require("./controllers/admin/router-controller.js");

app.get("/api/admin/all-routes", authMiddleware, routerController.getAllRoutes)


//============================pages to render===========================

app.get("/", (req, res) => {
  res.render("home");
})


app.get("/login", (req, res) => {
  res.render("login");
})


app.get("/admin-panel", (req, res) => {
  res.render("./admin/admin-panel");
})


app.get("/manager-panel", (req, res) => {
  res.render("./manager/manager-panel");
})


app.get("/api/get-user", (req, res) => {
  res.render("./internal/all-user-curd.ejs");
})



const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
