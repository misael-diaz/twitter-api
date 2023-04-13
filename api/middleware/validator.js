const users = require("../users/users");
const { validateLoginInfo, validateSignUpInfo } = require("../services/users");

const validateLogin = (req, res, next) => {

  const isInvalidLoginInfo = validateLoginInfo(req, res);

  if (isInvalidLoginInfo)
    return;

  next();

};

const validateSignUp = async (req, res, next) => {

  const isInvalidSignUpInfo = await validateSignUpInfo(req, res);

  if (isInvalidSignUpInfo)
    return;

  next();

};

/*
const validateLogin = (req, res, next) => {
  // executes next() if login credentials are valid, sends error messages otherwise

  if ( !Object.hasOwn(req, 'body') )
  {
    const msg = "`body` missing from request";
    res.status(500).json({message: msg});
    return;
  }

  const { body } = req;
  if ( !Object.hasOwn(body, 'user') )
  {
    const msg = "`user` credentials missing from the request body";
    res.status(500).json({message: msg});
    return;
  }

  const { user } = body;
  if ( !Object.hasOwn(user, 'username') )
  {
    const msg = "`username` missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  if ( !Object.hasOwn(user, 'password') )
  {
    const msg = "`password` missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  const { username, password } = user;

  if (username === "" || password === "")
  {
    const msg = "invalid user credentials";
    res.status(500).json({message: msg});
    return;
  }

  next();

};
*/


/*
const validateSignUp = async (req, res, next) => {

  const stored = async (key) => {

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

  const exist = async (user) => {

    const { username, email } = user;
    let msg = await stored({ username: username });
    if (msg !== "")
    {
      return ( new Promise( resolve => resolve(msg) ) );
    }

    msg = await stored({ email: email });
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

  if ( !Object.hasOwn(req, 'body') )
  {
    const msg = "`body` missing from request";
    res.status(500).json({message: msg});
    return;
  }

  const { body } = req;
  if ( !Object.hasOwn(body, 'user') )
  {
    const msg = "`user` credentials missing from the request body";
    res.status(500).json({message: msg});
    return;
  }

  const { user } = body;
  if ( !Object.hasOwn(user, 'firstName') )
  {
    const msg = "First Name missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  if ( !Object.hasOwn(user, 'lastName') )
  {
    const msg = "Last Name missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  if ( !Object.hasOwn(user, 'email') )
  {
    const msg = "email missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  if ( !Object.hasOwn(user, 'username') )
  {
    const msg = "`username` missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  if ( !Object.hasOwn(user, 'password') )
  {
    const msg = "`password` missing from request body";
    res.status(500).json({message: msg});
    return;
  }

  const { firstName, lastName, email, username, password } = user;

  if (firstName === "" || lastName === "")
  {
    const msg = "invalid user info";
    res.status(500).json({message: msg});
    return;
  }

  if (email === "" || username === "" || password === "")
  {
    const msg = "invalid user info";
    res.status(500).json({message: msg});
    return;
  }

  for (const prop in user)
  {
    if ( hasWhitespace(user[prop]) )
    {
      const msg = `${prop} has whitespace`;
      res.status(500).json({ message: msg });
      return;
    }
  }

  if ( isInvalidName(firstName) )
  {
    const msg = "First Name is not capitalized or has numbers and/or special " +
      "characters";
    res.status(500).json({ message: msg });
    return;
  }

  if ( isInvalidName(lastName) )
  {
    const msg = "Last Name is not capitalized or has numbers and/or special " +
      "characters";
    res.status(500).json({ message: msg });
    return;
  }

  if ( isInvalidEmail(email) )
  {
    const msg = "invalid email, consider the following valid examples: " +
      "firstName@gmail.com, firstName17@gmail.com, firstName.lastName@gmail.com, " +
      "firstName-lastName@gmail.com, firstName_lastName@gmail.com, " +
      "firstName.lastName17@gmail.com, firstName.lastName@university.edu.co";
    res.status(500).json({ message: msg });
    return;
  }

  if ( isInvalidPassword(password) )
  {
    const msg = "passwords can only contain alpha numeric characters, " +
      "underscores (_), periods (.), and hyphens (-)";
    res.status(500).json({ message: msg });
    return;
  }

  if ( isWeakPassword(password) )
  {
    const msg = "passwords must contain capital letters, numbers, and " +
      "at least a period (.), an underscore (_), or a hyphen (-)";
    res.status(500).json({ message: msg });
    return;
  }

  if (password.length < 8 || password.length > 16)
  {
    const msg = "passwords must be at least 8 and at most 16 characters long";
    res.status(500).json({ message: msg });
    return;
  }

  const msg = await exist(user);
  if (msg !== "")
  {
    res.status(500).json({ message: msg });
    return;
  }

  next();

}
*/

module.exports = { validateLogin, validateSignUp };

/*

Twitter API							February 20, 2023

source: validator.js
author: @misael-diaz

Synopsis:
Validates user signup and login.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter
[1] https://javascript.info/async-await
[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

*/
