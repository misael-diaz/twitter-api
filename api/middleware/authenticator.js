const jwt = require("jsonwebtoken");	// for client-to-server data transfer
const config = require("../../config");	// for the header and secret token keys

const { token } = config.jwt;


const authenticator = (req, res, next) => {
// authenticates user by verifying the token sent in the request header

	try
	{
		// gets the token header-key from the request header (ref [2])
		const t = req.header(token.headerKey);

		// Note:
		// Decodes the data in token if the token was signed with the private
		// token key of the twitter-api (defined in .env).
		const data = jwt.verify(t, token.secretKey);

		if (data)
		// gets the userID and adds it to the request body for next()
		{
			const { userID } = data;
			req.body.userID = userID;
			console.log(`token has been decoded successfully!`);
		}

		next();

	}
	catch (error)
	{
		res.status(401).send(error);
	}
};


module.exports = authenticator;

/*

Twitter API							February 20, 2023

source: authenticator.js
author: @misael-diaz

Synopsis:
Exports user authenticator.

Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter
[1] https://www.geeksforgeeks.org/jwt-authentication-with-node-js/
[2] https://stackoverflow.com/questions/13147693/how-to-extract-request-http-headers-from-a-request-using-nodejs-connect/30302180#30302180

*/
