const express = require('express');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./controllers/authController');
const passportConfig = require('./utils/google_auth');

const quizRoutes = require("./routes/quizRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const resourceRoutes = require('./routes/resourceRoutes')

require('./utils/db');


const app = express();

app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use('/', authRoutes);
app.get('/', (req, res)=>{
  res.json(req.user)
})

app.get('/dashboard', (req, res)=>{
  if(!req.user){
    res.redirect('/auth/google')
    return
  }
  res.json(req.user)
})

app.use("/resources", resourceRoutes);
// app.use('/quiz', quizRoutes)
// app.use("/flashcard", flashcardRoutes);


app.listen(3001, () => {
  console.log('Server started on port 3001');
});
