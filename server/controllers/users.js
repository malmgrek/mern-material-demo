const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../configs");

const User = require("../models/User");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");


const register = (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {

    if (user) {
      return res.status(400).json({ email: "Email already exists." })
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });

  });

}


const login = (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(400).json({ emailnotfound: "Email not found." })
    }

    bcrypt.compare(password, user.password).then(isMatch => {

      if (isMatch) {

        const payload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 365 * 24 * 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: token
            })
          }
        );

      } else {
        return res.status(400).json({
          passwordincorrect: "Password incorrect."
        });
      }

    });

  });

}


const verifyToken = (req, res, next) => {

  const token = req.headers["x-access-token"];

  if (token) {

    jwt.verify(token, config.secretOrKey, (err, decoded) => {

      if (err) {
        return res.status(401).json({
          success: false,
          message: "Failed to authenticate token."
        })
      } else {
        User.findById(decoded.id, (err, user) => {
          if (err) res.send(err);
          req.currentUser = user;
          next();
        })
      }

    });

  } else {
    return res.status(401).json({
      success: false,
      message: "No token given."
    })
  }

}


module.exports = {
  register,
  login,
  verifyToken
};
