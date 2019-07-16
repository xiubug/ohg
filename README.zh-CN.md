简体中文 | [English](https://github.com/sosout/ohg)

# ohg ![download](https://img.shields.io/npm/dt/ohg.svg) ![npm-version](https://img.shields.io/npm/v/ohg.svg) ![license](https://img.shields.io/npm/l/ohg.svg)

> 十分简单的Git CLI脚手架.

### 安装
ohg 依赖 [Node.js](https://nodejs.org/en/) (>=6.x)：

```
$ npm install ohg -g
```

### 用法
```
$ ohg branch
```

### 基本命令

* `ohg` or `ohg -h` --- 查看 ohg 的帮助信息
* `ohg branch` --- 拉取远程分支到本地/推送本地分支到远程
    - `Pull` --- 用于修复生产环境指定分支问题时，拉取远程分支到本地
    - `Push` --- 用于开发完成且执行git commit完成，推送本地分支到远程