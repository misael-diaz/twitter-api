/*

Twitter API							February 17, 2023

source: index.js
author: @misael-diaz

Synopsis:
Configures the HTTP Host and Port of the App.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] main: https://github.com/jestrade/api-twitter

*/


// imports dependencies:


const dotenv = require("dotenv");	// for importing environment variables
dotenv.config();			// imports environment variables from .env file


// sets the HTTP Host and Port from Environment variables or from defaults if undefined
const config = {

	http: {
		host: process.env.HTTP_HOST || "0.0.0.0",
		port: process.env.HTTP_PORT || 8080
	}

};


module.exports = config;		// exports the configuration object `config'
