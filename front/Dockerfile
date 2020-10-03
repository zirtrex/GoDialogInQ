FROM node:12.16.0

WORKDIR /app

COPY . .

RUN npm install

ARG GITHUB_SHA
ARG GITHUB_REF
ENV SHA=$GITHUB_SHA
ENV REF=$GITHUB_REF

RUN sed -i 's,SHA,'"$GITHUB_SHA"',' app.js
RUN sed -i 's,REF,'"$GITHUB_REF"',' app.js

EXPOSE 8080

CMD [ "node", "app.js" ]
