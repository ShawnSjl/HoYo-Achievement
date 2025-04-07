FROM node:18 AS build
LABEL authors="jiale"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 把 build args 传给 Vite
ARG VITE_BACKEND_HOST

# 再设置为 ENV（Vite 能读 .env 或 process.env）
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST

RUN npm run build

# 使用 nginx 托管打包后的文件
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf