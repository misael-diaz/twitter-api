/*

Twitter API							February 20, 2023

source: validator.js
author: @misael-diaz

Synopsis:
Validates user login.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter

*/


const validate = (req) => {
// validates the username and password, returns an array of errors

	const { username, password } = req.body;

	let errors = [];
	if (username == null)
	{
		const e = "empty username field";
		errors.push(e);
	}

	if (password == null)
	{
		const e = "empty password field";
		errors.push(e);
	}

	return errors;
}


const validateLogin = (req, res, next) => {
// executes next() if login credentials are valid, sends error messages otherwise

	const errors = validate(req);

	const numErrors = errors.length;
	if (numErrors != 0)
	{
		res.status(500).json({messages: errors});
	}
	else
	{
		next();
	}

};


module.exports = { validateLogin };
