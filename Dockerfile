FROM node:20.9.0
WORKDIR /usr/src/app

COPY . .

ENV PORT=4173
EXPOSE 4173

# Build arguments for Vite (baked in at build time)
ENV VITE_APP_URL=https://orchestralabs.org/
ENV VITE_WALLETCONNECT_PROJECT_ID=70ba37949838afd24f17421f5b6bcfd0

ENV YARN_ENABLE_IMMUTABLE_INSTALLS=false
RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
