const bcrypt = require("bcrypt");
const { connect } = require("../db");
const { data } = require("./data");
const users = require("../api/users/users");

const save = async () => {

  for (const elem of data)
  {
    const saltRounds = 12;
    const hash = await bcrypt.hash(elem.password, saltRounds);
    elem.password = hash;
    const user = new users(elem);
    await user.save();
  }

  console.log(`database has been seeded!`);

};

const seed = async () => {

  await connect();
  await save();

};

module.exports = { seed };

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
[1] https://www.npmjs.com/package/bcrypt

*/
