### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:8.16.0 as builder
WORKDIR /usr/src/app
COPY . /usr/src/app/

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i -D -E @ionic/app-scripts@3.2.0 && npm install -g cordova@8.0.0 && npm install -g ionic@4.5.0

## Build the angular app in production mode and store the artifacts in dist folder
RUN ionic cordova build browser --prod
### STAGE 2: Setup ###
FROM nginx:1.15.5

## Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /usr/src/app/platforms/browser/www /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
