HoYo-Achievement 米哈游游戏成就
================

# 简介
自制的米哈游的游戏成就记录网站。附带数据库和用户登录功能。

目前只支持《绝区零》，未来将会支持《崩坏：星穹铁道》的成就。
（《原神》暂时没在计划中，因为没在玩《原神》...）

# 目录
- [项目设置](#项目设置)
  - [数据库](#数据库)
  - [JWT](#JWT)
  - [默认管理员账户](#默认管理员账户)
  - [后端host（编译运行限定）](#指定后端host编译运行限定)
- [使用指南](#使用指南)
  - [运行](#运行)
  - [停止运行](#停止运行)
  - [删除/清理](#删除清理项目)
  - [更新](#更新项目)

# 项目设置

## 数据库
本项目默认使用的是SQLite数据库，同时支持更改为MySQL。
目前不支持数据库数据迁移，请在部署前决定好使用的数据库。

### 更改数据库类型
在`./backend/.env`中，可以找到`DB_TYPE`这个配置项。
默认值为`sqlite`。
如果要使用MySQL数据库，请将其更改为`mysql`。

### 更改SQLite位置
如果以编译运行的方式运行时，SQLite数据库默认位置为`./backend`文件夹。

如果以Docker Compose的方式运行时，SQLite数据库默认位置为`./data`文件夹。
如果要更改位置，打开`docker-compose.yml`，
在`backend:volumes`中将`./data`更改为新的文件夹。

### 更改MySQL设置
MySQL的设置在`./backend/.env`中。
如需要请更改以下配置：
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_USER_PASSWORD=123456
DB_DATABASE=HoYo_Achievement
```
程序会自动在目标数据库中生成名为`DB_DATABASE`的数据库。

## JWT
本项目的用户系统使用JWT令牌认证，
请在运行前生成JWT密钥，并添加到配置文件中。

### 设置JWT密钥
1. 生成密钥
    ```shell
    openssl rand -base64 64
    ```

2. 添加到配置文件

    打开`./backend/.env`配置文件，可以找到：

    ```YAML
    JWT_SECRET=YOUR_JWT_SECRET
    ```

    将其替换成上一步生成的密钥，例如：

    ```YAML
    JWT_SECRET="snfGHWFmbxtPI4pnRoSPHUmNnj8XV5eOc3OLRsP+VYk="
    ```

### 设置JWT有效时间
默认JWT有效时间为1小时。
可在`./backend/.env`进行更改，
配置名称为`JWT_EXPIRE_IN`。

## 默认管理员账户
默认管理员用户名:
`admin`

默认管理员密码:
`Admin001@HoYoAchieve`

**因为密码表单有设置规则，请在运行后手动更改管理员密码！**

## 指定后端host（编译运行限定）
如果选择编译运行，则需要在`./frontend/.env`中指定后端的host，
使用户浏览器能够访问后端。

Docker Compose运行不需要指定。

# 使用指南

本项目默认及推荐使用**Docker Compose**快速搭建。

## 运行
1. 构建并启动项目
    ```shell
    cd path/to/project
    docker compose up --build
    ```

2. 长期后台运行
    ```shell
    docker compose up -d
    ```

## 停止运行

```shell
cd path/to/project
docker compose stop
```

## 删除/清理项目

删除容器：
```shell
cd path/to/project
docker compose down
```

删除容器并清理镜像和数据卷：
```shell
cd path/to/project
docker compose down --volumes --rmi all
```

## 更新项目
本项目会根据情况更新，如游戏版本更新，页面及功能优化等。

1. 拉取项目更新：
    ```shell
    cd path/to/project
    git pull
    ```

2. 重新构建镜像
    ```shell
    docker compose build
    ```

3. 重新创建并启动容器
    ```shell
    docker compose up -d
    ```
