/*

Twitter API							February 17, 2023

source: index.js
author: @misael-diaz

Synopsis:
Exports HTTP App start() method.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] main resource: https://github.com/jestrade/api-twitter
[1] API: https://www.ibm.com/topics/api
[2] NODEJS REST API: https://medium.com/bb-tutorials-and-thoughts/how-to-write-production-ready-node-js-rest-api-javascript-version-db64d3941106
[3] app.use(): https://www.geeksforgeeks.org/express-js-app-use-function/
[4] express.json(): https://www.geeksforgeeks.org/express-js-express-json-function/
[5] app.get(): https://www.geeksforgeeks.org/express-js-app-get-request-function/

*/


// imports dependencies:


const express = require("express");	// imports express
const api = require("../api");		// imports API router
const { http } = require("../config");	// gets http object from config by deconstruction
const { host, port } = http;		// gets host and port from http by deconstruction


// instantiates the HTTP App:


const app = express();


// mounts middleware:


app.use(express.json());		// mounts middleware for parsing json requests
app.use("/api", api);			// mounts API at /api


// configures the HTTP App:


// configures the app to answer HTTP GET request to the root route `/':
app.get("/", (req, res) => {
	res.send("App works!");
});


// configures the app to handle undefined HTTP GET routes:
app.get("*", (req, res) => {
	res.send("undefined route");
});


// defines the start() method for starting the HTTP App:
const start = () => {
	app.listen(port, host, () => {
		console.log(`server running at http://${host}:${port}`);
	});
};


module.exports = { start };		// exports object storing the start() method
