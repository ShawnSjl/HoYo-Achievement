FROM node:18-slim
LABEL authors="jiale"

# 设置生产环境变量
ENV NODE_ENV=production

# 创建 app 目录
WORKDIR /app

# 只复制依赖文件，利用缓存
COPY package*.json ./

# 安装仅生产依赖
RUN npm install --omit=dev

# 拷贝项目代码
COPY . .

# 启动命令
CMD [ "npm", "run", "backend" ]