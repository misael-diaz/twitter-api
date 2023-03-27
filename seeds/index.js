const { connect } = require("../db");
const { data } = require("./data");
const users = require("../api/users/users");

(async () => {

  await connect();

  data.forEach( async (elem) => {

    const user = new users(elem);
    await user.save();

  });

  console.log(`database has been seeded!`);

})();

/*

Twitter API							March 27, 2023

source: index.js
author: @misael-diaz

Synopsis:
Seeds default user accounts to the database.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
