# Twitter API

```
Academic use
```

## Prerequisites
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/) or [curl](https://curl.se/docs/manpage.html)

## Create a .env file

Use your preferred text editor to create the `.env` file:

```sh
HTTP_HOST=twitter-api
HTTP_PORT=8080
JWT_SECRET_KEY=jwt_secret_key
JWT_HEADER_KEY=jwt_header_key
DB_CONNECTION_STRING=mongodb://mongodb:27017/details
```

Note that you may use other hostname and/or port; however, bear in mind that
you will need to edit the Dockerfile and the docker commands accordingly.
You are strongly encouraged to use other values for the jsonwebtoken secret
and header keys, for the ones given here are just examples.

## Create a Network with Docker

Create a network with Docker so that DNS lookup works on App startup:

```sh
docker network create webnetwork
```

## Start the MongoDB Database

Pull the official image maintained by the Docker community from Docker Hub via (if you
have not done so before):

```sh
docker pull mongo
```

Run an instance of the database

```sh
docker run --name mongodb --network webnetwork mongo
```

Note that the name mongodb is the same as the database hostname in the .env
file. Feel free to use any other name you deem appropriate for the database.

## Dockerize the HTTP App

Use your preferred text editor to create the Dockerfile for building the App Docker Image:

```sh
FROM node:16
WORKDIR /usr/src/app
RUN git clone https://github.com/misael-diaz/twitter-api.git /usr/src/app
RUN yarn install
RUN yarn add dotenv
RUN yarn add express
RUN yarn add mongoose
RUN yarn add jsonwebtoken
RUN yarn add bcrypt
RUN yarn add cors
EXPOSE 8080
CMD yarn start
```

Build the image:
```sh
docker image build -t im-twitter-api .
```

## Deploy the Dockerized HTTP App

Deploy the Docker Container of the App on the foreground (useful for testing):
```sh
docker container run -it -p 8080:8080 --name twitter-api --network webnetwork --env-file .env im-twitter-api
```

alternatively, you may execute the App on the background by detaching:
```sh
docker container run -it -p 8080:8080 -d --name twitter-api --network webnetwork --env-file .env im-twitter-api
```

Note that the command requests docker to connect the App to the network `webnetwork`,
that the name of the App `twitter-api` is the same as the `HTTP_HOST` in `.env`,
and that the published port `8080` is the same as the `HTTP_PORT` in `.env` and the
exposed port in the Dockerfile.

## Stop the Dockerized HTTP App

To stop the App use:

```sh
docker container stop twitter-api
```

## API

<table><!-- Table Starts -->
  <tr><!-- Table Row Starts -->
    <td><!-- Empty Table Data Cell --></td>
    <td colspan="4"><strong>Methods</strong></td><!-- This Data Cell Spans four Columns -->
  </tr><!-- Table Row Ends -->
  <tr><!-- Table Row Containing URL, GET, POST, and DELETE -->
    <td><strong>URL   </strong></td>
    <td><strong>GET   </strong></td>
    <td><strong>POST  </strong></td>
    <td><strong>PUT   </strong></td>
    <td><strong>DELETE</strong></td>
  </tr><!-- Table Row Ends -->
  <tr><!-- Table Row Containing Info about the HTTP Methods on the Root Route -->
    <td>/</td>					<!-- Root Route `/' -->
    <td>Displays "App works!"</td>		<!-- HTTP GET -->
    <td>Error</td>				<!-- HTTP POST -->
    <td>Error</td>				<!-- HTTP PUT -->
    <td>Error</td>				<!-- HTTP DELETE -->
  </tr><!-- Table Row Ends -->
  <tr>
    <td>/api/users/login</td>			<!-- /login route -->
    <td>Error</td>				<!-- HTTP GET -->
    <td>					<!-- HTTP POST -->
      <p>Authenticate User</p>
      <p><code>{</code></p>
      <p><code>username,</code></p>
      <p><code>password</code></p>
      <p><code>}</code></p>
      <p><strong><code>public</code></strong></p>
    </td>
    <td>Error</td>				<!-- HTTP PUT -->
    <td>Error</td>				<!-- HTTP DELETE -->
  </tr>
  <tr>
    <td>/api/users/signup</td>			<!-- /signup route -->
    <td>Error</td>				<!-- HTTP GET -->
    <td>					<!-- HTTP POST -->
      <p>Create User</p>
      <p><code>{</code></p>
      <p><code>firstName,</code></p>
      <p><code>lastName,</code></p>
      <p><code>email,</code></p>
      <p><code>username,</code></p>
      <p><code>password</code></p>
      <p><code>}</code></p>
      <p><strong><code>public</code></strong></p>
    </td>
    <td>Error</td>				<!-- HTTP PUT -->
    <td>Error</td>				<!-- HTTP DELETE -->
  </tr>
  <tr>
    <td>/api/users/list</td>			<!-- /list route -->
    <td>					<!-- HTTP GET -->
      <p><strong><code>private</code></strong></p>
      <p><strong><code>Authentication</code></strong></p>
      <p><strong><code>Authorization</code></strong></p>
    </td>
    <td>Error</td>				<!-- HTTP POST -->
    <td>Error</td>				<!-- HTTP PUT -->
    <td>Error</td>				<!-- HTTP DELETE -->
  </tr>
</table><!-- Table Ends -->


## Useful References:

- [Docker Documentation CLI](https://docs.docker.com/engine/reference/commandline/cli/)
