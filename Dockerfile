FROM node:20.9.0

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build
RUN yarn global add serve

ENV PORT=4173
EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
