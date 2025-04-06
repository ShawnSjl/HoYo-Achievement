FROM node:18 AS build
LABEL authors="jiale"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 使用 nginx 托管打包后的文件
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf