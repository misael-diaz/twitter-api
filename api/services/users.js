const users = require("../users/users");

const isAdmin = async (userID) => {

  const key = { username: "admin" };
  const admin = await users.findOne(key).exec();
  const { _id } = admin;
  const id = _id.toString();

  return ( (userID === id)? true : false );

};

const noRequestBody = (req, res) => {

  let stat = false;
  if ( !Object.hasOwn(req, 'body') )
  {
    const msg = "`body` missing from request";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const noUserInfo = (req, res) => {

  const { body } = req;

  let stat = false;
  if ( !Object.hasOwn(body, 'user') )
  {
    const msg = "`user` credentials missing from the request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const noUserName = (req, res) => {

  const { body } = req;
  const { user } = body;

  let stat = false;
  if ( !Object.hasOwn(user, 'username') )
  {
    const msg = "`username` missing from request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const noFirstName = (req, res) => {

  const { body } = req;
  const { user } = body;

  let stat = false;
  if ( !Object.hasOwn(user, 'firstName') )
  {
    const msg = "First Name missing from request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const noLastName = (req, res) => {

  const { body } = req;
  const { user } = body;

  let stat = false;
  if ( !Object.hasOwn(user, 'lastName') )
  {
    const msg = "Last Name missing from request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const noEmail = (req, res) => {

  const { body } = req;
  const { user } = body;

  let stat = false;
  if ( !Object.hasOwn(user, 'email') )
  {
    const msg = "email missing from request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const isEmail = (info) => {

  return ( ( (info.match(/(?:@)/g) || []).length === 0)? false : true );

};

const noPassword = (req, res) => {

  const { body } = req;
  const { user } = body;

  let stat = false;
  if ( !Object.hasOwn(user, 'password') )
  {
    const msg = "`password` missing from request body";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const validateLoginInfo = (req, res) => {

  let stat = noRequestBody(req, res);
  if (stat) return stat;

  stat = noRequestBody(req, res);
  if (stat) return stat;

  stat = noUserInfo(req, res);
  if (stat) return stat;

  stat = ( noUserName(req, res) || noPassword(req, res) );
  if (stat) return stat;

  const { body } = req;
  const { user } = body;
  const { username, password } = user;

  stat = false;
  if (username === "" || password === "")
  {
    const msg = "invalid user credentials";
    res.status(500).json({message: msg});
    stat = true;
  }

  return stat;

};

const dbSearch = async (key) => {

  const usr = await users.findOne(key).exec();

  if (usr != null)
  {
    let msg = "";
    for (const prop in key)
    {
      msg = `${key[prop]} already exist, choose another ${prop}`;
      break;
    }
    return ( new Promise( resolve => resolve(msg) ) );
  }
  else
  {
    return ( new Promise( resolve => resolve("") ) );
  }

};

const userExist = async (user) => {

  const { username, email } = user;
  let msg = await dbSearch({ username: username });
  if (msg !== "")
  {
    return ( new Promise( resolve => resolve(msg) ) );
  }

  msg = await dbSearch({ email: email });
  if (msg !== "")
  {
    return ( new Promise( resolve => resolve(msg) ) );
  }

  return ( new Promise( resolve => resolve("") ) );

};

const hasWhitespace = (str) => {

  const regex = /\s/;
  const match = (str.match(regex) || []);
  const spaces = match.length;
  return (spaces !== 0);

};

const isInvalidName = (str) => {

  const regex = /([A-Z][a-z]+)/;
  const match = (str.match(regex) || [[]]);
  return (match[0].length !== str.length);

};

const isInvalidEmail = (str) => {

  const email = str.toLowerCase();
  const re = /([a-z]+([-\._][a-z]+){0,1}[0-9]*@([a-z]+\.)+[a-z]{3}(\.[a-z]{2}){0,1})/;
  const match = (email.match(re) || [[]]);
  return (match[0].length !== str.length);

};

const isInvalidPassword = (str) => {

  const regex = /([-\.\w]+)/;
  const match = (str.match(regex) || [[]]);
  return (match[0].length !== str.length);

};

const isWeakPassword = (str) => {

  const numbers = (str.match(/(?:[0-9])/g) || []).length;
  const symbols = (str.match(/(?:[-\._])/g) || []).length;
  const capital = (str.match(/(?:[A-Z])/g) || []).length;

  return (numbers === 0 || symbols === 0 || capital === 0)? true : false;

};

const validateSignUpInfo = async (req, res) => {

  // validates request:

  let stat = noRequestBody(req, res);
  if (stat) return stat;

  stat = noUserInfo(req, res);
  if (stat) return stat;

  stat = ( noFirstName(req, res) || noLastName(req, res) || noEmail(req, res) );
  if (stat) return stat;

  stat = ( noUserName(req, res) || noPassword(req, res) );
  if (stat) return stat;

  // gets user info from request via deconstruction:

  const { body } = req;
  const { user } = body;
  const { firstName, lastName, email, username, password } = user;

  // validates user info:

  stat = false;
  if (firstName === "" || lastName === "")
  {
    const msg = "invalid user info";
    res.status(500).json({message: msg});
    stat = true;
    return stat;
  }

  stat = false;
  if (email === "" || username === "" || password === "")
  {
    const msg = "invalid user info";
    res.status(500).json({message: msg});
    stat = true;
    return stat;
  }

  stat = false;
  for (const prop in user)
  {
    if ( hasWhitespace(user[prop]) )
    {
      const msg = `${prop} has whitespace`;
      res.status(500).json({ message: msg });
      stat = true;
      return stat;
    }
  }

  stat = false;
  if ( isInvalidName(firstName) )
  {
    const msg = "First Name is not capitalized or has numbers and/or special " +
      "characters";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  stat = false;
  if ( isInvalidName(lastName) )
  {
    const msg = "Last Name is not capitalized or has numbers and/or special " +
      "characters";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  stat = false;
  if ( isInvalidEmail(email) )
  {
    const msg = "invalid email, consider the following valid examples: " +
      "firstName@gmail.com, firstName17@gmail.com, firstName.lastName@gmail.com, " +
      "firstName-lastName@gmail.com, firstName_lastName@gmail.com, " +
      "firstName.lastName17@gmail.com, firstName.lastName@university.edu.co";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  stat = false;
  if ( isInvalidPassword(password) )
  {
    const msg = "passwords can only contain alpha numeric characters, " +
      "underscores (_), periods (.), and hyphens (-)";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  stat = false;
  if ( isWeakPassword(password) )
  {
    const msg = "passwords must contain capital letters, numbers, and " +
      "at least a period (.), an underscore (_), or a hyphen (-)";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  stat = false;
  if (password.length < 8 || password.length > 16)
  {
    const msg = "passwords must be at least 8 and at most 16 characters long";
    res.status(500).json({ message: msg });
    stat = true;
    return stat;
  }

  // complains if user already exist:

  stat = false;
  const msg = await userExist(user);
  if (msg !== "")
  {
    res.status(500).json({ message: msg });
    stat = true;
    return true;
  }

  return stat;

};

module.exports = { validateLoginInfo, validateSignUpInfo, isAdmin, isEmail };

/*

Twitter API							April 02, 2023

source: users.js
author: @misael-diaz

Synopsis:
Defines and exports user services.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
