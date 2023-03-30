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

module.exports = { validateLogin };

/*

Twitter API							February 20, 2023

source: validator.js
author: @misael-diaz

Synopsis:
Validates user login.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
