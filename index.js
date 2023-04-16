const { start } = require("./http");		// imports the http start() method
const { db } = require("./config");
const { connectionString } = db;

const sane = () => {

  if (connectionString === undefined)
  {
    process.exitCode = 1;
    const errmsg = 'DB_CONNECTION_STRING must be specified in .env file';
    throw new Error(errmsg);
  }

};

try
{
  sane();
  const seeds = require("./seeds");		// starts and seeds the database
  start();					// starts the http app
}
catch (err)
{
  console.error(err);
}

/*

Twitter API							February 17, 2023

source: index.js
author: @misael-diaz

Synopsis:
Starts the Representational State Transfer REST Application Programming Interface API.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
