FROM node:20.9.0

WORKDIR /usr/src/app

COPY . .

ENV PORT=4173
EXPOSE 4173

RUN yarn install
RUN echo "Starting build with port $PORT"
RUN yarn build
RUN echo "Starting serve with port $PORT"
RUN yarn global add serve

RUN echo "Container starting on port $PORT"
CMD ["serve", "-s", "dist", "-l", "4173"]
