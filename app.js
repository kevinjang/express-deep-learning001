var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("express-jwt");
var debug = require("debug")("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authorizeRouter = require("./routes/oauth/authorize");

var app = express();
app.use(
  require("compression")({
    level: 1,
  })
);
// app.all(function(req, res, next){
//   console.log('app all route')
//   debug('booting %o', 'my app');
//   next();
// })

app.all("/").get((req, res, next) => {
  console.log("app all route");
  debug("booting %o", "my app");
  next();
});
app.use(require("helmet")());
app.get("/protected", jwt({ secret: "my-secret", algorithms: ["HS256"] })),
  function (req, res) {
    if (!req.user.admin) return res.send("wtf?");
    res.send(200);
  };
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const fs = require("fs");
const secret = fs.readFileSync("./utils/secret.txt").toString();
// console.log('appjs secret:', secret);
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/attachment", require("./routes/attachment"));
app.use("/authorize", authorizeRouter);
app.use("/downloadimage", require("./routes/download"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
