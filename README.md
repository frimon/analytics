# Web analytics

![Dashboard screenshot](https://raw.githubusercontent.com/frimon/analytics/master/screenshot.png)

## Development

### Requirements

* Docker
* Node v10 with yarn

### Backend

Go to backend directory
`cd backend`

Start up database server
`docker-compose up -d`

Installing dependencies
`yarn`

Starting HTTP server
`yarn start`

### Frontend

Go to frontend directory
`cd backend`

Installing dependencies
`yarn`

Starting HTTP server
`yarn start`

### Tracking

Go to tracking directory
`cd tracking`

Build assets
`yarn build`

a `--watch` flag may be used to build on file updates.

Starting testing server
`yarn dev`

Open up presented URL in your web browser and go to example directory to try it out.

