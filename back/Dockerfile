FROM node:12.16.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package.json package.json

USER node

RUN npm install

COPY --chown=node:node ./. .

ARG GITHUB_SHA
ARG GITHUB_REF
ENV SHA=$GITHUB_SHA
ENV REF=$GITHUB_REF

RUN sed -i 's,SHA,'"$GITHUB_SHA"',' app.js
RUN sed -i 's,REF,'"$GITHUB_REF"',' app.js

ENV NODE_PORT=8081
ENV NODE_ENV=development

EXPOSE 8081

CMD ./wait-for-it.sh db:3306 -- npm start