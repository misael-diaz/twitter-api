const users = require("../users/users");

const isAdmin = async (userID) => {

  const key = { username: "admin" };
  const admin = await users.findOne(key).exec();
  const { _id } = admin;
  const id = _id.toString();

  return ( (userID === id)? true : false );

};

module.exports = { isAdmin };

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
