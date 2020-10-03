FROM node:12.16.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./front/package.json package.json

USER node

RUN npm install

COPY --chown=node:node ./front/. .

ARG GITHUB_SHA
ARG GITHUB_REF
ENV SHA=$GITHUB_SHA
ENV REF=$GITHUB_REF

RUN sed -i 's,SHA,'"$GITHUB_SHA"',' app.js
RUN sed -i 's,REF,'"$GITHUB_REF"',' app.js

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]
