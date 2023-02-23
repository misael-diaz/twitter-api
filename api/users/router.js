/*

Twitter API							February 20, 2023

source: router.js
author: @misael-diaz

Synopsis:
Configures and Exports API User Router.


Copyright (c) 2023 Misael Diaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


References:
[0] https://github.com/jestrade/api-twitter
[1] https://www.geeksforgeeks.org/jwt-authentication-with-node-js/
[2] https://stackoverflow.com/questions/13147693/how-to-extract-request-http-headers-from-a-request-using-nodejs-connect/30302180#30302180

*/


const express = require("express");
const authenticator = require("../middleware/authenticator");
const validator = require("../middleware/validator");
const controller = require("./controller");


const { validateLogin } = validator;
const { login, logout } = controller;


const router = express.Router();


router.route("/login").post(validateLogin, login);
router.route("/logout").get(authenticator, logout);

router.route("/authenticate").get(authenticator, (req, res) => {
	// temporary callback that answers with the user ID for testing
	const { userID } = req.body;
	res.status(200).json({ message: "authorized user", userID: userID });
});


module.exports = router;


/*


NOTES: Authenticating with curl


Login Route:


curl --header "Content-Type: application/json" --request POST --data '{"username":"test", "password":"passwd"}' http://localhost:8080/api/users/login


API Responds the following info:
{"message":"successful login","username":"test","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxMTciLCJpYXQiOjE2NzcxMDQ0OTl9.qxJmGPfgcvb0PVocLVXaSA1MVJ9vzUqZesqlypMYo74"


Note: you must send the token to access routes that require authentication (see next).


Authenticate Route:


curl --header "twitter_api_jwt_header_key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxMTciLCJpYXQiOjE2NzcxMDQ0OTl9.qxJmGPfgcvb0PVocLVXaSA1MVJ9vzUqZesqlypMYo74" --request GET http://localhost:8080/api/users/authenticate


Logout Route:


curl --header "twitter_api_jwt_header_key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxMTciLCJpYXQiOjE2NzcxMDQ0OTl9.qxJmGPfgcvb0PVocLVXaSA1MVJ9vzUqZesqlypMYo74" --request GET http://localhost:8080/api/users/logout


*/
