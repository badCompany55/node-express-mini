// implement your API here
const express = require("express");
const users = require("./data/db.js");
const server = express();
let ids = [];

const port = 5000;
const parser = express.json();

users.find().then(user => {
  let uIds = user.map(user => {
    return user.id;
  });
  ids.push(uIds);
});

console.log(ids);
server.use(parser);

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ Error: "The users information could not be retrieved." });
    });
});

server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;

  if (ids.includes(id)) {
    users
      .findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ Error: "The user information could not be retrieved." });
      });
  } else {
    res
      .status(404)
      .json({ Message: "The user with the specified ID does not exisit" });
  }
});

server.post("/api/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    users
      .insert(req.body)
      .then(user => {
        res.status(201).json({ success: true, User: user });
      })
      .catch(err => {
        res.status(500).json({
          Error: "There was an error while saving the user to the database."
        });
      });
  } else {
    res.json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updateContent = req.body;
  users
    .update(id, updateContent)
    .then(user => {
      res.status(200).json({ success_code: 1 });
    })
    .catch(err => {
      console.log(err);
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  users
    .remove(id)
    .then(user => {
      res.status(200).json({ success_code: user });
    })
    .catch(err => {
      console.log(err);
    });
});

server.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
