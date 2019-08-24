const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "1",
      name: "joe",
      email: "joe@gmail.com",
      password: "joe",
      entries: 0,
      joined: new Date()
    },
    {
      id: "2",
      name: "emily",
      email: "emily@gmail.com",
      password: "emily",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "3",
      hash: "",
      email: "nick@gmail.com"
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "123",
    "$2a$10$H171trn.OjJHtyDa1rrss.Bn/3pLlqRYueEgQBOAoXzjFBk9zuqcm",
    function(err, res) {
      console.log("right", res);
    }
  );
  bcrypt.compare(
    "not_bacon",
    "$2a$10$H171trn.OjJHtyDa1rrss.Bn/3pLlqRYueEgQBOAoXzjFBk9zuqcm",
    function(err, res) {
      console.log("wrong", res);
    }
  );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.log(hash);
    });
  });

  database.users.push({
    id: "3",
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("no such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
/ --> res = this is working
/signIn -> POST = success/fail
/register -> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
