FROM node:18 AS build
LABEL authors="jiale"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 构建参数和环境变量
ARG VITE_BACKEND_HOST
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST

# 构建 Vite 项目
RUN npm run build

# 使用 nginx 托管打包后的文件
FROM nginx:alpine

# 只复制构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 自定义 nginx 配置
COPY ./nginx.conf /etc/nginx/conf.d/default.conf