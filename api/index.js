/*

Twitter API							February 22, 2023

source: index.js
author: @misael-diaz

Synopsis:
Configures and Exports Router.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] main resource: https://github.com/jestrade/api-twitter
[1] API: https://www.ibm.com/topics/api
[2] NODEJS REST API: https://medium.com/bb-tutorials-and-thoughts/how-to-write-production-ready-node-js-rest-api-javascript-version-db64d3941106

*/

const express = require("express");		// imports express
const users = require("./users/router");	// imports users router

const router = express.Router();		// instantiates router

router.use("/users", users);			// mounts middleware for /users requests

module.exports = router;			// exports API router
