FROM node:12.16.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . /

USER node

RUN npm run build

#RUN npm install

COPY --chown=node:node ./. .

ARG GITHUB_SHA
ARG GITHUB_REF
ENV SHA=$GITHUB_SHA
ENV REF=$GITHUB_REF

RUN sed -i 's,SHA,'"$GITHUB_SHA"',' app.js
RUN sed -i 's,REF,'"$GITHUB_REF"',' app.js

ENV PORT=8084
ENV NODE_ENV=development

EXPOSE 8084

CMD [ "npm", "start" ]