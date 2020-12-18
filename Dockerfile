FROM node:12.7-alpine AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/i-am-a-millionaire /usr/share/nginx/html