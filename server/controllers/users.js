var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.post("/api/users", function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err, user) {
    if (err) {
      return console.error(err);
    }
    res.status(201).json(user);
  });
});

router.get("/api/users", function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.json({
      users: users,
    });
  });
});

router.get("/api/users/:id", function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  });
});

//wrong ?
router.delete('/api/users', function (req, res, next) {
  User.deleteMany({}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({
        'message': 'User not found'
      });
    }
    res.json(user);
  });
});


router.delete("/api/users/:id", function (req, res, next) {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  });
});

router.put("/api/users/:id", function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    res.json(user);
  });
});

module.exports = router;
