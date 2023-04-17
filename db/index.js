const mongoose = require("mongoose");
const { db } = require("../config");
const { connectionString } = db;

const connect = async () => {

  const uri = connectionString;
  const opt = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  await mongoose.connect(uri, opt);
  console.log(`successful connection to the database!`);

};

const disconnect = () => {
  mongoose.connection.close();
}

module.exports = { connect, disconnect };

/*

Twitter API							February 09, 2023

source: index.js
author: @misael-diaz

Synopsis:
Exports methods for (dis)connecting to the database.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/
