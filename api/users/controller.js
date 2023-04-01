const jwt = require("jsonwebtoken");
const config = require("../../config");
const users = require("./users");


const { token } = config.jwt;


const login = async (req, res) => {
  // handles POST requests to /login

  // gets username and password from request body
  const { user } = req.body;
  const { username, password } = user;
  const key = { username: username };
  const usr = await users.findOne(key).exec();
  const isInvalidUser = (usr == null);

  if (isInvalidUser)
    // reports user if the username is invalid (for testing only)
  {
    res.status(500).json({ message: "invalid user" });
  }
  else if (password !== usr.password)
    // reports user if the password is invalid (for testing only)
  {
    res.status(500).json({ message: "invalid password" });
  }
  else
    // otherwise, encodes the userID in a token for future authentications
  {
    const { _id } = usr;
    const userID = _id;
    const t = jwt.sign({ userID }, token.secretKey);

    res.status(200).json({
      message: "successful login",
      username: username,
      token: t
    });
  }

};

const signup = async (req, res) => {	// handles POST requests to /signup

  const { user } = req.body;
  const { firstName, lastName, email, username, password } = user;
  const usr = new users(user);
  await usr.save();
  res.status(200).json({ message: "new account has been created successfully" });

}

const logout = (req, res) => {
  // handles GET requests to /logout
  res.json({ message: "successful logout" });
}


module.exports = { signup, login, logout }

/*

Twitter API							February 22, 2023

source: controller.js
author: @misael-diaz

Synopsis:
Exports API User Controller.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter
[1] https://www.geeksforgeeks.org/jwt-authentication-with-node-js/

*/

/*

TODO:
[ ] add code to authenticate users that supply the email in lieu of the username

*/
