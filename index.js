// implement your API here
const express = require("express");
const cors = require("cors");
const users = require("./data/db.js");
const server = express();
let ids;

const port = 5000;
const parser = express.json();

server.use(parser);
server.use(cors());

users.find().then(user => {
  let uIds = user.map(user => {
    return user.id;
  });
  ids = uIds;
});

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
  if (ids.includes(Number(id))) {
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
  if (ids.includes(Number(id))) {
    if (updateContent.name && updateContent.bio) {
      users
        .update(id, updateContent)
        .then(user => {
          res.status(200).json({ success_code: user });
        })
        .catch(err => {
          res
            .status(500)
            .json({ Error: "The user information could not be modified." });
        });
    } else {
      res
        .status(400)
        .json({ Error: "Please provide name and bio for the user." });
    }
  } else {
    res
      .status(404)
      .json({ Message: "The user with the specified ID does not exist." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (ids.includes(id)) {
    users
      .remove(id)
      .then(user => {
        res.status(200).json({ success_code: user });
      })
      .catch(err => {
        res.status(500).json({ Error: "The user could not be removed." });
      });
  } else {
    res
      .status(404)
      .json({ Message: "The user with the specified ID does not exist." });
  }
});

server.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
