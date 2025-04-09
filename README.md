HoYo-Achievement 米哈游游戏成就
================

# 简介
自制的米哈游的游戏成就记录网站。附带数据库和用户登录功能。

目前只支持《绝区零》，未来将会支持《崩坏：星穹铁道》的成就。
（《原神》暂时没在计划中，因为没在玩《原神》...）

# 目录
- [项目设置](#项目设置)
  - [JWT密钥](#更改jwt密钥)
  - [数据库密码](#更改数据库密码)
  - [可更改配置](#更改其它配置可选)
  - [管理员账户](#默认管理员账户)
- [使用指南](#使用指南)
  - [运行](#运行)
  - [停止运行](#停止运行)
  - [删除/清理](#删除清理项目)
  - [更新](#更新项目)

# 项目设置
## 更改JWT密钥
本项目的用户系统使用JWT令牌认证，
请在运行前生成JWT密钥，并添加到配置文件中。

1. 生成密钥
    ```shell
    openssl rand -base64 64
    ```

2. 添加到配置文件

    打开项目根目录的`.env`配置文件，可以找到：

    ```YAML
    JWT_SECRET=YOUR_JWT_SECRET
    ```

    将其替换成上一步生成的密钥，例如：

    ```YAML
    JWT_SECRET="snfGHWFmbxtPI4pnRoSPHUmNnj8XV5eOc3OLRsP+VYk="
    ```

## 更改数据库密码
本项目使用MySQL数据库。但项目搭建时，会使用MySQL官方的Docker镜像。
因此用户需要提供/修改配置文件`.env`中的root用户密码。

## 更改其它配置（可选）
本项目的配置储存在`.env`文件中，
其中部分变量可以自定义。

可更改的部分如下：
```YAML
FRONTEND_PORT=6868

JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRE_IN="1h"

MYSQL_ROOT_PASSWORD=123456
MYSQL_PORT=3306
```

## 默认管理员账户
默认管理员用户名:
`admin`

默认管理员密码:
`Admin001@HoYoAchieve`

**请在运行后手动更改管理员密码！**

# 使用指南

本项目默认使用**Docker Compose**快速搭建。

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
