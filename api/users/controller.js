const jwt = require("jsonwebtoken");
const config = require("../../config");


const { token } = config.jwt;


const login = (req, res) => {
// handles POST requests to /login


	// Note: temporary array of users for testing
	const users = [ {username: "test", password: "passwd", userID: "117"} ];


	// gets username and password from request body
	const credentials = req.body;


	// gets the first user that matches the username in the passed credentials
	const user = users.find(u => u.username == credentials.username);


	const isInvalidUser = (user == null);

	if (isInvalidUser)
	// reports user if the username is invalid (for testing only)
	{
		res.json({ message: "invalid user" });
	}
	else if (credentials.password != user.password)
	// reports user if the password is invalid (for testing only)
	{
		res.json({ message: "invalid password" });
	}
	else
	// otherwise, encodes the userID in a token for future authentications
	{
		const { userID } = user;
		const t = jwt.sign({ userID }, token.secretKey);

		res.status(200).json({
			message: "successful login",
			username: credentials.username,
			token: t
		});
	}

};


const logout = (req, res) => {
// handles GET requests to /logout
	res.json({ message: "successful logout" });
}


module.exports = { login, logout }

/*

Twitter API							February 22, 2023

source: controller.js
author: @misael-diaz

Synopsis:
Exports API User Controller.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter
[1] https://www.geeksforgeeks.org/jwt-authentication-with-node-js/

*/
