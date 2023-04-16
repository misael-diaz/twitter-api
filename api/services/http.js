const { db, jwt } = require("../../config");
const { token } = jwt;
const { secretKey, headerKey } = token;
const { connectionString } = db;

const sane = () => {

  if (connectionString === undefined)
  {
    process.exitCode = 1;
    const errmsg = 'DB_CONNECTION_STRING must be specified in .env file';
    throw new Error(errmsg);
  }

  if (secretKey === undefined)
  {
    process.exitCode = 1;
    const errmsg = 'JWT_SECRET_KEY must be specified in .env file';
    throw new Error(errmsg);
  }

  if (headerKey === undefined)
  {
    process.exitCode = 1;
    const errmsg = 'JWT_HEADER_KEY must be specified in .env file';
    throw new Error(errmsg);
  }

};

module.exports = { sane };

/*

Twitter API							February 17, 2023

source: http.js
author: @misael-diaz

Synopsis:
Defines and Exports HTTP services.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
