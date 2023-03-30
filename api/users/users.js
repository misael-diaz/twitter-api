const mongoose = require("mongoose");
const collection = "users";

const stencil = {
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
};

const schema = mongoose.Schema(stencil);
const users = mongoose.model(collection, schema);

module.exports = users;

/*

Twitter API							March 27, 2023

source: users.js
author: @misael-diaz

Synopsis:
Defines and exports the users model.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://mongoosejs.com/docs/guide.html#definition
[1] https://mongoosejs.com/docs/guide.html#models

*/
