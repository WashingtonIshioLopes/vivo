const userModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const register = (req, res) => {
  const newUser = req.body;
  
  userModel.findUserByCPF(newUser.CPF, (err, existingUser) => {
    if (err) {
      console.log('There was a problem checking for existing user.');
      console.log(err);
      return res.status(500).send('There was a problem checking for existing user.');
    }
    
    if (existingUser) {
      console.log('User already exists.');
      return res.status(400).send('User already exists.');
    }  
  });

  userModel.createUser(newUser, (err, result) => {
    if (err) {
      console.log('There was a problem registering the user.');
      console.log(err);
      return res.status(500).send('There was a problem registering the user.');
    }
    res.status(201).send(result);
  });
};

const login = (req, res) => {
  console.log(req.body);
  const { CPF, Senha } = req.body;
  userModel.findUserByCPF(CPF, (err, user) => {
    if (err) {
      console.log('Error on the server.');
      return res.status(500).send('Error on the server.');
    }
    if (!user) {
      console.log('No user found.');
      return res.status(404).send('No user found.');
    }
    
    const passwordIsValid = bcrypt.compareSync(Senha, user.Senha);
    if (!passwordIsValid) {
      console.log("Password invalid !");
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.Id }, config.secret, { expiresIn: config.expiresIn });
    res.status(200).send({ auth: true, token });
    console.log("LOGIN OK");
  });
};

const login2 = (req, res) => {
  console.log(req.body);
  const { Email, Senha } = req.body;
  userModel.findUserByEmail(Email, (err, user) => {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    
    const passwordIsValid = bcrypt.compareSync(Senha, user.Senha);
    if (!passwordIsValid) {
      console.log("Password invalid !");
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.Id }, config.secret, { expiresIn: config.expiresIn });
    res.status(200).send({ auth: true, token });
    console.log("LOGIN OK");
  });
};

const getUser = (req, res) => {
  userModel.findUserById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).send('There was a problem finding the user.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    res.status(200).send(user);
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  userModel.updateUser(id, updatedUser, (err, result) => {
    if (err) {
      return res.status(500).send('There was a problem updating the user.');
    }
    res.status(200).send(result);
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).send('There was a problem deleting the user.');
    }
    res.status(200).send(result);
  });
};

module.exports = {
  register,
  login,
  login2,
  getUser,
  updateUser,
  deleteUser
};
