# Twitter API

```
Academic use
```

## Prerequisites
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/) or [curl](https://curl.se/docs/manpage.html)

## Create a .env file

```sh
HTTP_HOST=twitter-api
HTTP_PORT=8080
```

Note that you may use other hostname and/or port; however, bear in mind that
you will need to edit the Dockerfile and the docker commands accordingly.

## Dockerize the HTTP App

Create a Dockerfile for building the App Docker Image:

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
docker image build -t im-twitter-api
```

## Deploy the Dockerized HTTP App

Deploy the Docker Container of the App on the foreground (useful for testing):
```sh
docker container run -it -p 8080:8080 --name twitter-api im-twitter-api
```

alternatively, you may execute the App on the background by detaching:
```sh
docker container run -it -p 8080:8080 -d --name twitter-api im-twitter-api --env-file=.env
```

## Stop the Dockerized HTTP App

To stop the App use:

```sh
docker container stop twitter-api
```

## Useful References:

- [Docker Documentation CLI](https://docs.docker.com/engine/reference/commandline/cli/)
