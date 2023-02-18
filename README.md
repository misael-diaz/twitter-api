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
```

Note that you may use other hostname and/or port; however, bear in mind that
you will need to edit the Dockerfile and the docker commands accordingly.

## Create a Network with Docker

Create a network with Docker so that DNS lookup works on App startup:

```sh
docker network create webnetwork
```

## Dockerize the HTTP App

Use your preferred text editor to create the Dockerfile for building the App Docker Image:

```sh
FROM node:16
WORKDIR /usr/src/app
RUN git clone https://github.com/misael-diaz/twitter-api.git /usr/src/app
RUN yarn install
RUN yarn add dotenv
RUN yarn add express
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
<td colspan="4"><strong>Methods</strong><!-- This Data Cell Spans four Columns -->
</td>
</tr><!-- Table Row Ends -->
<tr><!-- Table Row Containing URL, GET, POST, and DELETE -->
<td><strong>URL</strong> 
</td>
<td><strong>GET</strong> 
</td>
<td><strong>POST</strong> 
</td>
<td><strong>PUT</strong> 
</td>
<td><strong>DELETE</strong> 
</td>
</tr>
<tr><!-- Table Row Containing Info about the HTTP Methods on the Root Route -->
<td>/
</td>
<td>Displays "App works!"		<!-- HTTP GET -->
</td>
<td>Error				<!-- HTTP POST -->
</td>
<td>Error				<!-- HTTP PUT -->
</td>
<td>Error				<!-- HTTP DELETE -->
</td>
</tr>
</table><!-- Table Ends -->


## Useful References:

- [Docker Documentation CLI](https://docs.docker.com/engine/reference/commandline/cli/)
