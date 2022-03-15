const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const dotenv = require('dotenv');
//const passport = require("passport");
//const passportLocalMongoose = require("passport-local-mongoose");
const adminAuth=require('./routes/adminRoute');
const managerAuth=require('./routes/managerRoute');
// const user = require('./models/user');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
//connecting db
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to MongoDB")
); 


app.use("/admin",adminAuth);
app.use("/manager",managerAuth);





// app.use(session({
//     secret: "Our Little Secret.",
//     resave: false,
//     saveUninitialized: false
// }));



// app.use(passport.initialize());
// app.use(passport.session());

// mongoose.connect("mongodb://localhost:27017/warehouseDB");

// const userSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     manager_type: String
// });

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function (user, done) {
//     done(null, user._id);
//     // if you use Model.id as your idAttribute maybe you'd want
//     // done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

// app.get("/", function (req, res) {
//     res.render("signup");
// });
// app.post("/", function (req, res) {
//     const tmp = new User({
//         username: req.body.username2,
//         password: req.body.password2,
//         manager_type: req.body.listbox2
//     });
//     req.login(tmp, function (err) {
//         if (err)
//             console.log(err);
//         else {
//             console.log("where");
//             passport.authenticate("local")(req, res, function () {
//                 console.log("here");
//                 res.redirect("manager");
//             });
//         }
//     })
// });
// app.post("/signup", function (req, res) {
//     console.log(req.body.name1);
//     const tmp = {
//         username: req.body.email1,
//         name: req.body.name1,
//         manager_type: req.body.listbox1
//     };
//     User.register(
//         tmp
//     , req.body.password1, function (err, user) {
//         if (err) {
//             console.log(tmp);
//             console.log(err);
//         }
//         else {
//             console.log("where");
//             passport.authenticate("local")(req, res, function () {
//                 console.log("here");
//                 res.redirect("manager");
//             });
//         }
//     });
// });

// app.get("/manager", function (req, res) {
//     // res.render("manager");
//     if (req.isAuthenticated())
//         res.render("manager");
//     else
//         res.redirect("/");
// });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});