English | [简体中文](./README.zh-CN.md)

# ohg ![download](https://img.shields.io/npm/dt/ohg.svg) ![npm-version](https://img.shields.io/npm/v/ohg.svg) ![license](https://img.shields.io/npm/l/ohg.svg)
 
> A simple CLI scaffolding for git.

### Installation
Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x) and [Git](https://git-scm.com/).

```
$ npm install ohg -g
```

### Usage
```
$ ohg fix
```

### Command

* `ohg` or `ohg -h` --- find help info for iboy.
* `ohg fix` --- Pull remote branch to local or Push local branch to remote
    - `Pull` --- Pull remote branch to local to fix problems with specified branch in the production environment.
    - `Push` --- Push local branch to remote for development and execution of git commit completion in the production environment.
