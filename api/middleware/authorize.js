const { isAdmin } = require("../services/users");

const authorize = async (req, res, next) => {

  const { body } = req;
  const { userID } = body;

  const auth = await isAdmin(userID);
  if (!auth)
  {
    res.status(400).json({ message: "unauthorized" });
    return;
  }

  next();

};

module.exports = authorize;

/*

Twitter API							April 11, 2023

source: authorize.js
author: @misael-diaz

Synopsis:
Defines user authorization middleware.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
