const { start } = require("./http");		// imports the http start() method
const { sane } = require("./api/services/http");
const { seed } = require("./seeds");

const App = async () => {

  try
  {
    await sane();				// performs sane checks
    await seed();				// starts and seeds the database
  }
  catch (err)
  {
    console.error(err);
    process.exitCode = 1
    process.exit();
  }

  await start();				// starts the http app

};

App();

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
