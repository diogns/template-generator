const dockerfileGenerator = (ffobject) => {
  ffobject.content = `FROM node:16.18.1 AS builder

WORKDIR /build

COPY package.json ./

COPY . .

RUN npm install

RUN npm run build

FROM node:16.18.1

WORKDIR /opt

RUN apt-get update


WORKDIR /app
COPY --from=builder /build/src/migrations ./dist/migrations
COPY --from=builder /build/src/seeds ./dist/seeds
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json .
COPY --from=builder /build/node_modules ./node_modules

CMD ["npm","run", "start:prod"]
`;
};

module.exports = { dockerfileGenerator };