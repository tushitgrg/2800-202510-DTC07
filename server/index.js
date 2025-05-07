const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require('dotenv').config()
const passportConfig = require("./utils/google_auth");
const authRoutes = require("./controllers/authController");
const resourceRoutes = require("./routes/resourceRoutes");
const MongoStore = require("connect-mongo");
const isAuthenticated = require("./controllers/authMiddleware");
require("./utils/db");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend origin
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/", authRoutes);
app.use(isAuthenticated);
app.get("/", (req, res) => {
  res.json(req.user);
});

app.get("/dashboard", (req, res) => {
  if (!req.user) {
    res.redirect("/auth/google");
    return;
  }
  res.json(req.user);
});

app.use("/resources", resourceRoutes);
// app.use('/quiz', quizRoutes)
// app.use("/flashcard", flashcardRoutes);

if (process.env.VERCEL !== '1') {
  app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`);
  });
}

module.exports = app;