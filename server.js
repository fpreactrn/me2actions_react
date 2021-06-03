const express = require('express');
const app = express();
const port = process.env.PORT || 4012;
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const dbUrl = process.env.dbUrl

mongoose.connect(dbUrl, {
  useUnifiedTopology: true, 
  useNewUrlParser: true
}, function(err, res){
  if (err) {
    console.log('database connection failed: '+err)
  } else {
    console.log('database successfully connected to: '+dbUrl)
  }
});

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();

  if (user) {
    res.json({
      message: 'user already exists'
    });
    return;
  }

  User.create({ username, password });
  res.json({
    username,
    password
  });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
  
    if (!user || user.password !== password)  {
      res.json({
        message: 'invalid login'
      });
      return;
    };
  
    res.json({
      message: 'logged in'
    });
  });

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
};


app.listen(port, () => {
  console.log(`Server listening at: ${port}`);
});